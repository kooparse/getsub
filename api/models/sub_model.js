var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.Types.ObjectId;



var subSchema = new Schema({

  queryFileName     : { type: String, required: true },

  languageName      : { type: String, required: true },

  provider          : { type: String, required: true },

  auto              : { type: Boolean, required: true },

  subList           : [{
                        subFileName       : { type: String, required: true },

                        subDownloadLink   : { type: String, required: true },

                        subAddDate        : { type: Date, required: true }
                      }]

});


subSchema.statics.getSubCount = function (callback) {

  this.count({}, function (err, c) {
    if (!err)
      callback(null, c);
  });

};



module.exports = mongoose.model('sub', subSchema);
