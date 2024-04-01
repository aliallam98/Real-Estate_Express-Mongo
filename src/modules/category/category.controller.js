import categoryModel from '../../../DB/models/Category.model.js'
import { asyncHandler } from '../../utils/errorHandling.js';







export const getAllCategories =asyncHandler( async (req,res,next)=>{

    let page = parseInt(req.query.page)
    if (page <= 0 || !page) page = 1;   

    let limit = parseInt(req.query.limit)
    if (limit <= 0 || !limit) limit = 5;

    const category = await categoryModel.find({}).skip((page - 1) * limit).limit(page * limit)

return res.status(200).json({success:true, category})
})


export const getCategoryById = asyncHandler(async (req,res,next)=>{
    const {id} = req.params

    const isCategoryExist = await categoryModel.findById(id)
    if(!isCategoryExist) return next(new ErrorClass('Cannot Find This Document' , 404))

    return res.status(200).json({success:true, isCategoryExist})
})

export const createNewCategory = asyncHandler(async(req,res,next)=>{

    try {
        const {name} = req.body.name
        const isNameExist = await categoryModel.findOne({name})
        if(isNameExist) return next(new ErrorClass(`This Category Name :${name} Already Exist`,409))

    req.body.slug = slugify(name)

    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`Real-Estate/${req.body.title}-${uuidv4()}`})
        req.body.image = {secure_url,public_id}
    }
    // req.body.createdBy = req.user._id
    const category = await categoryModel.create(req.body)
    return res.status(201).json({success:true,category})
    } catch (error) {
        console.log("error",error);
    }
})

export const updateCategory = asyncHandler(async(req,res,next)=>{ 
    const {id} = req.params

    const isCategoryExist = await categoryModel.findById(id)
    if(!isCategoryExist) return next(new ErrorClass('Cannot Find This Document' , 404))


    if(req.body.name){
        const isNameExist = await categoryModel.findOne({_id:{$ne:id}, name:req.body.name})
        if(isNameExist) return next(new ErrorClass(`This Category Name :${req.body.name} Already Exist`,409))
        req.body.slug = slugify(req.body.name)
    }

    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`Real-Estate/${req.body.name}-${uuidv4()}`})
        req.body.images = {secure_url,public_id} 
    }
    if(isCategoryExist.image){
        await cloudinary.uploader.destroy(public_id)
    }


    // req.body.createdBy = req.user._id
    const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    return res.status(200).json({success:true,category})
})

export const deleteCategoryById = asyncHandler(async (req,res,next)=>{
    const {id} = req.params

    const isExist = await categoryModel.findById(id)
    if(!isExist) return next(new ErrorClass('Cannot Find This Document' , 404))

    if(isExist.createdBy.toString() !== req.user._id.toString() ) 
    return next(new ErrorClass('You Are Not Authorized To Delete This Document' , 401))


    const category = await categoryModel.findByIdAndDelete(id)
    if(!category) return next(new ErrorClass('Cannot Find This Document' , 404))

    return res.status(204).json()
})
