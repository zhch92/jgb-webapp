import config from "../config";
import {
  getUrlParam,
  errorHandler,
  storageManager,
  cookieManager,
  logger
} from "../plugins/utils";

class UserService {
  login(payload) {
    return new Promise((resolve, reject) => {
      let [data, errCode, redirect, username, password, _self] = [
        "",
        "",
        getUrlParam("redirect"),
        payload.username,
        payload.password,
        payload.instance
      ];
      _self.$http
        .post(config.ajax._post.login, {
          telphone: username,
          passwd: password
        })
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
              switch (data.data.status) {
                case 0:
                  _self.$router.push({
                    name: "register",
                    query: { verify: true }
                  });
                  break;
                case 1:
                  resolve();
                  let query = decodeURIComponent(redirect);
                  storageManager.setItem(config.session.loginKey, true);
                  storageManager.setItem(config.session.userKey, data.data);
                  _self.keepName
                    ? cookieManager.setItem(config.cookie.userKey, username, 30)
                    : cookieManager.removeItem(config.cookie.userKey);
                  redirect
                    ? _self.$router.push(query)
                    : _self.$router.push({ name: "account" });
                  break;
              }
            } else {
              errorHandler(errCode);
            }
          },
          resp => {
            logger.error("登录失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
  logout() {
    return new Promise((resolve, reject) => {
      resolve();
      storageManager.removeItem([
        config.session.loginKey,
        config.session.userKey
      ]);
      window.location.reload(true);
    });
  }
  register(
    organName,
    realName,
    telphone,
    imageVerifiCode,
    telVerifiCode,
    passwd,
    vue
  ) {
    return new Promise((resolve, reject) => {
      let [data, errCode, _self] = ["", "", vue];
      _self.$http
        .post(config.ajax._post.register, {
          organName: organName,
          realName: realName,
          telphone: telphone,
          imageVerifiCode: imageVerifiCode,
          telVerifiCode: telVerifiCode,
          passwd: passwd
        })
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
              resolve();
            } else {
              errCode
                ? errorHandler(errCode)
                : window.layer.msg("注册失败", { time: 1300 });
            }
          },
          resp => {
            logger.error("用户注册失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
  modifyPassword(oldPass, newPass, vue) {
    return new Promise((resolve, reject) => {
      let [data, errCode, _self] = ["", "", vue];
      _self.$http
        .post(config.ajax._post.changePwd, {
          oldPass: oldPass,
          passwd: newPass
        })
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
              resolve();
            } else {
              errCode
                ? errorHandler(errCode)
                : window.layer.msg("密码修改失败", { time: 1300 });
            }
          },
          resp => {
            logger.info("修改密码失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
  forgetPassword(telphone, imageVerifiCode, telVerifiCode, passwd, vue) {
    return new Promise((resolve, reject) => {
      let [data, errCode, _self] = ["", "", vue];
      _self.$http
        .post(config.ajax._post.forget, {
          telphone: telphone,
          imageVerifiCode: imageVerifiCode,
          telVerifiCode: telVerifiCode,
          passwd: passwd
        })
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (!errCode) {
              resolve();
            } else {
              errorHandler(errCode);
            }
          },
          resp => {
            logger.error("修改密码失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
  feedback(orgName, content, vue) {
    return new Promise((resolve, reject) => {
      let [data, errCode, _self] = ["", "", vue];
      _self.$http
        .post(config.ajax._post.feedback, {
          orgName: orgName,
          content: content
        })
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
              resolve();
            } else {
              errCode
                ? errorHandler(errCode)
                : window.layer.msg("反馈失败", { time: 1300 });
            }
          },
          resp => {
            logger.error("反馈失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
  getCity(provCode, vue) {
    return new Promise((resolve, reject) => {
      let [data, errCode, _self] = ["", "", vue];
      _self.$http
        .post(
          config.ajax._post.city,
          {
            q: provCode
          },
          {
            emulateJSON: true
          }
        )
        .then(
          resp => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
              vue.cityList = [
                {
                  cityCode: undefined,
                  cityName: "请选择",
                  provCode: "",
                  cityAttr: "",
                  cityKeyword: "",
                  provPinyinSi: "",
                  provPinyin: "",
                  cityPinyinSi: "",
                  cityPinyin: ""
                },
                ...data.data
              ];
            } else {
              vue.cityList = [
                {
                  cityCode: undefined,
                  cityName: "请选择",
                  provCode: "",
                  cityAttr: "",
                  cityKeyword: "",
                  provPinyinSi: "",
                  provPinyin: "",
                  cityPinyinSi: "",
                  cityPinyin: ""
                }
              ];
              // errorHandler(errCode)
            }
          },
          resp => {
            logger.error("获取城市编码失败，错误码[" + resp.status + "]");
          }
        );
    });
  }
}

export default new UserService();
