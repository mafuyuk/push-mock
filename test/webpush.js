/**
 * Created by kamono-mafuyu on 2017/03/06.
 */
import assert from "power-assert"
import sinon from "sinon"

import WebPush from "../src/webpush"

describe("webpush", () => {

    describe(".requestPushEnable()", () => {
        var stub = sinon.stub(WebPush, "requestPushEnable");
        stub.withArgs("hello").returns(true);
        stub.withArgs("goodbye").returns(false);

        it("should return granted when push enable", () => {
            assert.equal(requestPushEnable(), granted);
        });
    });
});