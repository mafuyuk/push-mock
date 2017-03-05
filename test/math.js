/**
 * Created by mafuyuk on 2017/03/05.
 */

import assert from "assert"
import Add from "../src/math.js"

describe("math", () => {

    describe(".add(x, y)", () => {
        it("should return 3 when given 1 and 2", () => {
            assert.strictEqual(Add(1, 2), 3);
        });
    });
});
