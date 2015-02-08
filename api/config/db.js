var mongoose  = require('mongoose');

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'prod')
  return mongoose.connect('mongodb://localhost/getsub');
else
  return mongoose.connect(process.env.MONGOHQ_URL);
