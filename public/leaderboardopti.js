document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const leaderboardButton = document.getElementById('leaderboardButton');
    console.log('Token:', token);

    // Function to check and handle premium status
    const checkPremiumStatus = async () => {
        try {
            const premiumResponse = await axios.get('http://localhost:4000/user/checkPremium', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Premium Response:', premiumResponse.data);

            if (premiumResponse.data.isPremium) {
                document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';
                const buyPremiumButton = document.getElementById('rzpbtn1');
                if (buyPremiumButton) {
                    buyPremiumButton.style.display = 'none';
                }

                // Enable the leaderboard button
                leaderboardButton.disabled = false;
                leaderboardButton.onclick = function() {
                    window.location.href = 'leaderbrd.html';
                };
            } else {
                leaderboardButton.onclick = function() {
                    alert('You need to be a premium user to access the leaderboard.');
                };
            }
        } catch (error) {
            console.error('Error fetching premium status:', error);
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized request. Please check your token.');
            }
        }
    };

    // Check premium status on page load
    await checkPremiumStatus();
});

function redirectToReports() {
    window.location.href = 'reports.html';
}

function redirectToAboutUs() {
    window.location.href = 'about.html';
}

function redirectToLogout() {
    window.location.href = 'login.html';
}
