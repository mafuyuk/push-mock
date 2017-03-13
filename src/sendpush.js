/**
 * Created by mafuyuk on 2017/03/13.
 */
import { webpush } from 'web-push';
import { express } from 'express';

const app = express();
app.listen(8000, '0.0.0.0');

const contact = 'example@email.com';
const publicKey = 'BIXmkQhnr0Nobbo1ESQLo0gdyEzi7Z7YCc5onF3eXKwIAoqkaucz9USV3gJmx2LA5qFooAtM21ZhDrOZHFfPew8';
const privateKey = 'H6XTkTWffv8nxIgUasGGiL5OHSLlf1sbgvYX_EXzfDY';

webpush.setVapidDetails(contact, publicKey, privateKey);

function sendNotification() {
    // プッシュ通知の送信先情報（実際にはDB等から取得）
    const subscription = {
        endpoint: '',
        keys: {
            auth: '',
            p256dn: '',
        },
    };

    // プッシュ通知で送信したい任意のデータ（ペーロード）
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

sendNotification();
