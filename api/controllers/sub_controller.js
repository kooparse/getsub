var getsub      = require('../libs/getsub'),
    Sub         = require('../models/sub_model');


exports._post = function (req, res) {

  var fileName = req.body.fileName,
      lang     = req.body.lang;

  if (!fileName || !lang)
    return res.sendStatus(500);

  getsub.getUrl(fileName, lang, function (err, resultObj) {

    if (err)
      return res.sendStatus(404);

    var sub = new Sub();

    sub.queryFileName   = resultObj.queryFileName;
    sub.languageName    = resultObj.languageName;
    sub.provider        = resultObj.provider;
    sub.subAddDate      = resultObj.subAddDate;
    sub.subFileName     = resultObj.subFileName;
    sub.subDownloadLink = resultObj.subDownloadLink;

    sub.save();

    res.json({ downloadUrl: resultObj.subDownloadLink });
  });

};

exports._getCount = function (req, res) {

  Sub.getSubCount(function (err, count) {
    if (!err)
      res.send({ count: count });
  });

};
