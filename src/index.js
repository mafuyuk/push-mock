/**
 * Created by mafuyuk on 2017/03/05.
 */

import WebPush from './webpush';

WebPush.requestPushEnable();

console.log(WebPush.pushDemo());

WebPush.registerServiceWorker();
