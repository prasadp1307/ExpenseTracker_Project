// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('token');
//     const leaderboardButton = document.getElementById('leaderboardButton');
//     const buyPremiumButton = document.getElementById('rzpbtn1');

//     console.log('Token:', token);

//     // Function to check and handle premium status
//     const checkPremiumStatus = async () => {
//         try {
//             const premiumResponse = await axios.get('http://localhost:4000/user/checkPremium', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log('Premium Response:', premiumResponse.data);

//             if (premiumResponse.data.isPremium) {
//                 document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';
//                 if (buyPremiumButton) {
//                     e.preventDefault();
//                     buyPremiumButton.style.display = 'none';
//                 }
//                 enableLeaderboardButton();
//             } else {
//                 disableLeaderboardButton();
//             }
//         } catch (error) {
//             console.error('Error fetching premium status:', error);
//             if (error.response && error.response.status === 401) {
//                 console.error('Unauthorized request. Please check your token.');
//             }
//         }
//     };

//     // Enable the leaderboard button
//     function enableLeaderboardButton() {
//         e.preventDefault();
//         leaderboardButton.disabled = false;
//         leaderboardButton.onclick = function() {
//             window.location.href = 'leaderbrd.html';
//         };
//     }

//     // Disable the leaderboard button
//     function disableLeaderboardButton() {
//         leaderboardButton.disabled = true;
//         leaderboardButton.onclick = function() {
//             alert('You need to be a premium user to access the leaderboard.');
//         };
//     }

//     // Check premium status on page load
//     await checkPremiumStatus();
// });

// function redirectToReports() {
//     window.location.href = 'reports.html';
// }

// function redirectToAboutUs() {
//     window.location.href = 'about.html';
// }

// function redirectToLogout() {
//     window.location.href = 'login.html';
// }

// function redirectToleader() {
//     const buyPremiumButton = document.getElementById('rzpbtn1');
//     const leaderboardButton = document.getElementById('leaderboardButton');

//     if (buyPremiumButton.style.display !== 'none') {
//         window.alert('You need to be a premium user to access the leaderboard.');
//     } else {
//         window.alert('You can access the leaderboard now.');
//         window.location.href = 'leaderbrd.html';
//     }
// }


// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('token');
//     const leaderboardButton = document.getElementById('leaderboardButton');
//     const buyPremiumButton = document.getElementById('rzpbtn1');

//     console.log('Token:', token);

//     // Function to check and handle premium status
//     const checkPremiumStatus = async () => {
//         try {
//             const premiumResponse = await axios.get('http://localhost:4000/user/checkPremium', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log('Premium Response:', premiumResponse.data);

//             if (premiumResponse.data.isPremium) {
//                 localStorage.setItem('isPremium', 'true');
//                 document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';
//                 if (buyPremiumButton) {
//                     buyPremiumButton.style.display = 'none';
//                 }
//                 enableLeaderboardButton();
//             } else {
//                 localStorage.setItem('isPremium', 'false');
//                 disableLeaderboardButton();
//             }
//         } catch (error) {
//             console.error('Error fetching premium status:', error);
//             if (error.response && error.response.status === 401) {
//                 console.error('Unauthorized request. Please check your token.');
//             }
//         }
//     };

//     // Enable the leaderboard button
//     function enableLeaderboardButton() {
//         leaderboardButton.disabled = false;
//         leaderboardButton.onclick = function() {
//             window.location.href = 'leaderbrd.html';
//         };
//     }

//     // Disable the leaderboard button
//     function disableLeaderboardButton() {
//         leaderboardButton.disabled = true;
//         leaderboardButton.onclick = function() {
//             alert('You need to be a premium user to access the leaderboard.');
//         };
//     }

//     // Check premium status from localStorage on page load
//     const isPremium = localStorage.getItem('isPremium');
//     if (isPremium === 'true') {
//         document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';
//         if (buyPremiumButton) {
//             buyPremiumButton.style.display = 'none';
//         }
//         enableLeaderboardButton();
//     } else {
//         await checkPremiumStatus();
//     }
// });

// function redirectToReports() {
//     window.location.href = 'reports.html';
// }

// function redirectToAboutUs() {
//     window.location.href = 'about.html';
// }

// function redirectToLogout() {
//     window.location.href = 'login.html';
// }

// function redirectToleader() {
//     const buyPremiumButton = document.getElementById('rzpbtn1');
//     const leaderboardButton = document.getElementById('leaderboardButton');

//     if (buyPremiumButton.style.display !== 'none') {
//         window.alert('You need to be a premium user to access the leaderboard.');
//     } else {
//         window.alert('You can access the leaderboard now.');
//         window.location.href = 'leaderbrd.html';
//     }
// }



document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const leaderboardButton = document.getElementById('leaderboardButton');
    const buyPremiumButton = document.getElementById('rzpbtn1');

    const checkPremiumStatus = () => {
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                console.log('Decoded Token:', decodedToken);

                if (decodedToken && decodedToken.isPremium) {
                    document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are a Premium User &#x1F451;</p>';
                    if (buyPremiumButton) {
                        buyPremiumButton.style.display = 'none';
                    }
                    enableLeaderboardButton();
                } else {
                    disableLeaderboardButton();
                }
            } catch (err) {
                console.error('Error decoding token:', err);
            }
        } else {
            console.log('No token found');
            disableLeaderboardButton();
        }
    };

    // Enable the leaderboard button
    const enableLeaderboardButton = () => {
        leaderboardButton.disabled = false;
        leaderboardButton.onclick = function () {
            window.location.href = 'leaderbrd.html';
        };
    };

    // Disable the leaderboard button
    const disableLeaderboardButton = () => {
        leaderboardButton.disabled = true;
        leaderboardButton.onclick = function () {
            alert('You need to be a premium user to access the leaderboard.');
        };
    };

    checkPremiumStatus();
});

