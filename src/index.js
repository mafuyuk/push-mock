/**
 * Created by mafuyuk on 2017/03/05.
 */
import EventEmitter2 from 'eventemitter2';

import WebPush from './webpush';

export default class RunWebPush extends EventEmitter2 {
    constructor() {
        super();
        this.subscribe();
    }

    subscribe() {
        WebPush.requestPushEnable()
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
                this.emit('success');
            })
            .catch((e) => {
                this.emit('error', e);
            });
    }
}

console.log('RunWebPush');
const ev = new RunWebPush();
ev.on('error', (e) => {
    console.log(`ERROR: ${e}`);
}).on('success', () => {
    console.log('SUCCESS');
});
