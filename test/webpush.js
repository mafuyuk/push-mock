/**
 * Created by kamono-mafuyu on 2017/03/06.
 */
import assert from "power-assert"
import sinon from "sinon"
import WebPush from "../src/webpush"

describe("webpush", () => {

    describe(".requestPushEnable()", () => {
        console.log(window);
        let granted = sinon.createStubInstance(window.Notification, "requestPermission");
        granted.returns('granted');

        it("should return granted when push enable", () => {
            assert.equal(WebPush.requestPushEnable() === 'granted');
        });
    });
});