import path from 'path'
import express from 'express'
import multer from 'multer'
import pkg from 'cloudinary'
import asyncHandler from 'express'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|heic/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

const cloudinary = pkg
router.post('/', upload.single('image'), (req, res) => {
  const uploadPhoto = cloudinary.v2.uploader.upload(`${req.file.path}`)
  console.log(uploadPhoto) // This will give you all the information back from the uploaded photo result
  console.log(uploadPhoto.url)  // This is what we want to send back now in the  res.send
  res.send(uploadPhoto.url) 
})
//which is the path on the heroku server that multer uploaded to. Same as if we left it as res.send(`/${req.file.path}`). The console logs are for your info after we save the file we then we can send that url in our res.send(uploadPhoto.url).

export default router