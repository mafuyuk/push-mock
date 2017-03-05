/**
 * Created by mafuyuk on 2017/03/05.
 */

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('click', (event) => {
    console.log(`通知がクリックされました: ${event}`);

    if (!event.data) {
        return;
    }

    const data = event.data.json();

    // 通知をクリックした時に必要なデータをセット
    event.waitUntil(this.registration.showNotification(
        data.title,
        {
            body: data.body,
            icon: data.icon,
            data: { url: data.url },
        },
    ));
});

self.addEventListener('notificationclick', (event) => {
    console.log(`通知がクリック後の操作: ${event}`);

    event.notification.close();

    const notification = event.notification;
    console.log(notification);
    const url = event.notification.url;

    event.waitUntil(this.clients.matchAll({
        type: 'window',
    }).then((clientList) => {
        for (let i = 0; i < clientList.length; i += 1) {
            const client = clientList[i];
            if ('focus' in client) {
                return client.focus();
            }
        }
        if (this.clients.openWindow) {
            return this.clients.openWindow(url);
        }
        return this.clients.openWindow(url);
    }));
});
