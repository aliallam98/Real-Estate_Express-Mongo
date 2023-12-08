import  { Schema, model,models,Types } from "mongoose";

const listingSchema = new Schema(
  {
        name: {type:String,required:true},
        slug: String,
        category: {type:String,required:true},
        description: {type:String,required:true},
        address: {type:String,required:true},
        price: {type:String,required:true},
        discount: {type:String,required:true},
        bathroom: {type:String,required:true},
        bedrooms: {type:String,required:true},
        furnished: {type:Boolean,required:true},
        purpose: {type:String, enum:["For Rent","For Sale"],required:true},
        images: [{secure_url:{type:String, required:true},public_id:{type:String, required:true}}],
        createdBy:{type:Types.ObjectId,}
  },
  { timestamps:true }
);

const listingModel = models.Listing || model("Listing", listingSchema);

export default listingModel;
