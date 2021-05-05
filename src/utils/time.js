import date from "./date.js";
//将毫秒转换成Unix时间戳
function toUnixTimestamp(millisecond) {
  return Math.floor(millisecond / 1000);
}
//将unix时间戳转换成毫秒
function toMillisecond(timestamp) {
  return timestamp * 1000;
}

const Time = {
  //将毫秒转换成Unix时间戳
  toUnixTimestamp,
  //将时间戳转换成毫秒
  toMillisecond,
  //获取当前时间戳
  getCurUnixTimestamp: function() {
    return toUnixTimestamp(new Date().getTime());
  },
  //获取今天0点0分0秒是的间戳
  getTodayUnixTimeStamp: function() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return toUnixTimestamp(date.getTime());
  },
  //获取当月1号0点0分0秒的时间戳
  getCurMonthUnixTimestamp: function() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return toUnixTimestamp(date.getTime());
  },
  //获取当年1月1号0点0分0秒的时间戳
  getCurYearUnixTimestamp: function() {
    const date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return toUnixTimestamp(date.getTime());
  },
  //获取智能提示时间  isUnix用来判断是不是unix时间戳 true代表是 false表示毫秒
  getTipTime(timestamp, isUnix = false) {
    //如果是毫秒 默认转换成unix时间戳
    if (!isUnix) {
      timestamp = toUnixTimestamp(timestamp);
    }

    const now = this.getCurUnixTimestamp(),
      today = this.getTodayUnixTimeStamp(),
      curMonth = this.getCurMonthUnixTimestamp(),
      curYear = this.getCurYearUnixTimestamp(),
      timer = now - timestamp;
    let tip;

    if (timer < 60) {
      tip = "刚刚";
    } else if (timer >= 60 && timer < 3600) {
      tip = `${Math.floor(timer / 60)}分钟前`;
    } else if (timer >= 3600 && timestamp - today >= 0) {
      tip = `${Math.floor(timer / 3600)}小时前`;
    } else if (timestamp - today < 0 && timestamp - curMonth >= 0) {
      tip = `${Math.ceil(timer / 86400)}天前`;
    } else if (timestamp - curMonth < 0 && timestamp - curYear >= 0) {
      tip = `${new Date().getMonth() -
        new Date(this.toMillisecond(timestamp)).getMonth()}月前`;
    } else {
      tip = date(date.DATE_DEFAULT, timestamp);
    }

    return tip;
  },
  date: date
};

export default Time;
