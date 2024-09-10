const customError = (message, status) => {
return {
    message: message, 
    status: status,
}
}

module.exports = customError;