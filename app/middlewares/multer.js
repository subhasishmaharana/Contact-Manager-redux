const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname + '-' + Date.now())
        cb(req.file, file.originalname )+'-' + new Date().toISOString()
      }
})

// const fileFilter = (req,file,cb) => {
//     //reject file
//     if(file.mimetype === 'image/jpeg'|| 'image.jpg'){
//         cb(null, true)
//     }else{
//         cb(null, false)
//     }
// }
const upload=multer({
    storage:storage, 
    // limits : {
    // fileSize: 1024 * 1024 * 1000
    // },
    // fileFilter: fileFilter
})

module.exports={
    upload
}