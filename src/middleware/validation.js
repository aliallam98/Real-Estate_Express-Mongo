import joi from "joi";

export const validation = (schema)=>{
    return (req, res, next) => {
        const validationErr = []
        for (const key of schema) {
            if(schema[key]){
                const validationResults = schema[key.validate(req[key],{abortEarly: false})]
                if (validationResults.error) {
                    validationErr.push(validationResult.error.details);
                  }
            }
            
        }

        if (validationErr.length) return res.status(422).json({ message: 'Validation Err', validationErr });
        return next();
      };
}

export const isObjectId = (value, helper) => {
    // console.log({ value });
    // console.log(helper);
    return Types.ObjectId.isValid(value)
      ? true
      : helper.message("In-valid objectId");
  };

  export const generalFields = {
    file: joi.object({
      size: joi.number().positive().required(),
      path: joi.string().required(),
      filename: joi.string().required(),
      destination: joi.string().required(),
      mimetype: joi.string().required(),
      encoding: joi.string().required(),
      originalname: joi.string().required(),
      fieldname: joi.string().required(),
    })
  };