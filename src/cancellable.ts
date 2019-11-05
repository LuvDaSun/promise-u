// tslint:disable: max-classes-per-file

export interface Cancellation {
    promise: Promise<void>;
    cancel: () => void;
    cancelled: boolean;
}

export function cancellable(): Cancellation {
    const cancellation: Partial<Cancellation> = {};
    cancellation.promise = new Promise<void>(
        (resolve, reject) => {
            const cancel = () => {
                cancellation.cancelled = true;
                reject(cancelError);
            };
            Object.assign(cancellation, {
                cancel,
                cancellation: false,
            });
        },
    );
    return cancellation as Cancellation;
}

export class CancelError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const cancelError = new CancelError("cancelled");
