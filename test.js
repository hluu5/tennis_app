const User = require('./database-mongo/index.js').User;

User.findOne({
    username: "Mail"
}).exec().then(data=>console.log("DATAAAA", data)).catch(err=>console.log("ERRROR", err))