// app.js

"use strict";

const express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3030;
var app = express();

console.log(`${__dirname}/public`);

app.use('/', function(request, response, next) {
    console.log(`Request URI: ${request.url}`);
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/order', handlePostOrder);

app.listen(port, function() {
    console.log(`Point Of Sale Service started on port ${port}.`);
});

function handlePostOrder(request, response) {
    try
    {
        // response that uses static asset
        console.log(`POST with ${JSON.stringify(request.body)}`);

        var saleItems = request.body;
        var total = 0;

        saleItems.forEach(element => {total += element.Price});

        var replyData = {OrderId: getRandomInt(1,300), OrderTotal: total};

        response.json(replyData);
    }
    catch (err)
    {
        console.log(`Exception in POST Order Handler: ${err.message}, ${err.stack}`);
        next(err);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
