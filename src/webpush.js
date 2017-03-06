/**
 * Created by mafuyuk on 2017/03/05.
 */

export default class WebPush {
    // 通知の可否
    static requestPushEnable = () => {
        Notification.requestPermission()
            .then((permission) => {
                // Notificaiton.permissionにも引数と同じ値が格納されている
                if (permission !== 'granted') {
                    // 許可された場合
                    Promise.reject('許可されませんでした');
                }
                Promise.resolve(permission);
            });
    }

    // ServiceWorkerの登録
    static registerServiceWorker = () => {
        // ServiceWorker未実装のブラウザでは登録を中断する
        if (!('serviceWorker' in navigator)) {
            Promise.reject('ServiceWorker is not available');
        }

        navigator.serviceWorker.register('/sw.js', {
            scope: '/',
        }).then((registration) => {
            console.info(`Successfully registered ServiceWorker.: ${registration}`);
        }).catch((err) => {
            console.error(err);
        });

        Promise.resolve(navigator.serviceWorker.ready);
    }

    // Push取得時のDEMO
    static pushDemo = () => {
        console.log('DEMO');
        return new Notification(
            'タイトル',
            {
                body: '本文',
                icon: '/icon.png',
                data: {
                    url: '/manifest.json',
                },
            },
        );
    }
}
