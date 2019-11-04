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

    private handlers = new Set<CancellationHandler>();

    public cancel() {
        if (this.cancelled) return;

        this.cancelled = true;
        for (const handler of Array.from(this.handlers)) {
            this.executeHandler(handler);
        }
    }

    public addCancellationHandler(handler: CancellationHandler) {
        this.handlers.add(handler);

        if (this.cancelled) this.executeHandler(handler);
    }

    public removeCancellationHandler(handler: CancellationHandler) {
        this.handlers.delete(handler);
    }

    private executeHandler(handler: CancellationHandler) {
        this.removeCancellationHandler(handler);

        handler();
    }
}
