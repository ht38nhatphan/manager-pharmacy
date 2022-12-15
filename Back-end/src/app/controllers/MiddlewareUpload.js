const multer = require('multer');
const path =   require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    fileFilter: function (req, file, callBack){
        if(
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"||
            file.mimetype == "image/png"
        ){
            callBack(null, true)
        } else {
            console.log('only jpg & png file supported!')
            callBack(null, false)
        }
    },
    limits: { 
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload