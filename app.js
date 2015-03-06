var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var fs = require('fs');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// State is the current slide position
var state = 0;
// Clients is a list of users who have connected
var clients = [];
// Bind socket.io to express


// For each connection made add the client to the
// list of clients.
io.on('connection', function(client) {
    clients.push(client);
    io.emit('state', { currState: state });
});

// This is a simple wrapper for sending a message
// to all the connected users and pruning out the
// disconnected ones.
function send(message, id) {

    io.emit('state', { currState: message, userId:id });
    clients.forEach(function(client) {

        if(client._open) {
            client.send(message);
        }
        // Prune out disconnected user
        else {
            delete client;
        }
    });
}

// Advancing will... move the slides forward!
app.get('/advance', function(req, res) {
    // Increment and send over socket

    state = 1;
    send(state, req.param('name'));
    console.log('/advance' + state);
    // Send the state as a response
    res.send(state.toString());
});

// Receding will... move the slides backwards!
app.get('/recede', function(req, res) {
    state = -1;
   // console.log('/recede');
    send(state, req.param('name'));
    //send(state);

    res.send(state.toString());
});

// Receding will... move the slides backwards!
app.get('/reset', function(req, res) {
    state = 0;
    //console.log(state);
    send(state, req.param('name'));
    res.send(state.toString());
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(req.url);
});

// error handlers

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// This will allow the presenter to clear the
// slides of any cornification.
app.get('/refresh', function(req, res) {
    client.send({ refresh: true });
    res.send(state.toString());
});

// Reset will not refresh cornfication, but
// will send the slides back to the beginning.
app.get('/reset', function(req, res) {
    state = 1;
    send({ state: state });

    res.send(state.toString());
});

// Send the controller for any other request to this
// Node.js server.
app.get('*', function(req, res) {
    fs.readFile('controller.html', function(err, buffer) {
        res.send(buffer.toString());
        console.log('controller app call!!!!');
    });
});

/**
 * Created by Les-Rae.Superman on 13/11/2014.
 */
module.exports = app;