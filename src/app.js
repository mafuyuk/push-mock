// 通知の可否
function requestPushEnable() {
    Notification.requestPermission().then((permission) => {
        // Notificaiton.permissionにも引数と同じ値が格納されている
        if (permission === 'granted') {
            // 許可された場合
            console.log('許可されました');
        } else if (permission === 'denied') {
            // ブロックされた場合
            console.log('ブロックされました');
        } else if (permission === 'default') {
            // 無視されました
            console.log('無視されました');
        }
    });
}

// ServiceWorkerの登録
function registerServiceWorker() {
    // ServiceWorker未実装のブラウザでは登録を中断する
    if (!('serviceWorker' in navigator)) {
        console.error('ServiceWorker is not available');
        return;
    }

    navigator.serviceWorker.register('/sw.js', {
        scope: '/',
    }).then((registration) => {
        console.info(`Successfully registered ServiceWorker.: ${registration}`);
    }).catch((err) => {
        console.error(err);
    });
}

requestPushEnable();
registerServiceWorker();
