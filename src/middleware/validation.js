import joi from "joi";

export const validation = (schema) => {
  return (req, res, next) => {
    const schemaKeys = Object.keys(schema);
    const validationErrors = [];
    for (const key of schemaKeys) {
      if (req[key]) {
        // Validate only if data exists for the key
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErrors.push(validationResult.error.details);
        }
      }
    }


    if (validationErrors.length) {
      return res
        .status(422)
        .json({ message: "Validation Err", validationErrors });
    }

    return next();
  };
};
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
  }),
};
