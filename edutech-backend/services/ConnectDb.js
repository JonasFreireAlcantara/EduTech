const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@cluster0.ewelv.mongodb.net/test?retryWrites=true&w=majority";

var db = mongoose.createConnection(uri, { dbName:'EduTech', useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => {
                console.log(res);
            });

process.env.MONGODB_URI = uri;
