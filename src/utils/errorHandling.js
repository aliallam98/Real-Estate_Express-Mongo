export const globalErrorHandling = (error, req, res, next) => {
  return res
    .status(error.status || 400)
    .json({ success: false, message: error.message , stack : error.stack });
};
