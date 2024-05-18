export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError"; // specific name to identify this error type
    }
}
