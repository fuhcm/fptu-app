const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eW5obWluaHR1ZnVAZ21haWwuY29tIiwibmlja25hbWUiOiJEYXJrbG9yZCIsImlhdCI6MTU4NDAwMTcxMCwiZXhwIjoxNTg0MDg4MTEwfQ.9FOV-LJMDuFfwFpQV3Kw1vXvK4alJnuzw9MLmA23HCg';

async function calAvgProcess(numberOfPosts, token) {
  const { data } = await axios.get('https://api.fuhcm.com/api/v1/confessions?load=' + numberOfPosts, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  });

  const realData = data.filter(e => e.status !== 0);
  const meanStr = realData.map(item => Math.abs(new Date(item.updatedAt) - new Date(item.createdAt)) / 36e5.toFixed(2));
  const meanNum = meanStr.map(e => parseFloat(e));
  const sum = meanNum.reduce((a, b) => a + b, 0);
  return (sum / meanNum.length);
}

async function main() {
  for (let i = 0; i < 15; i++) {
    const index = i + 1;
    const avg = await calAvgProcess(500 * index, token);
    console.log(`Thoi gian duyet cua ${500 * index} confessions truoc: ${avg.toFixed(2)}h`);
  }
}

main();
