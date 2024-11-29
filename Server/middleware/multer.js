const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp/")
    },
    

    filename: function (req, file, cb) {

        const fileExtension = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileNameWithoutExt = path.basename(file.originalname, fileExtension);
        cb(null, fileNameWithoutExt + '-' + uniqueSuffix + fileExtension);
    }

})

const upload = multer({ storage })

module.exports = upload