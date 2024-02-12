import { generalFields, isObjectId } from "../../middleware/validation.js"
import joi from 'joi'


export const createCategory = { 
    body:joi.object().required().keys({
        name:joi.string().min(3).max(25).required()
    }),
    params:joi.object().required().keys({}),
    query:joi.object().required().keys({}),
    file:generalFields.file.required()
}
export const updateCategory = {
    body:joi.object().required().keys({
        name:joi.string().min(3).max(25).required()
    }),
    params:joi.object().required().keys({}),
    query:joi.object().required().keys({}),
    file:generalFields.file
}
export const deleteCategory = {
    body:joi.object().required().keys({}),
    params:joi.object().required().keys({
        id:joi.string().custom(isObjectId)
    }),
    query:joi.object().required().keys({}),
    file:generalFields.file
}
export const getCategoryById = {
    body:joi.object().required().keys({}),
    params:joi.object().required().keys({
        id:joi.string().custom(isObjectId)
    }),
    query:joi.object().required().keys({}),
    file:generalFields.file
}