import multer from 'multer'


export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    file: ['application/pdf', 'application/msword'],
    video: ['video/mp4'],
    imageAndVideos: ['video/mp4','image/jpeg', 'image/png', 'image/gif']
}



export function uploadFile(customValidation = []) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('In-valid file format', false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload
}