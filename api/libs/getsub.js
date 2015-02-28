var opensubtitles = require('opensubtitles-client'),
    _             = require('underscore');


exports.getUrl = function (fileName, lang, auto, callback) {

  var loggedToken,
      resultSub,
      length;

  opensubtitles.api.login()
    .done(function (token) {
      loggedToken = token;

      opensubtitles.api.search(token, lang, fileName)
          .done(function (results) {
                opensubtitles.api.logout(token);

                if (!results || !results[0])
                  return callback(true, null);


                if (!auto) {
                  resultSub =  _.map(results, function (result) {

                    length = result.SubDownloadLink.length - 3

                    return {
                      subFileName       : result.SubFileName,
                      subAddDate        : result.SubAddDate,
                      subDownloadLink   : result.SubDownloadLink.substring(0, length)
                    }
                  });

                  resultObj = {
                    queryFileName     : fileName,
                    languageName      : lang,
                    provider          : 'opensubtitle',
                    auto              : false,
                    subList           : resultSub
                  };
                }

                else {
                  resultSub = results[0].SubDownloadLink,
                  length  = resultSub.length - 3;

                  resultObj = {
                    queryFileName     : fileName,
                    languageName      : lang,
                    provider          : 'opensubtitle',
                    auto              : true,
                    subList           : [{
                      subFileName       : results[0].SubFileName,
                      subAddDate        : results[0].SubAddDate,
                      subDownloadLink   : resultSub.substring(0, length)
                    }]
                  };

                }

                callback(null, resultObj);
              }
          );

    });

};
