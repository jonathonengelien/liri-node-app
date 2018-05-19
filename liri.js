require("dotenv").config();

var fs = require("fs"),
    keys = require('./keys.js'),
    request = require("request"),
    Spotify = require('node-spotify-api'),
    Twitter = require('twitter');

var spotifyObject = new Spotify(keys.spotify);
var twitterObject = new Twitter(keys.twitter);

var command = process.argv[2];
var userInput = process.argv[3];

//switch case for command user gives
switch (command) {
    case "spotify-this-song":
        spotifyResult(userInput);
        break;
};

function readRandom() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        for (var i = 0; i < dataArr.length; i++) {
            command = dataArr[0];
            userInput = dataArr[1];
            spotifyResult();
        }
    });
};

function spotifyResult() {
    var song = userInput;
    if (song === undefined) {
        song = 'The Sign Ace of Base';
    }
    spotifyObject
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {
            var songResult = response.tracks;
            //console.log(songResult);
            console.log('\n');
            console.log('========= SONG RESULT ==========');
            console.log('Artist: ' + songResult.items[0].artists[0].name);
            console.log('Song: ' + songResult.items[0].name);
            console.log('Url: ' + songResult.items[0].preview_url);
            console.log('Album: ' + songResult.items[0].album.name);
            console.log('=======================================');
        })
};

//Start of Application
readRandom();