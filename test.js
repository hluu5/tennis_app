const User = require('./database-mongo/index.js').User;
const bcrypt = require('bcrypt');
// User.findOne({
//     username: "Mail"
// }).exec().then(data=>console.log("DATAAAA", data)).catch(err=>console.log("ERRROR", err))

User.findOne({email: 'lmhuy_lmhuy@yahoo.comrwqrqwrqw'}).exec().then(data=>{
    console.log("DATAAAA", data);
    bcrypt.compare('rqwfwqfqw231', data.password, function(err, res) {
        console.log(res);
    });
})
.catch(err=>console.log("ERRROR", err))
