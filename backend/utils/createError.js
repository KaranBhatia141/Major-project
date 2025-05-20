const createError = (status, message) => {  // error message
    const err = new Error();
    err.status = status;
    err.message = message;
  
    return err;
  };

  module.exports = createError;