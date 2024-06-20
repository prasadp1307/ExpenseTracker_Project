document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            console.log('Decoded Token:', decodedToken);  // Debugging line
            if (decodedToken && decodedToken.isPremium) {
                document.querySelector('.premium').innerHTML = '<p>You are a Premium User</p>';
            } else {
                document.querySelector('.premium').innerHTML = '<p>You are not a Premium User</p>';
            }
        } catch (err) {
            console.error('Error decoding token:', err);
        }
    } else {
        console.log('No token found');
    }
});

// const updateTokenAndUI = (newToken) => {
//     localStorage.setItem('token', newToken);
//     const decodedToken = jwt_decode(newToken);
//     console.log('Updated Token:', decodedToken);  // Debugging line
//     document.querySelector('.premium').innerHTML = '<p>You are a Premium User</p>';
//     alert('Payment Successful \u20B9 \u2705 You are a Premium User Now');

// };


// document.getElementById('rzpbtn1').onclick = async function (e) {
//     e.preventDefault();
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:4000/purchase/premiumMembership`, { headers: { Authorization: token, price: 19900 } });
//         console.log('Order Response:', response);  // Debugging line

//         const options = {
//             key: response.data.key_id,
//             order_id: response.data.order.id,
//             handler: async function (response) {
//                 try {
//                     const res = await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`, {
//                         order_id: options.order_id,
//                         payment_id: response.razorpay_payment_id
//                     }, { headers: { Authorization: token } });

//                     console.log('Transaction Status Response:', res);  // Debugging line
//                     localStorage.setItem('token', res.data.token);
//                     document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are a Premium User &#x1F451;</p>';
//                     const buyPremiumButton = document.getElementById('rzpbtn1');
//                     if (buyPremiumButton) {
//                         buyPremiumButton.style.display = 'none';
//                     }
//                     alert('Payment Successful \u20B9 \u2705 You are a Premium User Now');
//                 } catch (err) {
//                     console.log('Error is:', err);
//                 }
//             }
//         };


//         const rzpl = new Razorpay(options);
//         rzpl.open();

//         rzpl.on('payment.failed', async function (response) {
//             try {
//                 await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`, {
//                     order_id: options.order_id,
//                 }, { headers: { Authorization: token } });

//                 console.log('Payment failed:', response);
//                 alert('Something went wrong');
//             } catch (err) {
//                 console.log('Error is:', err);
//             }
//         });
//     } catch (err) {
//         console.log('Error is -> ', err);
//     }
// };


const updateTokenAndUI = (newToken) => {
    localStorage.setItem('token', newToken);
    const decodedToken = jwt_decode(newToken);
    console.log('Updated Token:', decodedToken);

    document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are a Premium User &#x1F451;</p>';
    const buyPremiumButton = document.getElementById('rzpbtn1');
    if (buyPremiumButton) {
        buyPremiumButton.style.display = 'none';
    }

    const leaderboardButton = document.getElementById('leaderboardButton');
    leaderboardButton.disabled = false;
    leaderboardButton.onclick = function () {
        window.location.href = 'leaderbrd.html';
    };

    alert('Payment Successful \u20B9 \u2705 You are a Premium User Now');
};

document.getElementById('rzpbtn1').onclick = async function (e) {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/purchase/premiumMembership`, {
            headers: { Authorization: token, price: 19900 }
        });
        console.log('Order Response:', response);

        const options = {
            key: response.data.key_id,
            order_id: response.data.order.id,
            handler: async function (response) {
                try {
                    const res = await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`, {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    }, { headers: { Authorization: token } });

                    console.log('Transaction Status Response:', res);
                    updateTokenAndUI(res.data.token);
                } catch (err) {
                    console.log('Error is:', err);
                }
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', async function (response) {
            try {
                await axios.post(`http://localhost:4000/purchase/updateTransactionStatus`, {
                    order_id: options.order_id,
                }, { headers: { Authorization: token } });

                console.log('Payment failed:', response);
                alert('Something went wrong');
            } catch (err) {
                console.log('Error is:', err);
            }
        });
    } catch (err) {
        console.log('Error is -> ', err);
    }
};

function redirectToReports() {
    window.location.href = 'reports.html';
}

function redirectToAboutUs() {
    window.location.href = 'about.html';
}

function redirectToLogout() {
    window.location.href = 'login.html';
}


