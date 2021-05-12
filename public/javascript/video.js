
// require google apis package "npm i googleapis"
const { google } = require('googleapis');
//AIzaSyBRqNr_DoBpN-1JZDJymfAVPPEw0juYfnY - api key
require('dotenv').config();

const ytForm = document.getElementById('#yt-form');

google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    q: 'motivation',
    maxResults: 5,

}).then((response) => {
    const { data } = response;
    data.items.forEach((item) => {
        console.log(`Title: ${item.snippet.title}\nDescription:${item.snippet.description}\n`);

    })
}).catch((err) => console.log(err));

ytForm.addEventListener("submit")