import * as test from "blue-tape";
import { cancelError, cancellable } from "./cancellable";

test("cancellation", async (t) => {
    try {
        const c = cancellable();
        c.cancel();
        await c.promise;
        t.fail();
    }
    catch (error) {
        t.equal(error, cancelError);
    }
});
