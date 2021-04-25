/***
 * @author:稀饭
 * @date 2021/04/12
 * @copyright @稀饭
 */
const createVerificationFactory  =  (()=>{
// ==================================================共用方法部分=================================================================== //
/**
 * @todo 随机生成要绘制的文字的位置 此函数只对text-align为left text-baseLine为ideographic或者bottom是有效
 * @param   {HTMLCanvasElement} canvas 
 * @param   {String} text 
 * @returns {{x,y}}
 */
function genrateTextRandomPos(canvas,text){
    const context=canvas.getContext('2d'),
          reg=/(\d+)px/,
          macthed= context.font.match(reg),
          canvasWidth=canvas.width,
          canvasHeight=canvas.height;

    let x=0,y=50;
    if(macthed){
        const fontSize=parseFloat(macthed[1]),
            textWidth=fontSize*text.length,
            textHeight=fontSize,
            validAreaWidth=canvasWidth-textWidth,
            validAreaHeight=canvasHeight-textHeight;

        x   =   validAreaWidth<0?0:Math.random()*validAreaWidth;
        if(x<0) x   =   0;
        y   =   validAreaHeight < 0 ? fontSize : Math.random() * validAreaHeight;
        if(y < fontSize) y = fontSize;
    }

    return {x,y};
}

/**
 * @todo 生成随机的一个计算表达式 和一个表达式的结果
 * @param {Number}         operatorCount  运算符的数量
 * @param {Array}          operatorConfig 运算符的配置
 * @param {{min,max}}      valueRange     算子的范围
 * @returns {{  expression,expressionResult}} 
 * @throws {Error} 参数结构不正确抛出
 */
function genrateRandomExpression(operatorCount=1,operatorConfig=null,valueRange={min:1,max:10}){
    const allowOperatorList = ['+','-','*','/'],
        expressionObj  = {
                expression:'',
                expressionResult:null
        };

    if(operatorConfig===null){
        operatorConfig=allowOperatorList;
    }else if(!operatorConfig.every(item=>allowOperatorList.indexOf(item)!==-1)){
        throw new Error('oprator只支持'+JSON.stringify(allowOperatorList));
    }

    const {min,max}=(()=>{
        if(isNaN(Number(valueRange.min))&&isNaN(Number(valueRange.max))){
            throw new Error(`valueRange的min和max属性只能是Number类型`);
        }

        const {min,max}=valueRange;

        valueRange.min=Math.min(min,max);
        valueRange.max=Math.max(min,max);
        return valueRange;
    })();

    let rvalue,
        operator,
        expression='',
        lvalue='';

    const genrateOfValueRangeNum=()=>Math.floor((Math.random()*max)+min);

    while(operatorCount){
        if(lvalue==='') lvalue = genrateOfValueRangeNum();

        operator   =  operatorConfig[Math.floor(Math.random()*operatorConfig.length)];
        rvalue     =  genrateOfValueRangeNum();
        
        expression =  `${lvalue} ${operator} ${rvalue}`;
        --operatorCount;
        lvalue=expression;
    }

    expressionObj.expression         =   expression;
    expressionObj.expressionResult   =   Math.round(eval(expression));

    return expressionObj;
}

/**
 * @todo 生成一段指定长度的随机字符
 * @param {Number} len 
 * @returns {String}
 */
function genrateRandonCharCode(len){
    let charList=[
        'a','b','c','d','e','f','g','h', 'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'
    ];

    let str='';
    for(let i=0;i<len;i++){
        str+=charList[Math.floor(Math.random()*charList.length)];
    }

    return str;
}

/**
 * @todo 绘制线段
 * @param {HTMLCanvasElement的2d上下文} context 
 * @param {Number} startX  
 * @param {Number} startY 
 * @param {Number} endX 
 * @param {Number} endY 
 * @param {Number} lineWidth 
 * @returns {void}
 */
function baseDrawLine(context,startX,startY,endX,endY,lineWidth=1){
    context.beginPath();
    context.lineWidth=lineWidth;
    context.moveTo(startX, startY);
    context.lineTo(endX,endY);
    context.stroke();
}

/**
 * @todo 
 * @param   {HTMLCanvasElement的2d上下文} context 
 * @param   {Number} startX 
 * @param   {Number} startY 
 * @returns {void}
 */
function baseDrawPoint(context,startX,startY){
    baseDrawLine(context,startX,startY,startX+1,startY+1);
}

/**
 * @todo 在canvs中随机生成一个坐标
 * @param {HTMLCanvasElement} canvas 
 * @returns {{x,y}}
 */
function genrateRandomPosOfCanvas(canvas){
    const width=canvas.width,
          height=canvas.height,
          x=Math.random()*width,
          y=Math.random()*height;
    return {x,y}
}

/**
 * @todo 通过选择器在页面上查询元素 如果第一个字符是 # 则采用getElementById查询
 * @param {String} selector 
 * @returns {HTMLElement}
 */
function querySelector(selector){
    if(selector.trim().charAt(0)==='#'){
        return document.getElementById(selector);
    }else{
        return document.querySelector(selector);
    }
}


// ==================================================Class部分=================================================================== //

class BaseVerification{
    constructor(canvas){
        if(typeof canvas=='string'){
            canvas=querySelector(canvas);
        }
        if(!canvas instanceof HTMLCanvasElement){
            throw new TypeError('必须传入一个canvas对象');
        }
        
        this.canvas=canvas;
        this.context=canvas.getContext('2d');
        //调用draw()之后用来验证的表达式对象
        this.expression={
            expression:'',
            expressionResult:null
        }
        this.$options={
            lineCount:10,//需要绘制的线段的数量 可选 默认是10
            pointCount:50,// {Number} 需要绘制点的数量 可选 默认是50
            lineWidth:1,//{Number}  需要绘制的线条的宽度 可选 默认是1像素
            backgroundColor:'white', //画布的颜色
            fontColor:'black',  //绘制单独字体的颜色
            fontSize:30,   //绘制的字体的大小
            isStroke:false //是否绘制描边文字
        }
    }

    /**
     * @todo 绘制线段
     * @param {Number} startX  线段起点的x坐标
     * @param {Number} startY  线段起点的y坐标
     * @param {Number} endX    线段终点的x坐标
     * @param {Number} endY    线段终点的Y坐标
     * @param {Number} lineWidth 线段的宽度
     * @returns {void}
     */
    drawLine(startX,startY,endX,endY,lineWidth=1){
        return baseDrawLine(this.context,startX,startY,endX,endY,lineWidth);
    }

    /**
     * @todo 绘制点
     * @param {Number} x  点的x坐标
     * @param {Number} y  点的y坐标
     * @returns {void}
     */
    drawPoint(x,y){
        return baseDrawPoint(this.context,x,y);
    }

    /**
     * @todo 在canvas中随机生成一个点
     * @returns {{x,y}}
     */
    genrateRandomPos(){
        return genrateRandomPosOfCanvas(this.canvas);
    }

    /**
     * @dodo 在canvas中随机绘制点和线
     * @param {Number} lineNum  线段是数量
     * @param {Number} pointNum  点的数量
     * @param {Number} lineWidth  线段的宽度
     * @returns {void}
     */
    randomDrawLineAndPoint(lineNum,pointNum,lineWidth=1){
        const maxNum = Math.max(lineNum,pointNum);
        let   startPos,
              endPos,
              pointPos;

        for(let i=0;i<maxNum;i++){
            if(i<lineNum){
                startPos = this.genrateRandomPos();
                endPos   = this.genrateRandomPos();
                this.drawLine(startPos.x,startPos.y,endPos.x,endPos.y,lineWidth);
            }
            if(i<pointNum){
                pointPos = this.genrateRandomPos();
                this.drawPoint(pointPos.x,pointPos.y);
            }
        }
    }
   
    /**
     * @todo 在canvas中绘制验证内容
     * @param {Object} opts 
     *      lineCount:10,//需要绘制的线段的数量 可选 默认是10
            pointCount:50,// {Number} 需要绘制点的数量 可选 默认是50
            lineWidth:1,//{Number}  需要绘制的线条的宽度 可选 默认是1像素
            backgroundColor:'white', //画布的颜色
            fontColor:'black',  //绘制单独字体的颜色
            fontSize:30,   //绘制的字体的大小
            isStroke:false //是否绘制描边文字
     * @returns {{expression,expressionResult}} 
     * 返回值的结构:
     *          expression : 生成的表达式的字符串(不带后缀) 
     *          expressionResult : 生成的表达式的运算结果 Number类型
     */
     draw(opts={}){
        const {$options}=this;

        //更新最新配置项
        if(opts.lineCount){
            $options.lineCount=opts.lineCount;
        }
        if(opts.pointCount){
            $options.pointCount=opts.pointCount;
        }
        if(opts.lineWidth){
            $options.lineWidth=opts.lineWidth;
        }
        if(opts.backgroundColor){ 
            $options.backgroundColor=opts.backgroundColor;
        }
        if(opts.fontColor){
            $options.fontColor=opts.fontColor;
        }
        if(opts.fontSize){
            $options.fontSize=opts.fontSize;
        }
        if(opts.isStroke){
            $options.isStroke=opts.isStroke;
        }

        //设置字体大小
        this.context.font=`${opts.fontSize||$options.fontSize}px serif`;
        this.context.fillStyle=opts.backgroundColor||$options.backgroundColor;
        //清空canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //绘制背景颜色
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        //随机绘制点线
        this.randomDrawLineAndPoint(opts.lineCount||$options.lineCount,opts.pointCount||$options.pointCount,opts.lineWidth||$options.lineWidth);

        const  {text,expressionObj,textPos} = this.getExpression(opts);

        //设置字体颜色 
        this.context[opts.isStroke||$options.isStroke?'strokeStyle':'fillStyle']=opts.fontColor||$options.fontColor;
        //动态设置镂空或者是填充样式
        this.context[opts.isStroke||$options.isStroke?'strokeText':'fillText'](text,textPos.x,textPos.y);
        this.expression=expressionObj;

        return expressionObj;
    }

    /**
     * @todo  抽象接口 由子类重写该方法
     * @param {*} opts 
     */
    getExpression(opts){}

    /**
     * 重新绘制验证内容 参照跟draw一样
     * @param  {...any} args 
     * @returns {void}
     */
    reDraw(...args){
        return this.draw(args);
    }

    /**
     * @todo  验证函数
     * @param {String} value 
     * @param {Boolean} isUpperCase 是否全部大写
     * @returns {Boolean}
     */
    verification(value,isUpperCase=true){
        const {expressionResult}=this.expression;

        if(isUpperCase){
            return expressionResult!==null&&expressionResult.toString().toUpperCase()===value.toString().toUpperCase();
        }else{
            return expressionResult!==null&&expressionResult.toString()===value.toString();
        } 
    }

     /**
     * @todo  验证函数 verification的别名
     * @param {String} value 
     * @param {Boolean} isUpperCase 是否全部大写
     * @returns {Boolean}
     */
    test(value,isUpperCase=true){
        return  this.verification(value,isUpperCase);
    }
}




/**
 * 使用方法 const veri=new VerificionExp(canvas);
 *         veri.draw();
 *         //验证
 *         veri.expression.expressionResult=='xxx'
 */
class VerificionExp extends BaseVerification {
    constructor(canvas){
       super(canvas);
       //初始化配置
       this.$options.expPostfix=' = ?';
       this.$options.operatorConfig=['+','-','*','/'];
       this.$options.operatorCount=2;
       this.$options.valueRange={
           min:1,
           max:10
       };
    }

    /**
     * @todo 返回一个绘制表达式的信息
     * @param {Object} opts 
     * @override
     *  expPostfix:' = ?',{String} 生成的表达式的后缀  可选  默认是 ' = ?'
     *  operatorCount:2, {Number}  随机的表达式的运算符的数量 可选 默认为2
     *  operatorConfig:undefined,  {Array|null} 生成的表达式中可以存在的运算符的配置 可选 默认为Null表示* / + -都可以存在
     *  valueRange:undefined  {{min:Number,max:Number}|undefined} 生成的表达式中的每个算子的范围 可选 默认范围1-10
     */
    getExpression(opts){
        const {$options}=this;
        //随时采用最新配置
        if(opts.operatorConfig){
            $options.operatorConfig=opts.operatorConfig;
        }
        if(opts.operatorCount){
            $options.operatorCount=opts.operatorCount;
        }
        if(opts.valueRange){
            $options.valueRange=opts.valueRange;
        }
        if(opts.expPostfix){
            $options.expPostfix=opts.expPostfix;
        }

        //没有设置配置则采用上一次设置的配置
        const expressionObj   =   genrateRandomExpression(opts.operatorCount||$options.operatorCount,opts.operatorConfig||$options.operatorConfig,opts.valueRange||$options.valueRange),
              text            =   expressionObj.expression+ (opts.expPostfix||$options.expPostfix),
              textPos         =   genrateTextRandomPos(this.canvas,text);

       
        return {
            expressionObj,
            text,
            textPos
        }
    }
}


/**
 * 使用方法 const veri=new VerificationCode(canvas);
 *         veri.draw();
 *         //验证
 *         veri.expression.expressionResult=='xxx'
 */
class VerificationCode extends BaseVerification {
    constructor(canvas){
        super(canvas);
        this.$options.codeLen=4;
    }

    /**
     * @override
     * @todo 返回一个绘制表达式的信息
     * @param {Object} opts 
     *    codeLen:4   {Number}    验证字符的长度 可选 默认是4
     */
    getExpression(opts){
        const {$options}=this;

        if(opts.codeLen){
            $options.codeLen=opts.codeLen;
        }

        const randomCode     =    genrateRandonCharCode(opts.codeLen||$options.codeLen),
              expressionObj  =   {
                expression:randomCode,
                expressionResult:randomCode
              },
              text           =   expressionObj.expression,
              textPos        =   genrateTextRandomPos(this.canvas,text);

        return {
            expressionObj,
            text,
            textPos
        }
    }
}

// ================================================================导出接口部分======================================================================== //

/**
 * @todo 创建验证插件的工厂函数
 * @param {HTMLCanvasElement} canvas 
 * @param {String} type exp为表达式验证 code为验证码验证 
 * @throws {TypeError}  传入的验证类型不存在时讲会抛出
 * @returns {BaseVerification}
 */
function createVerificationFactory(canvas,type='exp'){
   let instance=null;
   switch(type){
       case 'exp':
           instance=new VerificionExp(canvas);
           break;
       case 'code':
           instance=new VerificationCode(canvas);
           break;
       default:
          throw new TypeError(`暂不支持${type}类型`);
   }

   return instance;
}

//导出接口
if(window) window.createVerificationFactory=createVerificationFactory;

return createVerificationFactory;

})();



//如果你需要用es6Module导出 只需要取消下面注释的代码就行
export default createVerificationFactory;