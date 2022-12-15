const mongoose = require('mongoose');

async function connect() { 

    try {
       const client = await mongoose.connect(process.env.DB_URL);

       console.log('Connect Sucessfully!!!')
        
            // perform actions on the collection object
    } catch (error) {
        console.log('Connect FAIL!')
    }
   
 }

 module.exports = { connect };