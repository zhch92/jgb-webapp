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
    }
};

export default name;
