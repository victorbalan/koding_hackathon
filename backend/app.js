var express     = require('express');
var connect     = require('connect');
var app         = express();
var port        = process.env.PORT || 8081;

// Configuration
app.use(express.static(__dirname + '/public'));

app.use(connect.logger('dev'));
app.use(connect.json());  
app.use(connect.urlencoded());

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,  Content-Type, Accept, Authorization');
    next();
});

app.options('*', function(req, res) {
    res.send(200);
});

require('./routes')(app)

app.listen(port);

console.log('The App runs on port ' + port);