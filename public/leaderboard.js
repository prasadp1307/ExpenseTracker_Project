// const leaderBoard = document.querySelector('.userList');
// const leaderBtn = document.querySelector('.leaderBtn');

// const leaderBoardList = (user) => {
//     const newLi = document.createElement('li');
//     newLi.classList = 'leaders';
//     newLi.innerHTML = `${user.name} - Rs. ${user.totalExpense}`;
//     document.querySelector('.userList').appendChild(newLi);
// }

// leaderBtn.onclick = async (e) => {
//     try {
//         const token = localStorage.getItem('token');
//         const users = await axios.get(`http://localhost:4000/premiumFeatures/leaderboard`, {
//             headers: { Authorization: token }
//         });
//         if(document.querySelector('.userList h2') && document.querySelector('.leaders')) {
//             document.querySelector('.userList h2').remove();
//             document.querySelector('.leaders').remove();
//         }
//         document.querySelector('.userList').innerHTML = `<h2>Leader Board:</h2>`;
//         users.data.forEach(user => {
//             leaderBoardList(user);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }


document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const leaderboardBody = document.getElementById('leaderboard-body');

    const appendLeaderboardEntry = (rank, user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rank}</td>
            <td>${user.name}</td>
            <td>Rs. ${user.totalExpense}</td>
        `;
        leaderboardBody.appendChild(row);
    };

    try {
        const response = await axios.get('http://localhost:4000/premiumFeatures/leaderboard', {
            headers: { Authorization: token }
        });

        const users = response.data;
        users.forEach((user, index) => {
            appendLeaderboardEntry(index + 1, user);
        });
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
    }
});
