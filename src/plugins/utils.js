import Vue from 'vue'
import userService from '../services/userService'
import config from '../config'

// 事件总线
export const eventHub = new Vue();

/**
 * 时间转换
 * @param {number} date - 时间戳
 * @param {string} fmt - 格式
 * @returns {string}
 */
export const dateFormat = (date, fmt) => {
    if (!isNaN(date) && date != null) {
        let str = new Date(date);
        let obj = {
            'M+': str.getMonth() + 1,
            'd+': str.getDate(),
            'h+': str.getHours(),
            'm+': str.getMinutes(),
            's+': str.getSeconds(),
            'q+': Math.floor((str.getMonth() + 3) / 3),
            'S': str.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in obj)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (('00' + obj[k]).substr(('' + obj[k]).length)));
        return fmt;
    } else {
        return '';
    }
};

/**
 * 获取链接参数
 * @param {string} param - 参数名
 * @returns {any}
 */
export const getUrlParam = (param) => {
    let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
};

/**
 * 去除字符串空格
 * @param {string} value - 字符串
 * @returns {*}
 */
export const stringTrim = (value) => {
    if (value) {
        return value.replace(/\s/g, '');
    } else {
        return value;
    }
};

/**
 * 本地存储管理
 */
export const storageManager = {
    getItem: (key, transfer) => {
        let value = '';
        transfer ? value = JSON.parse(window.localStorage.getItem(key)) : value = window.localStorage.getItem(key);
        return value;
    },
    setItem: (key, value) => {
        try {
            if (typeof(value) == 'object') {
                window.localStorage.setItem(key, JSON.stringify(value));
            } else {
                window.localStorage.setItem(key, value);
            }
        } catch (e) {
            alert('请关闭浏览器的隐身模式或无痕浏览！');
        }
    },
    removeItem: (data) => {
        if (data instanceof Array) {
            for (let i in data) {
                window.localStorage.removeItem(data[i]);
            }
        } else {
            window.localStorage.removeItem(data);
        }
    }
};

/**
 * Cookie管理
 */
export const cookieManager = {
    getItem: (key) => {
        if (document.cookie.length > 0) {
            let c_name = key;
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return document.cookie.substring(c_start, c_end);
            }
        }
        return '';
    },
    setItem: (key, value, expires) => {
        let exdate = new Date();
        let path = config.cookie.default.path;
        exdate.setDate(exdate.getDate() + expires);
        document.cookie = key + '=' + value + ';expires=' + exdate.toGMTString() + ';path=' + path;
    },
    removeItem: (data) => {
        let path = config.cookie.default.path;
        if (data instanceof Array) {
            for (let i in data) {
                document.cookie = data[i] + '= ;expires=-1' + ';path=' + path;
            }
        } else {
            document.cookie = data + '= ;expires=-1' + ';path=' + path;
        }
    }
};

/**
 * 错误码处理
 * @param {string} errCode - 错误码
 */
export const errorHandler = (errCode) => {
    switch (errCode) {
        case null: break;
        case '-1004':
            window.layer.msg('会话已过期，请重新登陆', {
                time: 1300,
                end: function () {
                    userService.logout()
                }
            });
            break;
        case 'J0001':
            window.layer.msg('该企业已注册', { time: 1300 });break;
        case 'J0002':
            window.layer.msg('图片验证码不正确', { time: 1300 });break;
        case 'J0003':
            window.layer.msg('短信验证码不正确', { time: 1300 });break;
        case 'J0004':
            window.layer.msg('手机号已注册', { time: 1300 });break;
        case 'J0005':
            window.layer.msg('短信发送太频繁', { time: 1300 });break;
        case 'J0006':
            window.layer.msg('短信发送失败', { time: 1300 });break;
        case 'J0008':
            window.layer.msg('用户名或密码为空', { time: 1300 });break;
        case 'J0009':
            window.layer.msg('用户名或密码错误', { time: 1300 });break;
        case 'J0010':
            window.layer.msg('手机号码不存在', { time: 1300 });break;
        case 'J0011':
            window.layer.msg('该企业已开户', { time: 1300 });break;
        case 'J0012':
            window.layer.msg('用户暂未开户', { time: 1300 });break;
        case 'J0013':
            window.layer.msg('交易失败，请重试', { time: 1300 });break;
        case 'J0014':
            window.layer.msg('开户正在处理中,请稍后', { time: 1300 });break;
        case 'J0015':
            window.layer.msg('营业执照信息不能为空', { time: 1300 });break;
        case 'J0016':
            window.layer.msg('企业电话不能为空', { time: 1300});break;
        case 'J0017':
            window.layer.msg('银行信息不能为空', { time: 1300 });break;
        case 'J0018':
            window.layer.msg('法人信息不能为空', { time: 1300 });break;
        case 'J0019':
            window.layer.msg('联行号错误', { time: 1300 });break;
        case 'J0020':
            window.layer.msg('名称不能为空', { time: 1300 });break;
        case 'J0021':
            window.layer.msg('中国基金协会备案凭证不能为空', { time: 1300 });break;
         case 'J0024':
            window.layer.msg('经办人信息不能为空 ', { time: 1300 });break;
        case 'J0025':
            window.layer.msg('调用华信查询产品额度失败 ', { time: 1300 });break;
        case 'J0026':
            window.layer.msg('无效的手机号码 ', { time: 1300 });break;
        case 'J0027':
            window.layer.msg('请输入四个汉字的产品简称 ', { time: 1300 });break; 
        case 'J0028':
            window.layer.msg('可申购份额不足 ', { time: 1300 });break;
        default:
            window.layer.msg('未知错误，返回首页', {
                time: 1300,
                end: function () {
                    window.location.href = 'index';
                }
            });
            break;
    }
};

/**
 * 打印
 */
export const logger = {
    normal: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.log(time + ' 系统日志：' + str);
    },
    info: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.info(time + ' 系统消息：' + str);
    },
    warn: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.warn(time + ' 系统警告：' + str);
    },
    error: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.error(time + ' 系统错误：' + str);
    }
};
