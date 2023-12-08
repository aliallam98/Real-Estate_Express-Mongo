import  {Schema , model,models} from 'mongoose'


const categorySchema = new Schema({
    name :{type:String,required:true},
    slug:String,
    image:{secure_url:String,public_id:String}
},{
    timestamps:true
})

const categoryModel = models.Category || model("Category", categorySchema)


export default categoryModel