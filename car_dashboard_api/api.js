var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBlxrsQbCirLGqFMpN31ELeXunRD25AWkw",
    authDomain: "bluesky-f8c8f.firebaseapp.com",
    databaseURL: "https://bluesky-f8c8f.firebaseio.com",
    storageBucket: "bluesky-f8c8f.appspot.com",
    messagingSenderId: "153943703031"
};
firebase.initializeApp(config);

app.get('/get_cars', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;

    var page = req.query.page;
    var limit = 15;
    var json_result = {};


    // MongoClient.connect('mongodb://localhost:27017/bluesky', function (err, db) {
    MongoClient.connect('mongodb://carinventory:pTsoWMptFf9dM3N2SO0OmTkw6NvVZdxBe1ymmnKSVSm7F0Gn9bilglTDDYUPVPQhobNLqFNgNgM836GBT1xtDw==@carinventory.documents.azure.com:10250/carinventory?ssl=true', function (err, db) {
        if (err) throw err;

        json_result.total = db.collection('delosdigital').find().count(function (err, count) {
            json_result.total = count;
            json_result.pages = Math.ceil(json_result.total / limit);

            db.collection('delosdigital').find().skip( (page-1) * limit ).limit(limit).toArray(function (err, result) {
                if (err) throw err;

                res.setHeader('Access-Control-Allow-Origin', '*');
                json_result.cars = result;
                res.json(json_result);
            })
        });
    });
});

app.post('/login', function (req, res) {
    firebase.database().ref('users').on("value", function(snapshot) {
        var users = snapshot.val();

        var check_result = 0;
        users.forEach(function(user) {
            if(user.email == req.body.email && user.password == req.body.passwd) {
                check_result = 1;
            }
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({success: check_result});
    });
});

app.listen(3006, function () {
    console.log('Api app listening on port 3006!')
});
