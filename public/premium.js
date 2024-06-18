// document.getElementById('rzpbtn1').onclick = async function(e){
   

//     try {
//         const response = await axios.get(`http://localhost:4000/purchase/premiumMembership`, { headers: { Authorization: token, price: 19900 } });
//         console.log(response);
//         const options = {
//             key: response.data.key_id,  
//             order_id: response.data.order.id,  
//             handler: async function (response) {     
//                 try {
//                     console.log(response.razorpay_payment_id);
//                     const res = await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`,
//                         {
//                             order_id: options.order_id,
//                             payment_id: response.razorpay_payment_id
//                         }, { headers: { Authorization: token } });

//                     e.target.remove();
//                     document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';

//                     localStorage.setItem('token', res.data.token);
//                     window.alert('You are a Premium User Now 👏');
//                     window.alert('Access exclusive features with your premium status. 👏');
                    
//                 } catch (err) {
//                     console.log('Error is:', err);
//                 }
//             }
//         };

//         const rzpl = new Razorpay(options);
//         rzpl.open();
//         e.preventDefault();
//     }
//     catch (err) {
//         console.log('Error is -> ', err);
//     }
// }

document.getElementById('rzpbtn1').onclick = async function(e){
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/purchase/premiumMembership`, { headers: { Authorization: token, price: 19900/per month } });
        console.log(response);
        const options = {
            key: response.data.key_id,
            order_id: response.data.order.id,
            handler: async function (response) {
                try {
                    console.log(response.razorpay_payment_id);
                    const res = await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`, {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    }, { headers: { Authorization: token } });

                    e.target.remove();
                    document.querySelector('.premium').innerHTML = '<p>👑 You are a Premium User 👑</p>';

                    localStorage.setItem('token', res.data.token);
                    window.alert('You are a Premium User Now 👏');
                    window.alert('Access exclusive features with your premium status. 👏');
                } catch (err) {
                    console.log('Error is:', err);
                }
            }
        };

        const rzpl = new Razorpay(options);
        rzpl.open();
        e.preventDefault();

        rzpl.on('payment.failed', function (response) {
            console.log('Error is:', response);
            alert('Something went wrong');
        });
    }
    catch (err) {
        console.log('Error is -> ', err);
    }
}
