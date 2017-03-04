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

export function Add(x, y) {
    return x + y;
};
