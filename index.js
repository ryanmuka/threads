const { ThreadsAPI } = require('threads-api');
const axios = require('axios');
require('dotenv').config();

async function randomQuote() {
    try {
      const response = await axios.get('https://seohandal.id/quote.json');
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex]['quote'];
      return randomQuote;
    } catch (error) {
      throw new Error('Failed to retrieve random quote.');
    }
}

const main = async () => {
    try {
        const threadsAPI = new ThreadsAPI({
            username: process.env.UNAME,
            password: process.env.PASSW
        });

        const q = await randomQuote();
        const p = await threadsAPI.publish({
          text: q,
        });

        console.log(p);

    } catch (error) {
        console.log("failed");
    }
}
  
setInterval( async () => {
        await main()
    }, process.env.DELAY * 1000);
