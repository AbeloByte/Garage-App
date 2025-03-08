// import the install service to handle the communication
const installService = require('../services/install.service')

// create a function to handle the install request
async function install(req,res, next) {
    //  call the install 
    // message success
    const installMessage  = await installService.install();
    if (installMessage.status === 200){

        res.status(200).json({
            message : installMessage
        })
    }
    else{
        res.status(500).json({
            message : installMessage
        })
    }
    
}

module.exports = {install}