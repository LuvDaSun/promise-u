
export type Callback<TResult> =
    (err: Error | any | undefined | any, result: TResult) => void;

export function lift<TResult>(
    fn: (cb: Callback<TResult>) => void,
): () => Promise<TResult>;

export function lift<TResult, TArg1>(
    fn: (arg1: TArg1, cb: Callback<TResult>) => void,
): (arg1: TArg1) => Promise<TResult>;

export function lift<TResult, TArg1, TArg2>(
    fn: (arg1: TArg1, arg2: TArg2, cb: Callback<TResult>) => void,
): (arg1: TArg1, arg2: TArg2) => Promise<TResult>;

export function lift<TResult, TArg1, TArg2, TArg3>(
    fn: (arg1: TArg1, arg2: TArg2, arg3: TArg3, cb: Callback<TResult>) => void,
): (arg1: TArg1, arg2: TArg2, arg3: TArg3) => Promise<TResult>;

export function lift<
    TResult,
    TArg1, TArg2,
    TArg3, TArg4
    >(
    fn: (
        arg1: TArg1, arg2: TArg2,
        arg3: TArg3, arg4: TArg4,
        cb: Callback<TResult>,
    ) => void,
): (
        arg1: TArg1, arg2: TArg2,
        arg3: TArg3, arg4: TArg4,
    ) => Promise<TResult>;

export function lift<
    TResult,
    TArg1, TArg2,
    TArg3, TArg4, TArg5
    >(
    fn: (
        arg1: TArg1, arg2: TArg2,
        arg3: TArg3, arg4: TArg4, arg5: TArg5,
        cb: Callback<TResult>,
    ) => void,
): (
        arg1: TArg1, arg2: TArg2,
        arg3: TArg3, arg4: TArg4, arg5: TArg5,
    ) => Promise<TResult>;

export function lift<
    TResult,
    TArg1, TArg2, TArg3,
    TArg4, TArg5, TArg6
    >(
    fn: (
        arg1: TArg1, arg2: TArg2, arg3: TArg3,
        arg4: TArg4, arg5: TArg5, arg6: TArg6,
        cb: Callback<TResult>,
    ) => void,
): (
        arg1: TArg1, arg2: TArg2, arg3: TArg3,
        arg4: TArg4, arg5: TArg5, arg6: TArg6,
    ) => Promise<TResult>;

export function lift<TResult>(fn: (...args: any[]) => void) {
    return (...args: any[]) => {
        return new Promise<TResult>((resolve, reject) => {
            fn(...args, (error: Error, result: TResult) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}
