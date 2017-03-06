/**
 * Created by mafuyuk on 2017/03/05.
 */

import WebPush from './webpush';

WebPush.registerServiceWorker()
    .then(WebPush.requestPushEnable)
    .catch((error) => {
        console.info(error);
    });


console.log(WebPush.pushDemo());
