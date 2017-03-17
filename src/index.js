/**
 * Created by mafuyuk on 2017/03/05.
 */
import EventEmitter2 from 'eventemitter2';

import WebPush from './webpush';

function subscribe() {
    return WebPush.requestPushEnable()
        .then(WebPush.registerServiceWorker)
        .then((result) => {
            // 通知購読要求
            const serverKey = 'BCb37fgHp86W2ilc4qPoDVbisxLw3WQ6mHM5kCcNiQC-5qb80uIYFW2QvZh4MW7PjE0JM2AjNigNBVgGl05LW5E';
            const serverKeyBin = WebPush.urlsafeB64toBin(serverKey);

            return result.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: serverKeyBin,
            });
        })
        .then((subscription) => {
            // エンドポイントなどの取得
            const subscriptionInfo = JSON.stringify(subscription);

            fetch(
                '/api/push/subscribe',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: subscriptionInfo,
                },
            );
        })
        .catch(e => Promise.reject(e));
}

function runWebPush() {
    const ev = new EventEmitter2();

    subscribe()
        .then(ev.emit('success'))
        .catch((e) => {
            ev.emit('error', e);
        });

    return ev;
}

window.runWebPush = runWebPush;

