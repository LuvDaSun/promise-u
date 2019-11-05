import * as test from "blue-tape";
import { CancelError, cancellable } from "./cancellable";
import { delay } from "./delay";

test("should  delay", async (t) => {
    const cancellation = cancellable();
    await delay(1000, cancellation.promise);
});

test("should cancel delay", async (t) => {
    const cancellation = cancellable();
    const p = delay(1000, cancellation.promise);
    cancellation.cancel();

    try {
        await p;
        t.fail("should error");
    }
    catch (error) {
        t.ok(error instanceof CancelError);
    }
});
