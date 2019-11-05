import { defer } from "./defer";

export async function delay(
    ms: number,
    control?: Promise<unknown>,
): Promise<void> {
    const deferred = defer();
    const timeout = setTimeout(() => deferred.resolve(), ms);
    if (control) {
        try {
            await Promise.race([
                deferred.promise,
                control,
            ]);
        }
        finally {
            clearTimeout(timeout);
        }
    }
    else {
        await deferred.promise;
    }
}
