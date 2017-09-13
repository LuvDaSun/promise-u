import * as test from "blue-tape";
import { defer } from "./defer";

test("defer", async (t) => {
    {
        const d = defer();
        d.resolve(1);
        t.equal(await d.promise, 1);
    }

    {
        try {
            const d = defer();
            d.reject(1);
            await d.promise;
            t.fail();
        }
        catch (err) {
            t.pass();
        }
    }
});
