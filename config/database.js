const mongoose = require('mongoose')

// db configuration
const configureDB =  () => {
    mongoose.connect('mongodb://localhost:27017/aug-notes-app', {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
        .then(() => {
            console.log('Connected to database')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = configureDB
