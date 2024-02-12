import  mongoose, { Schema, model,Types } from "mongoose";

const listingSchema = new Schema(
  {
        title: {type:String,required:true},
        slug: String,
        category: {type:String},
        description: {type:String,required:true},
        address: {type:String,required:true},
        price: {type:String,required:true},
        discount: String,
        bathrooms: {type:String,required:true},
        bedrooms: {type:String,required:true},
        furnished: {type:Boolean},
        parking: {type:Boolean},
        purpose: {type:String, enum:["For Rent","For Sale"],required:true},
        images: [{secure_url:{type:String, required:true},public_id:{type:String, required:true}}],
        createdBy:{type:Types.ObjectId,}
  },
  { timestamps:true,
    strictQuery:true
  }
);

const listingModel = mongoose.models.Listing || model("Listing", listingSchema);

export default listingModel;
