/**
 * Created by kamono-mafuyu on 2017/03/06.
 */
import assert from "power-assert"
import sinon from "sinon"

import WebPush from "../src/webpush"

describe("webpush", () => {
    const orgWindow = window;
    beforeEach(() => {

        window = Object.assign({}, {
            ...window,
            Notification: {
                requestPermission: () => {},
            },
        });
    });

    afterEach(() => {
        // windowをNotificationを追加する前の状態に戻す
        window = Object.assign({}, orgWindow);
    });

    // describe(".requestPushEnable()", () => {
    //     sinon.stub(window.Notification, 'requestPermission').returns('granted');
    //
    //     return WebPush.requestPushEnable().then((permission) => {
    //         assert(permission === 'granted');
    //     });
    // });
});