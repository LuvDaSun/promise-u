import { CancellationController, cancellationRejection } from "./cancellation";

export function delay(
    ms: number,
    cancellation?: CancellationController,
) {
    return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);

        if (cancellation) cancellation.addCancellationHandler(() => {
            clearTimeout(timeout);
            reject(cancellationRejection);
        });
    });
}
