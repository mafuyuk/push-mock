/**
 * Created by mafuyuk on 2017/03/05.
 */
import WebPush from './webpush';

WebPush.requestPushEnable();

function runWebPush() {
    navigator.serviceWorker.register('./sw.js')
        .then(navigator.serviceWorker.ready)
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
        .catch((e) => {
            throw e;
        });
}

runWebPush();
