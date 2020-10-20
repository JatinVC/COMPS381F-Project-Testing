const mongoose = require('mongoose');
const init = function(options){
    var db = mongoose.connect(`mongodb+srv://Jatin:${configFile.DB_PASS}@cluster0.l4qee.mongodb.net/${configFile.DB_NAME}?retryWrites=true&w=majority`, {useNewURLParser: true});
    if(options.global){
        global.db = db;
    }
    global.tables = [];
    return db;
}
module.exports = init;