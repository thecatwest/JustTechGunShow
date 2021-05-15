
// require google apis package "npm i googleapis"
// const {google} = require('googleapis');


// const { response } = require('express');

// //AIzaSyBRqNr_DoBpN-1JZDJymfAVPPEw0juYfnY - api key
// require('dotenv').config();


const ytForm = document.getElementById('yt-form');


// function ytSearch() {


//     var searchInput = document.querySelector('#search-input').value.trim();
//     // console.log(searchInput) this console log confirms it works so I am getting value

//     google.youtube('v3').search.list({
//         key: process.env.YOUTUBE_TOKEN,
//         // key: 'AIzaSyBRqNr_DoBpN-1JZDJymfAVPPEw0juYfnY',
//         part: 'snippet',
//         q: 'motivation',
//         maxResults: 5,
    
//     }).then((response) => {
//         console.log(response)


//         const { data } = response;
//         data.items.forEach((item) => {
//             console.log(`Title: ${item.snippet.title}\nDescription:${item.snippet.description}\n`);
    
//         })
//     }).catch((err) => console.log(err));
// }



function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyBRqNr_DoBpN-1JZDJymfAVPPEw0juYfnY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    var searchInput = document.querySelector('#search-input').value.trim();
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 5,
      "q": searchInput
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });



ytForm.addEventListener("click", execute())
