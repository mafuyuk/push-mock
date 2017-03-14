/**
 * Created by mafuyuk on 2017/03/05.
 */

export default class WebPush {
    // 通知の可否
    static requestPushEnable() {
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
    static registerServiceWorker() {
        return new Promise((resolve, reject) => {
            // ServiceWorker未実装のブラウザでは登録を中断する
            if (!('serviceWorker' in navigator)) {
                reject('ServiceWorker is not available');
            }

            navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            }).then((registration) => {
                resolve(registration.serviceWorker.ready);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    // Push取得時のDEMO
    static pushDemo() {
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

    static urlsafeB64toBin(urlsafeb64) {
        const b64 = urlsafeb64.replace(/-/g, '+').replace(/_/g, '/');
        const raw = window.atob(b64);

        const result = new Uint8Array(raw.length);

        for (let i = 0; i < raw.length; i += 1) {
            result[i] = raw.charCodeAt(i);
        }

        return result;
    }
}
