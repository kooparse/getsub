var dotenv        = require('dotenv');
    dotenv.load();

var express       = require('express'),
    db            = require('./api/config/db'),
    bodyParser    = require('body-parser'),
    app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (process.env.NODE_ENV && process.env.NODE_ENV !== 'prod') {
  app.use("/js/bundle.js", express.static(__dirname + '/app/js/bundle.js'));
  app.use("/public", express.static(__dirname + '/app/public'));
}
else {
  app.use("/js/bundle.js", express.static(__dirname + '/build/js/bundle.js'));
  app.use("/public", express.static(__dirname + '/build/public'));
  app.use("/robots.txt", express.static(__dirname + '/app/public/robots.txt'));
}



app.post('/api/v1/getsub', require('./api/controllers/sub_controller')._post);
app.get('/api/v1/getcount', require('./api/controllers/sub_controller')._getCount);


app.use(function (req, res, next) {

  if (req.originalUrl === '/robots.txt')
    return next();

  res.sendFile(__dirname + '/app/index.html');

});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.listen(process.env.PORT || 3000);
