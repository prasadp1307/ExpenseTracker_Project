document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const leaderboardBody = document.getElementById('leaderboard-body');

    if (!leaderboardBody) {
        console.error('Leaderboard body element not found.');
        return;
    }    

    const appendLeaderboardEntry = (rank, user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rank}</td>
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>Rs. ${user.totalExpense}</td>
        `;
        leaderboardBody.appendChild(row);
    };

    try {
        const response = await axios.get('http://localhost:4000/premiumFeatures/leaderboard', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const users = response.data;
        users.forEach((user, index) => {
            appendLeaderboardEntry(index + 1, user);
        });

        // Check if the user is a premium user
        const premiumResponse = await axios.get('http://localhost:4000/user/checkPremium', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (premiumResponse.data.isPremium) {
            document.querySelector('.premium').innerHTML = '<p>&#x1F451; You are Premium User &#x1F451;</p>';
            const buyPremiumButton = document.getElementById('rzpbtn1');
            if (buyPremiumButton) {
                buyPremiumButton.style.display = 'none';
                
            }
        }
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request. Please check your token.');
        }
        
        };
    }
);

