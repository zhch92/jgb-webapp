const name = {
    /**
     * 产品名称处理
     * @param {string} value - 产品名称
     * @param {string} type - 截取类型
     * @returns {string}
     */
    formatProdName (value, type) {
        let newValue = '';
        switch (type) {
            case '0':
                newValue = value.substring(0, value.indexOf('（'));
                break;
            case '1':
                newValue = value.substring(value.indexOf('（'));
                break;
            default:
                break;
        }
        return newValue;
    },
    /**
     * 投资人名称处理
     * @param {string} value - 投资人名称
     * @param {number} length - 要截取的长度
     * @returns {string}
     */
    formatInvestorName (value, length) {
        if (value) {
            if (value.length > length) {
                value = value.substr(0, length) + '...';
            }
        }
        return value;
    },
     /**
     * 基金名称转换
     * @param {string} value - 基金类型
     * @returns {string}
     */
    fundsName (value) {
        if (value==1) {
                value = '长信';
        }else if(value==2){
                value = '广发';

        }else if(value==3){
                value = '定期';

        }else if(value==4){
                value = '华信';
            
        }
        return value;
    }
};

export default name;
