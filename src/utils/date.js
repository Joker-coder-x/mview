/**
 * @author 稀饭
 * @time   2021/3/28
 * 格式占位符:
            %Y   年份的四位数表示
            %y   年份的两位数表示 2009=>09
            %CY  年份的短文本表示(用汉字数字表示)
            %m   月份的数字表示（从 01 到 12）
            %M   月份的短文本表示（用三个字母表示）
            %n   月份的数字表示，不带前导零（1 到 12）
            %CM  月份的短文本表示（用3个汉字表示）
            %d   一个月的第几天(0到31)
            %D   星期几的文本表示（用三个字母表示）
            %l  （'L' 的小写形式）- 星期几的完整的文本表示
            %j   一个月中的第几天，不带前导零（1 到 31）
            %g   12 小时制，不带前导零（1 到 12）
            %G   24 小时制，不带前导零（0 到 23）
            %h   12 小时制，带前导零（01 到 12）
            %H   24 小时制，带前导零（00 到 23）
            %CH  点，汉字形式
            %i   分，带前导零（00 到 59）
            %CI  分, 汉字形式
            %s   秒，带前导零（00 到 59）
            %CS  秒，汉字形式
            %a   小写形式表示：am 或 pm
            %A   大写形式表示：AM 或 PM
            %CA  中文形式表示:上午或下午
            %F   月份的全英文形式表示
            %CM  月份的全中文形式表示
            %D   星期几的全英文表示
            %CD  星期几的全中文表示
            %CED 中文显示单月的每日日期
            %P   中文公元前或公园后
            %p   B.C.或A.D. 
 */

//数字月份映射的英文月份
const numberToEnglishMonthMap={
    "1":"January",
    "2":"February",
    "3":"March",
    "4":"April",
    "5":"May",
    "6":"June",
    "7":"July",
    "8":"August",
    "9":"September",
    "10":"October",
    "11":"November",
    "12":"December"
};
//数字月份映射的中文月份
const numberToChineseMonthMap={
    "1":"一月",
    "2":"二月",
    "3":"三月",
    "4":"四月",
    "5":"五月",
    "6":"六月",
    "7":"七月",
    "8":"八月",
    "9":"九月",
    "10":"十月",
    "11":"十一月",
    "12":"十二月"
};
//数字映射的英文一周
const numberToEnglishWeekMap={
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
};
//数字映射的中文一周
const numberToChineseWeekMap={
    "0":"星期日",
    "1":"星期一",
    "2":"星期二",
    "3":"星期三",
    "4":"星期四",
    "5":"星期五",
    "6":"星期六"
};
//数字映射的中文的日期
const numberToChineseDateMap={
    "1":"一号",
    "2":"二号",
    "3":"三号",
    "4":"四号",
    "5":"五号",
    "6":"六号",
    "7":"七号",
    "8":"八号",
    "9":"九号",
    "10":"十号",
    "11":"十一号",
    "12":"十二号",
    "13":"十三号",
    "14":"十四号",
    "15":"十五号",
    "16":"十六号",
    "17":"十七号",
    "18":"十八号",
    "19":"十九号",
    "20":"二十号",
    "21":"二十一号",
    "22":"二十二号",
    "23":"二十三号",
    "24":"二十四号",
    "25":"二十五号",
    "26":"二十六号",
    "27":"二十七号",
    "28":"二十八号",
    "29":"二十九号",
    "30":"三十号",
    "31":"三十一号"
};
const numberToChineseMap={
    "0":"零",
    "1":"一",
    "2":"二",
    "3":"三",
    "4":"四",
    "5":"五",
    "6":"六",
    "7":"七",
    "8":"八",
    "9":"九"
}
/**
 * @todo 阿拉伯数字转成汉字数字 转换最大单位为万亿
 * @param {Int} num 只能转整数有小数的话后面的小数会被舍弃
 * @returns {String}
 */
function numberToChineseNumber(num){
    const numberUnitMap={
        "2":"十",
        "3":"百",
        "4":"千",
        "5":"万",
        "6":"十万",
        "7":"百万",
        "8":"千万",
        "9":"亿",
        "10":"十亿",
        "11":"百亿",
        "12":"千亿",
        "13":"万亿"
    }
    //这里为了偷懒直接舍去小数
    num=parseInt(num);
    let strNum='';
    //生成一个被除数
    const generateDivNum=(len)=>{
        let number=1;
        for(let i=len;i>0;i--){
            number*=10;
        }
        return number;
    }

    if(num>=0&&num<10){
        strNum= numberToChineseMap[num.toString()];
    }else if(num>10){
    let len,tmpNum;
    //1.先生成一个与num的单位相同的被除数，然后num/div获取第一个数字与之对应的单位拼接到strNum上
    //2.然后用num%div获取剩下的余数
    //3.重复循环知道num>0&&num<10拼接最后一个数字之后跳出循环
    while(num!=0){
        len=num.toString().length;
        tmpNum=generateDivNum(len-1);
        strNum+=numberToChineseMap[parseInt(num/tmpNum).toString()]+numberUnitMap[len.toString()];
        num%=tmpNum;
        if(num<10&&num>0){
            strNum+=numberToChineseMap[num.toString()];
            break;
        }
    }//end while
    }else if(num<0){
        //用该负数的绝对值递归调用本函数求得结果
    strNum=`负${arguments.callee(Math.abs(num))}`
    } // else if
    return strNum;
}// end function
/**
 * @todo 通过字符从前面填充字符串到指定长度
 * @param {String} target 
 * @param {Number} len 
 * @param {String} char 
 * @returns {String}
 */
function fillLenByChar(target,len,char='0'){
    target=String(target);
    if(target.length<len){
        target=char.repeat(len-target.length)+target;
    }
    return target;
}
/**
 * @todo 数字年份转换成汉字年份
 * @param {Number} num 
 * @returns 
 */
function numberYearToChineseYear(num){
    if(typeof num==='string'){
        num=parseInt(num);
    }
    num=num.toString().split('');
    return num.map(item=>numberToChineseMap[item]).join('')+"年";
}
//匹配占位符
const reg=/%[a-zA-z]{1,2}/g;;
/**
 * v2.0
 * @todo 解析模板
 * @param {String} template 
 * @param {Function} handleMatch 
 * @returns {String}
 */
    function parseTemplate(template,handleMatch=plhc=>plhc){
    let res,
        output="";
        reg.lastIndex=0;
    const substring=len=>template=template.slice(len);
    
    while((res=reg.exec(template))){
        if(res.index>0){
            output+=template.slice(0,res.index);
        }

        output+= handleMatch(res[0]);
        substring(res.index+ res[0].length);

        reg.lastIndex=0
    }

    if(template.length>0){
        output+=template;
    }

    return output;
}

/**
* @todo  函数格式化本地日期和时间，并返回已格式化的日期字符串
* @param {String}        formatStr 
*   格式占位符:
        %Y   年份的四位数表示
        %y   年份的两位数表示 2009=>09
        %CY  年份的短文本表示(用汉字数字表示)
        %m   月份的数字表示（从 01 到 12）
        %M   月份的短文本表示（用三个字母表示）
        %n   月份的数字表示，不带前导零（1 到 12）
        %CM  月份的短文本表示（用3个汉字表示）
        %d   一个月的第几天(0到31)
        %D   星期几的文本表示（用三个字母表示）
        %l  （'L' 的小写形式）- 星期几的完整的文本表示
        %j   一个月中的第几天，不带前导零（1 到 31）
        %g   12 小时制，不带前导零（1 到 12）
        %G   24 小时制，不带前导零（0 到 23）
        %h   12 小时制，带前导零（01 到 12）
        %H   24 小时制，带前导零（00 到 23）
        %CH  点，汉字形式
        %i   分，带前导零（00 到 59）
        %CI  分, 汉字形式
        %s   秒，带前导零（00 到 59）
        %CS  秒，汉字形式
        %a   小写形式表示：am 或 pm
        %A   大写形式表示：AM 或 PM
        %CA  中文形式表示:上午或下午
        %F   月份的全英文形式表示
        %CM  月份的全中文形式表示
        %D   星期几的全英文表示
        %CD  星期几的全中文表示
        %CED 中文显示单月的每日日期
        %P   中文公元前或公园后
        %p   B.C.或A.D. 
* @param {Number|String} timestamp Unix时间戳
* @throws {TypeError}
* @returns {String}
*/
function date(formatStr,timestamp){
    let d;
    if(timestamp===undefined){
        d=new Date();
    }else if(typeof timestamp==='string'||typeof timestamp==='number') {
        timestamp=parseInt(timestamp);
        if(isNaN(timestamp)){
            throw new TypeError('必须传入一个可转换为有效数字的时间戳');
        }
        
        d=new Date(timestamp*1000);
        if(d.toString()==='Invalid Date'){
            throw new Error('传入的日期无效');
        }
    }
    
    const year=d.getFullYear(),
            month=d.getMonth()+1,
            day=d.getDate(),
            hour=d.getHours(),
            minute=d.getMinutes(),
            second=d.getSeconds(),
            weekDay=d.getDay(),
            isAM=hour<12;

    //定义一个占位符与对应的处理函数的集合对象
    const placeholderHandlerMap={
        "%Y":()=>year,
        "%y":()=>year.toString().slice(-2),
        "%CY":()=>numberYearToChineseYear(year),
        "%m":()=>fillLenByChar(month,2),
        "%M":()=>numberToEnglishMonthMap[month.toString()].slice(0,3),
        "%n":()=>month,
        "%d":()=>fillLenByChar(day,2),
        "%j":()=>day,
        "%h":()=>isAM?fillLenByChar(hour,2):fillLenByChar(hour-12,2),
        "%H":()=>fillLenByChar(hour,2),
        "%CH":()=>numberToChineseNumber(hour)+'点',
        "%g":()=>isAM?hour:hour-12,
        "%G":()=>hour,
        "%i":()=>fillLenByChar(minute,2),
        "%CI":()=>numberToChineseNumber(minute)+'分',
        "%s":()=>fillLenByChar(second,2),
        "%CS":()=>numberToChineseNumber(second)+'秒',
        "%a":()=>isAM?'am':'pm',
        "%A":()=>isAM?'AM':'PM',
        "%CA":()=>isAM?'上午':'下午',
        "%F":()=>numberToEnglishMonthMap[month.toString()],
        "%CM":()=>numberToChineseMonthMap[month.toString()],
        "%l" :()=>numberToEnglishWeekMap[weekDay.toString()],
        "%D" :()=>numberToEnglishWeekMap[weekDay.toString()].slice(0,3),
        "%CD" :()=>numberToChineseWeekMap[weekDay.toString()],
        "%CED":()=>numberToChineseDateMap[day.toString()],
        "%P":()=>year<0?'公元前':'公园',
        "%p":()=>year<0?'B.C.':'A.D.'
    }

    //v1.0
    //循环替换 嗯嗯嗯最偷懒的方法 有点耗资源... 最好使用exec解析一遍字符串就行
    // for (const plhr in placeholderHandlerMap) {
    //     if (Object.hasOwnProperty.call(placeholderHandlerMap, plhr)) {
    //         const handler = placeholderHandlerMap[plhr];
    //         formatStr= formatStr.replace(new RegExp(plhr,'g'),handler);
    //     }
    // }

    //2.0
    formatStr=parseTemplate(formatStr,plhr=>{
        const handler = placeholderHandlerMap[plhr.trim()];
        if(handler){
            return handler();
        }else {
            return plhr;
        }
    })
    
    return formatStr;
}

//把定义一些常用的时间格式定义为宏
//DATE_RFC3339 - 与 DATE_ATOM 相同
//DATE_ATOM - Atom（例如：2013-04-12T15:52:01+00:00）
date.DATE_ATOM="%Y-%m-%dT%h:%i:%s+00:00";
//DATE_COOKIE - HTTP Cookies（例如：Friday, 12-Apr-13 15:52:01 UTC） 12-Apr-13=2013年四月12号
date.DATE_COOKIE="%l, %d-%M-%y %h:%i:%s UTC";
//DATE_ISO8601 - ISO-8601（例如：2013-04-12T15:52:01+0000）
date.DATE_ISO8601="%Y-%m-%dT%h:%i:%s+0000";
//DATE_RFC822 - RFC 822（例如：Fri, 12 Apr 13 15:52:01 +0000）
date.DATE_RFC822="%D, %d %M %y %h:%i:%s +0000";
//DATE_RFC850 - RFC 850（例如：Friday, 12-Apr-13 15:52:01 UTC）
date.DATE_RFC850="%l, %d-%M-%y %h:%i:%s UTC";
//DATE_RFC1036 - RFC 1036（例如：Fri, 12 Apr 13 15:52:01 +0000）
date.DATE_RFC1036="%D, %d %M %y %h:%i:%s +0000";
//DATE_RFC1123 - RFC 1123（例如：Fri, 12 Apr 2013 15:52:01 +0000）
date.DATE_RFC1123="%D, %d %M %Y %h:%i:%s +0000";
//DATE_RFC2822 - RFC 2822（Fri, 12 Apr 2013 15:52:01 +0000）
date.DATE_RFC2822="%D, %d %M %Y %h:%i:%s +0000";
//DATE_RSS - RSS（Fri, 12 Aug 2013 15:52:01 +0000）
date.DATE_RSS="%D, %d %M %Y %h:%i:%s +0000";
//DATE_W3C - 万维网联盟（例如：2013-04-12T15:52:01+00:00）
date.DATE_W3C="%Y-%m-%dT%h:%i:%s+00:00";
//默认格式 - 2021-04-08 22:00:00
date.DATE_DEFAULT="%Y-%m-%d %h:%i:%s";


//导出接口
export default date;