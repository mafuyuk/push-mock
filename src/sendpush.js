/**
 * Created by mafuyuk on 2017/03/13.
 */
const webpush = require('web-push');
const express = require('express');

const app = express();
app.listen(9000, '0.0.0.0');

const contact = 'mailto:foo@example.jp';
const publicKey = 'BCb37fgHp86W2ilc4qPoDVbisxLw3WQ6mHM5kCcNiQC-5qb80uIYFW2QvZh4MW7PjE0JM2AjNigNBVgGl05LW5E';
const privateKey = 'a28ycY6ATsdjoYJZQgJ4nokLbkoqNo9qiNqxfYPeh8g';

webpush.setVapidDetails(contact, publicKey, privateKey);

function sendNotification() {
    // プッシュ通知の送信先情報（実際にはDB等から取得）
    const subscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/dobnyn-QMro:APA91bEmMBgSUOEKaaKRRt0R1g4PQKdwbFao-Kr1fAPxkYapSwK5klUi37cA4kj9uh40nRShiiifvWBgHlFkzZDE7fsiJVLS1Rd82K-uPbSSrHTOlDWnXl2xnOYeI_WonUNPMgR4VaVV',
        keys: {
            auth: 'HTE0qE0_h3xsMrRZmn4Dmw==',
            p256dn: 'BNjX8933QPBjY9bZJV2QmBlv6ioBnotI76uqU5Ma0c0e2XpuKLRYwftMLBG9hrySNsvSPFIx7AxNuP_OECddcS8=',
        },
    };

    // プッシュ通知で送信したい任意のデータ（ペイロード）
    const payload = JSON.stringify({
        event: 'new_article',
        title: 'タイトル',
        body: '記事',
        image: '画像url',
        url: 'URL',
        article_id: '記事のID',
    });

    // 通知送信
    webpush.sendNotification(subscription, payload);
}

app.get("/sendpush", function(){
    console.log('sendpush');
    sendNotification();
});
