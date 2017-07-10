import * as test from "blue-tape";
import { lift } from "./lift";

test("lift", async (t) => {
    const refResult = {};
    const refError = new Error();

    function fn(ok: boolean, cb: (error: Error | null, result: any) => void) {
        if (ok) {
            cb(null, refResult);
        } else {
            cb(refError, null);
        }
    }

    const lifted = lift(fn);

    await Promise.all([
        lifted(true).then((result) => {
            t.equal(refResult, result);
        }),
        lifted(false).then(null, (error) => {
            t.equal(refError, error);
        }),
    ]);

});
