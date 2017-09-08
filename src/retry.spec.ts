import * as test from "blue-tape";
import { retry } from "./retry";

test("retry", async (t) => {

    {
        let callCount = 0;
        const offset = new Date().valueOf();
        const result = await retry((attempt) => {
            callCount++;
            return true;
        });

        const time = new Date().valueOf() - offset;
        t.ok(result);
        t.equal(callCount, 1);
        t.ok(time >= 0 && time < 1000, `time should be 0ms`);
    }

    {
        let callCount = 0;
        const offset = new Date().valueOf();
        const result = await retry((attempt) => {
            callCount++;
            if (attempt === 2) return true;
            throw new Error("cancel");
        }, { intervalBase: 1000, intervalIncrement: 1000 });

        const time = new Date().valueOf() - offset;
        t.ok(result);
        t.equal(callCount, 3);
        t.ok(time >= 3000 && time < 4000, `time should be 3000ms`);
    }

    {
        let callCount = 0;
        const offset = new Date().valueOf();

        try {
            const result = await retry((attempt) => {
                callCount++;
                throw new Error("cancel");
            }, { intervalBase: 1000, intervalIncrement: 0, retryLimit: 4 });
            t.fail("should throw");
        }
        catch (err) {
            t.pass("should throw");
        }

        const time = new Date().valueOf() - offset;
        t.equal(callCount, 4);
        t.ok(time >= 4000 && time < 5000, `time should be 3000ms`);
    }

});
