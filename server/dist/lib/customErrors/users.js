"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoUserFoundError = void 0;
class NoUserFoundError extends Error {
    constructor(error) {
        super(error.message);
        this.data = { error };
        this.statusCode = 404;
    }
}
exports.NoUserFoundError = NoUserFoundError;
