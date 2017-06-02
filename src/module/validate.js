
class ValidationUnitiy {
  // 验证用户名
  static isUsername (s) {
    return /^[a-z|A-Z|0-9|_|-|\u4e00-\u9fa5]{2,10}$/.test(s)
  }

  // 验证密码
  static isPassword (s) {
    return /^[a-z|A-Z|0-9|_|-|\u4e00-\u9fa5]{4,10}$/.test(s)
  }

  // 验证手机号
  static isTelephone (s) {
    return /^1[3|4|5|6|7|8|9]\d{9}$/.test(s)
  }

  // 验证6位数字验证码
  static isVCode6 (s) {
    return /^[0-9]{6}$/.test(s)
  }

  // 验证4位验证码
  static isVCode4 (s) {
    return /^[\S]{4}$/.test(s)
  }

  // 验证email
  static isEmail (s) {
    return /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(s)
  }

  static isiPhone () {
    return /iPhone/.test(navigator.userAgent)
  }
}

export default ValidationUnitiy

