 export class NoUserFoundError extends Error {
    private data: { error: any };
    private statusCode: number;

    constructor(error: { message: string | undefined; }) {
        super(error.message);
        this.data = { error };
        this.statusCode = 404;
    }
}
