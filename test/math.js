/**
 * Created by mafuyuk on 2017/03/05.
 */

import assert from "power-assert"
import Add from "../src/math"

describe("math", () => {

    describe(".add(x, y)", () => {
        it("should return 3 when given 1 and 2", () => {
            assert.equal(Add(1, 2), 3);
        });
    });
});
