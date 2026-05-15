function errorMiddleware(err, req, res, next) {
    console.log("Error Occured: ", err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        success: false,
        message: "Some Error Occured",
        error: err.message
    })
}

module.exports = errorMiddleware;
// Status Codes: 404 : not found
// 200: OK
// 300 
// 500: Internal Server Error

// How to use user-define middleware globally on whole server?
// Write app.use(middleware_name)

// Normal Middleware VS Error Middleware:
// Normal middleware has 3 arguments, but error middleware has 4 agruments.
// When we call next() it means call next normal middleware 
// Where as next(any_argument) means call the next error middleware