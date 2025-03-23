export const errorHandler = (statusCode,message)=>{ // to handle errors
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};