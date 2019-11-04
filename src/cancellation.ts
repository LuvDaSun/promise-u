// tslint:disable: max-classes-per-file

export class CancellationRejection extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const cancellationRejection = new CancellationRejection("cancelled");

export type CancellationHandler = () => void;

export class CancellationController {
    public cancelled = false;

    private handlers = new Array<CancellationHandler>();

    public cancel() {
        if (this.cancelled) return;

        this.cancelled = true;
        for (const handler of this.handlers) {
            handler();
        }
    }

    public addCancellationHandler(handler: CancellationHandler) {
        this.handlers.push(handler);
    }
}
