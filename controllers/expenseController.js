const Expense = require('../models/expense');
const User = require('../util/user');
const sequelize = require('../database/db');


function Invalidstring(str){
    if(str.trim().length==0 || str == undefined){
        return true;
    }else{
        return false;
    }
}

exports.getExpenses=async (req, res, next)=>{
    try{
        const page = +req.query.page||1;
        const pageSize = +req.query.pageSize||3;

        const totalExpenses=await req.user.countExpenses();

        const data = await req.user.getExpenses({
            offset:(page-1)*pageSize,
            limit: pageSize,
            order:[['id','DESC']]
           })

        res.status(200).json({
            allExpenses: data,
            currentPage: page,
            hasNextPage: pageSize * page < totalExpenses,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalExpenses / pageSize)
         })
    }catch(err){
        console.log(JSON.stringify(err));
        res.status(500).json({success:true,message:err})
    }
};


exports.deleteExpense = async(req,res,next)=>{
    const t = await sequelize.transaction(); 
    try{
        if(req.params.id=="undefined"){ 
            return res.status(400).json({message : "ID is missing"});
        }

        const uId  = req.params.id;
        const expenseamount = await Expense.findAll({where:{id:uId}});

        const totalExpense = Number(req.user.totalExpense) - Number(expenseamount[0].expenseamount);

        await User.update({
            totalExpense: totalExpense
        },{
            where:{id: req.user.id},
            transaction : t
        })

        const noOfRowsDeleted = await Expense.destroy({
            where: {id:uId, userId:req.user.id},
            transaction : t
        });
        await t.commit();
        if(noOfRowsDeleted==0){
            res.status(500).json({success:false,message:"You can not delete this expense"});
        }else{
            res.status(200).json({success:true,message:"Deleted"});
        }
    }catch(err){
        await t.rollback();
        console.log(err)
        res.status(500).json({success:true,message:err});
    }
}

exports.addExpense =async (req, res, next)=>{
    const t = await sequelize.transaction(); 
    try{
        const expenseamount = req.body.expenseamount.trim();
        const description= req.body.description.trim();
        const category = req.body.category.trim();
        console.log(`entry :${expenseamount} ${description} ${category}`)
        if(Invalidstring(expenseamount) || Invalidstring(description) || Invalidstring(category)){
            return res.status(400).json({message:'All the fields are mandatory'})
        }
        console.log("add Exp",expenseamount, description , category)
        const data = await Expense.create({
            expenseamount: expenseamount,
            description: description,    
            category: category,
            userId: req.user.id
        },{transaction : t})
        
        //totalExpense
        const totalExpense = Number(req.user.totalExpense)+ Number(expenseamount);
        console.log('expenseamount:',totalExpense);
        await User.update({
            totalExpense: totalExpense
        },{
            where:{id: req.user.id},
            transaction : t
        })
        await t.commit();
        res.status(201).json({newExpense: data});
    }
    catch(err){
        await t.rollback();
        console.log(err)
        res.status(500).json({message:err})
    }
};
