/**
 * Returns a consistent 404 response for unknown routes.
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
};

/**
 * Central error handler.
 *
 * Prisma/database errors are translated into safe client-facing responses.
 * The original error is only written to the server logs.
 */
export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    // Malformed JSON request body (thrown by express.json()).
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body"
        });
    }

    // Prisma known request errors.
    if (error.code) {
        switch (error.code) {
            case "P2000":
                return res.status(400).json({
                    success: false,
                    message: "A provided value is too long for its field"
                });
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "A record with the same unique value already exists"
                });
            case "P2003":
                return res.status(409).json({
                    success: false,
                    message: "This record is referenced by other records and cannot be modified"
                });
            case "P2009":
            case "P2011":
            case "P2012":
            case "P2023":
                return res.status(400).json({
                    success: false,
                    message: "Invalid data provided"
                });
            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "Record not found"
                });
            default:
                break;
        }
    }

    console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};
