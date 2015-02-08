var opensubtitles = require('opensubtitles-client');


exports.getUrl = function (fileName, lang, callback) {

  var loggedToken;

  opensubtitles.api.login()
    .done(function (token) {
      loggedToken = token;

      opensubtitles.api.search(token, lang, fileName)
          .done(function (results) {
                opensubtitles.api.logout(token);

                if (!results || !results[0]) {
                  return callback(true, null)
                }

                var subLink = results[0].SubDownloadLink,
                    length  = subLink.length - 3;

                var resultObj = {
                  queryFileName   : fileName,
                  languageName    : lang,
                  provider        : 'opensubtitle',
                  subAddDate      : results[0].SubAddDate,
                  subFileName     : results[0].SubFileName,
                  subDownloadLink : subLink.substring(0, length)
                }

                callback(null, resultObj);
              }
          );

    });

};
