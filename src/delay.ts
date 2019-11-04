import { CancellationController, cancellationRejection } from "./cancellation";

export function delay(
    ms: number,
    cancellation?: CancellationController,
) {
    return new Promise<void>((resolve, reject) => {
        if (cancellation) {
            const cancellationHandler = () => {
                clearTimeout(timeout);
                reject(cancellationRejection);
            };
            const timeout = setTimeout(() => {
                cancellation.removeCancellationHandler(cancellationHandler);
                resolve();
            }, ms);
            cancellation.addCancellationHandler(cancellationHandler);
        }
        else {
            setTimeout(resolve, ms);
        }
    });
}
