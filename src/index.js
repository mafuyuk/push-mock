/**
 * Created by mafuyuk on 2017/03/05.
 */
import WebPush from './webpush';

WebPush.requestPushEnable();

navigator.serviceWorker.register('./sw.js')
    .then(navigator.serviceWorker.ready)
    .then((result) => {
        // 通知購読要求
        const serverKey = 'BIXmkQhnr0Nobbo1ESQLo0gdyEzi7Z7YCc5onF3eXKwIAoqkaucz9USV3gJmx2LA5qFooAtM21ZhDrOZHFfPew8';
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
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: subscriptionInfo,
            },
        );
    })
    .catch((e) => {
        throw e;
    });
