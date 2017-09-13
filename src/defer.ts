export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: any) => void;
}

export function defer<T = any>(): Deferred<T> {
    const deferred: Partial<Deferred<T>> = {};
    deferred.promise = new Promise<T>(
        (resolve, reject) => Object.assign(deferred, {
            resolve, reject,
        }),
    );
    return deferred as Deferred<T>;
}
