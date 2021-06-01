const mongoose = require('mongoose');


exports.isValidId = id => mongoose.Types.ObjectId.isValid(id);
