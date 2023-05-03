export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: object[] = []) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message: string, errors: object[] = []): ApiError {
        return new ApiError(400, message, errors);
    }
}