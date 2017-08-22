import config from '../config'
import { errorHandler, logger } from '../plugins/utils'

class CommonService {
    sendSms (mobileNo, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.sms, {
                mobile: mobileNo
            }, {
                emulateJSON: true
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve()
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('短信发送失败，错误码[' + resp.status + ']');
                reject();
            })
        });
    }
    hxSendSms (mobileNo, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.hxSms, {
                mobile: mobileNo
            }, {
                emulateJSON: true
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve()
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('短信发送失败，错误码[' + resp.status + ']');
                reject();
            })
        });
    }
    uploadImage (imageData, vue) {
        return new Promise((resolve, reject) => {
            let [data, _self] = ['', vue];
            _self.$http.post(config.ajax._post.uploadImg, imageData).then((resp) => {
                data = resp.body;
                if (data.status == 1) {
                    resolve(data.data);
                } else if (data.data == null) {
                    reject();
                }
            }, (resp) => {
                logger.error('图片上传失败，错误码[' + resp.status + ']');
                reject();
            });
        })
    }
    submitTradeInfo (urlType, payload, vue) {
        let [data, errCode, url, _self] = ['', '', '', vue];
        switch (urlType) {
            case 0:
                url = config.ajax.tradeInfo;break;
            case 1:
                url = config.ajax._post.taOpenAcct;break;
            case 2:
                url = config.ajax._post.openAcct;break;
                case 3:
                url = config.ajax._post.taOpenAcct;break;
        }
        _self.$http.post(url, payload).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
                window.layer.msg('信息提交成功', {
                    time: 1300,
                    end: function () {
                        location.reload(true);
                    }
                });
            } else {
                (errCode) ? errorHandler(errCode) : window.layer.msg('信息提交失败', { time: 1300 });
            }
        }, (resp) => {
            logger.error('企业开户失败，错误码[' + resp.status + ']');
        })
    }
}

export default new CommonService();
