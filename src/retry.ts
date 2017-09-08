import { delay } from "./delay";

export interface RetryConfig {
    retryLimit: number;
    intervalBase: number;
    intervalIncrement: number;
}

export const defaultRetryConfig = Object.freeze<RetryConfig>({
    retryLimit: 3,
    intervalBase: 10 * 1000, // 10 seconds
    intervalIncrement: 10 * 1000, // 10 seconds,
});

export async function retry<T>(
    job: (attempt: number) => PromiseLike<T> | T,
    config: Partial<RetryConfig> = {},
): Promise<T> {
    const {
        retryLimit, intervalBase, intervalIncrement,
     } = { ...defaultRetryConfig, ...config } as RetryConfig;

    let lastError: any;

    for (let attempt = 0; attempt < retryLimit; attempt++) {
        try {
            const result: T = await job(attempt);
            return result;
        }
        catch (err) {
            lastError = err;
            await delay(
                intervalBase + intervalIncrement * attempt,
            );
        }
    }

    throw lastError;
}
