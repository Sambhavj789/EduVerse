function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = asyncHandler;

// asyncHandler(register);
// normal middleware: next()
// error middleware: next(err)