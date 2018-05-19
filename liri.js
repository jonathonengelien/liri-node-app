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
    case "my-tweets":
        twitterResult();
        break;
    case "movie-this":
        movieResult();
        break;
    case "do-what-it-says":
        randomResult();
        break;
};

//Function to display spotify results
function spotifyResult(userInput) {
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
            console.log('============= SONG RESULT =============');
            console.log('Artist: ' + songResult.items[0].artists[0].name);
            console.log('Song: ' + songResult.items[0].name);
            console.log('Url: ' + songResult.items[0].preview_url);
            console.log('Album: ' + songResult.items[0].album.name);
            console.log('=======================================');
            console.log('\n');
        })
};


//Function to display twitter results
function twitterResult() {
    var username = {
        screen_name: '@jte49832'
    };
    twitterObject.get('statuses/user_timeline', username, function (error, tweets, response) {
        if (error) {
            console.log('Error: ' + error);
        };
        //console.log(tweets);
        for (var i = 0; i < 4; i++) {
            var tweetNumber = tweets[i];
            console.log('MY TWEET #:' + [i+1] + '=============================');
            console.log('Tweet: ' + tweetNumber.text);
            console.log('Created at: ' + tweetNumber.created_at);
            console.log('========================================');
            console.log('\n');
        }
    });
};


//Function to display Movie Results
function movieResult() {
    var movieInput = userInput;
    if (movieInput === undefined) {
        movieInput = 'Mr Nobody';
    }
    console.log(movieInput)
    request('https://www.omdbapi.com/?t=' + movieInput + '&&y=&plot=short&apikey=trilogy', function (error, response, body) {
        if (error) {
            console.log('Error:' + error);
        }
        var movie = JSON.parse(body);
        console.log('============ MOVIE RESULT ============');
        console.log('Title: ' + movie.Title);
        console.log('Year: ' + movie.Year);
        console.log('IMDB Rating: ' + movie.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + movie.Ratings[1].Value);
        console.log('Country: ' + movie.Country);
        console.log('Language: ' + movie.Language);
        console.log('Plot: ' + movie.Plot);
        console.log('Actors: ' + movie.Actors);
        console.log('=======================================');
        console.log('\n');
    });
};

//Function runs the Random.txt file and runs the command in there
function randomResult() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            var dataArr = data.split(",");
            userInput = dataArr[1];
            command = dataArr[0];
            
            if (command === "my-tweets") {
                twitterResult();
            } else if (command === "spotify-this-song") {
                spotifyResult(userInput);
            } else {
                movieResult();
            }     
        };
    })
};
