import * as test from "blue-tape";
import { CancellationController, CancellationRejection as CancellationError } from "./cancellation";
import { delay } from "./delay";

test("should cancel delay", async (t) => {
    const cancellation = new CancellationController();
    const p = delay(1000, cancellation);
    cancellation.cancel();

    try {
        await p;
        t.fail("should error");
    }
    catch (error) {
        t.ok(error instanceof CancellationError);
    }
});
