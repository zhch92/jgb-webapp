import config from '../config'
import { errorHandler, logger } from '../plugins/utils'

class BankService {
    getTransferBank (vue,issueId) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.get(config.ajax._get.transferBank+ '?issueId='+issueId ).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve(data.data);
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取总行失败，错误码[' + resp.status + ']');
            });
        })
    }
    getBranchBank (bankType, q, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '',vue];
            _self.$http.get(config.ajax._get.branchBank + '?bankType=' + bankType + '&q=' + q).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    if (data.data.length > 0) {
                        resolve(data.data);
                    }
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取支行失败，错误码[' + resp.status + ']');
            });
        });
    }
    getBankInfo (vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.get(config.ajax._get.bankInfo).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    (data.data) ? resolve(data.data) : reject();
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取银行信息失败，错误码[' + resp.status + ']');
            });
        });

    }
    modifyBankInfo (bankNo, branchBankNo, acctNo, bankOpenAcctPermitFileUrl, vue) {
        let [data, errCode, _self] = ['', '', vue];
        _self.$http.post(config.ajax._post.modifyBankInfo, {
            bankNo: bankNo,
            branchBankNo: branchBankNo,
            acctNo: acctNo,
            bankOpenAcctPermitFileUrl: bankOpenAcctPermitFileUrl
        }).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
                window.layer.msg('信息修改成功', {
                    time: 1300,
                    end: function () {
                        window.location.href = 'system';
                    }
                });
            } else {
                (errCode) ? errorHandler(errCode) : window.layer.msg('信息修改失败', { time: 1300 });
            }
        }, (resp) => {
            logger.error('修改银行信息失败，错误码[' + resp.status + ']');
        })
    }
}

export default new BankService();
