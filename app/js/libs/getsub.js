var request = require('superagent');


module.exports = {

  getUrl: function (dataForm, callback) {
    request.post('/api/v1/getsub', dataForm, function (err, res) {
      if (res.status !== 200)
        callback(true, null);
      else
        callback(null, JSON.parse(res.text));
    });
  },

  getCount: function (callback) {
    request.get('/api/v1/getcount', function (err, res) {
      if (res.status === 200)
        callback(null, JSON.parse(res.text).count)
    });
  }

};
