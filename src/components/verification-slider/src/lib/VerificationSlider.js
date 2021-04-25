/***
 * @name 滑动验证
 * @author 稀饭
 * @date 2020/04/13
 * @export {class} VerificationSlider
 * @constructor
 * @param onload 在传入的imgList列表中第一张图片加载成功时调用
 * @param opts   配置项
 *  opts结构: 
 *      imgList {Array}             用来绘制的图片数组 可是是Image对象或者img标签 也可以是正确的文件路径
 *      canvas  {HTMLCanvasElement} 原生画布,绘制图片的画布 必填
 *      clipCvs {HTMLCanvasElement} 被裁剪用来移动的拼图所在的canvas 必填
 *      clipAreaWidth  {Number}     裁剪块的宽度  可选 默认 50 单位像素
 *      cilpAreaHeight {Number}     裁剪块的高度  可选 默认 50 单位像素
 *      radius         {Number}     拼图的附加圆的半径大小 可选 默认 10 单位像素
 *      borderWidth    {Number}     裁剪拼图的边框的宽度   可选  默认 3 单位像素
 *      borderColor    {String}     裁剪拼图的边框颜色     可选  默认 黄色
 *@property readyImageList          已经加载完成的图片列表
 *@method  genrateClipPosition      生成裁剪区域信息
 *@method  genrateVerificationArea  生成验证区域内容
 *@method  getCurImg                获取当前图片
 *@method  next                     切换到下一张图片
 *@method  back                     切换到上一张图片
 *@method  setClipCvsOffsetLeft     设置裁剪图像的offsetLeft
 *@method  verification             结果校验 有一个可选参数 
 *@method  test                     verification的封装接口
 * @param   {Number}                 deviationRange  可允许的误差范围(校验精度) 可选 默认是10
 * @returns {Boolean}                true表示验证成功 false表示失败
 */

const VerificationSlider = (() => {
    /**
     * @todo 绘制裁剪图像
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} x        需要绘制的x坐标
     * @param {Number} y        需要绘制的y坐标
     * @param {Number} width    需要绘制的宽度 可选 默认为50 单位像素
     * @param {Number} height   需要绘制的高度 可选 默认为50 单位像素
     * @param {Number} radius   附加圆的半径   可选 默认为10 单位像素
     * @returns {Object}
     */
    function drawClipShape(context, x, y, width = 50, height = 50, radius = width / 6) {
        context.beginPath();
        context.moveTo(x, y);
        //绘制矩形
        context.rect(x, y, width, height);
        //绘制上边框的附加圆
        const firstArcX = x + (width / 2),
            firstArcY = y - (radius / 2);
        context.moveTo(firstArcX, firstArcY)
        context.arc(firstArcX, firstArcY, radius, 0, Math.PI * 2);
        //绘制右边框的附加圆
        const secondArcX = x + width + (radius / 2),
            secondArcY = y + (height / 2);
        context.moveTo(secondArcX, secondArcY);
        context.arc(secondArcX, secondArcY, radius, 0, Math.PI * 2);
        //描边
        context.stroke();
        //返回路径信息对象
        const infoObj = {
            clipX: x,
            clipY: firstArcY - radius,
            clipWidth: width + radius + (radius / 2),
            clipHieght: height + radius + (radius / 2),
            radius: radius,
        }

        return infoObj;
    }



    /**
     * @todo 生成一个以裁剪的验证内容
     * @param {HTMLCanvasElement} canvas        原画布canvas
     * @param {HTMLCanvasElement} clipCvs       被裁剪区域的画布canvas
     * @param {HTMLImageElement}  img           需要绘制的图像
     * @param {Array}             clipPosition  一个包含裁剪信息的数组
     * @param  {Number}           borderWidth   裁剪区域的边框宽度 可选 默认为3 单位px
     * @param  {String}           borderColo    裁剪区域的边框颜色 可选 默认为黄色
     * @returns {Object}
     */
    function genrate(canvas, clipCvs, img, clipPosition, borderWidth = 3, borderColor = 'yellow') {
        //获取绘图上下文
        const context = canvas.getContext('2d'),
            clipCtx = clipCvs.getContext('2d');

        //清空画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        clipCtx.clearRect(0, 0, clipCvs.width, clipCvs.height);

        //保存状态
        context.save();
        //保存配置，用于后面恢复
        const lastBorderColor = context.strokeStyle,
            lastLineWidth = context.lineWidth;
        //设置描边颜色和边框宽度
        context.strokeStyle = borderColor;
        context.lineWidth = borderWidth;
        const infoObj = drawClipShape(context, clipPosition[0], clipPosition[1], clipPosition[2], clipPosition[3], clipPosition[4]);

        //裁剪区域
        context.clip();
        //绘制图片
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        //复原边框宽度和描边颜色
        context.strokeStyle = lastBorderColor;
        context.lineWidth = lastLineWidth;

        //获取裁剪的图像通道data
        const data = context.getImageData(infoObj.clipX - borderWidth, infoObj.clipY - borderWidth, infoObj.clipWidth + (borderWidth * 2), infoObj.clipHieght + (borderWidth * 2));
        clipCvs.width = data.width;

        clipCtx.putImageData(data, 0, infoObj.clipY - borderWidth);

        //恢复之前保存的状态
        context.restore();
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        //绘制被裁剪的形状占位
        drawClipShape(context, clipPosition[0], clipPosition[1], clipPosition[2], clipPosition[3], clipPosition[4]);
        context.fillStyle = 'white';
        context.fill();

        // ===============================================生成返回值==================================================== //

        /**
         * @todo 结果校验
         * @params {Number}  deviationRange  可允许的误差范围 可选 默认是10
         * @returns {Boolean}
         * **/
        const verification = (deviationRange = 10) => Math.abs(clipCvs.offsetLeft - clipPosition[0]) <= deviationRange ? true : false;

        /**
         * @todo   设置裁剪图像的offsetLeft
         * @params {Number}  offsetLeft 需要设置的偏移量
         * **/
        const setClipCvsOffsetLeft = offsetLeft => clipCvs.style.left = `${offsetLeft}px`;

        return {
            verification,
            setClipCvsOffsetLeft
        }

    }


    /**
     * @todo  初始化图像列表
     * @param {Array} imgList 
     * @param {Function} callback 
     * @returns {void}
     */
    function initImageList(imgList, callback) {
        const readyImageList = [];

        new Promise(resolve => {
            if (imgList.length == 0) {
                resolve();
                return;
            }

            imgList.forEach(item => {
                if (item instanceof HTMLImageElement) {
                    readyImageList.push(item);
                    resolve()
                    return;
                } else if (typeof item === 'string') {
                    const img = new Image();
                    img.src = item;
                    img.onload = () => {
                        readyImageList.push(img);
                        resolve();
                    }

                    img.onerror = () => console.log(`${item}加载失败`)
                }
            });
        }).
        then(() => callback && callback(readyImageList), reason => console.error(reason));
    }


    /**
     * @todo 随机生成裁剪区域的坐标
     * @param {Number} cvsWidth 
     * @param {Number} cvsHeight 
     * @param {Number} clipAreaWidth 
     * @param {Number} clipAreaHeight 
     * @returns {{x,y}}
     */
    function randomGenrateClipArea(cvsWidth, cvsHeight, clipAreaWidth, clipAreaHeight) {
        const availableWidth = cvsWidth - clipAreaWidth,
            availableHeight = cvsHeight - clipAreaHeight;
        let x = Math.floor(Math.random() * availableWidth),
            y = Math.floor(Math.random() * availableHeight);

        return { x, y };
    }




    // ==========================================class部分================================================== //


    class VerificationSlider {
        /***
         * @params onload 在传入的imgList列表中第一张图片加载成功时调用
         * @params opts   配置项
         *  opts结构: 
         *      imgList {Array}             用来绘制的图片数组 可是是Image对象或者img标签 也可以是正确的文件路径
         *      canvas  {HTMLCanvasElement} 原生画布,绘制图片的画布 必填
         *      clipCvs {HTMLCanvasElement} 被裁剪用来移动的拼图所在的canvas 必填
         *      clipAreaWidth  {Number}     裁剪块的宽度  可选 默认 50 单位像素
         *      cilpAreaHeight {Number}     裁剪块的高度  可选 默认 50 单位像素
         *      radius         {Number}     拼图的附加圆的半径大小 可选 默认 10 单位像素
         *      borderWidth    {Number}     裁剪拼图的边框的宽度   可选  默认 3 单位像素
         *      borderColor    {String}     裁剪拼图的边框颜色     可选  默认 黄色
         */
        constructor(onload, opts = {}) {

            const {
                imgList,
                canvas,
                clipCvs,
                clipAreaWidth = 50,
                clipAreaHeight = 50,
                radius = 10,
                borderWidth = 3,
                borderColor = 'yellow'
            } = opts;

            this.$imgList = imgList;
            this.canvas = canvas;
            this.clipCvs = clipCvs;
            this.clipAreaWidth = clipAreaWidth;
            this.clipAreaHeight = clipAreaHeight;
            this.radius = radius;
            this.borderWidth = borderWidth;
            this.borderColor = borderColor;

            initImageList(imgList, (readyImageList) => {
                this.readyImageList = readyImageList;
                this.curImgInex = 0;

                //生成验证内容
                this.genrateVerificationArea();

                if (onload && typeof onload === 'function') {
                    onload.call(this, this);
                }
            });
        }

        //生成裁剪区域信息
        genrateClipPosition() {
            const randomPos = randomGenrateClipArea(this.canvas.width, this.canvas.height, this.clipAreaWidth, this.clipAreaHeight);

            return [randomPos.x, randomPos.y, this.clipAreaWidth, this.clipHieght, this.radius];
        }

        //生成验证区域内容
        genrateVerificationArea() {
            this.verifier = genrate(this.canvas, this.clipCvs, this.getCurImg(), this.genrateClipPosition(), this.borderWidth, this.borderColor);

            //为了调用方便 做下属性映射
            this.setClipCvsOffsetLeft = this.verifier.setClipCvsOffsetLeft;
            this.verification = this.verifier.verification;
        }


        //检测的封装层接口
        test() {
            return this.verification();
        }

        //获取当前图片
        getCurImg() {
            return this.readyImageList[this.curImgInex];
        }

        //切换到下一张图片
        next() {
            this.curImgInex++;
            if (this.curImgInex >= this.readyImageList.length) {
                this.curImgInex = 0;
            }
            this.genrateVerificationArea();
        }

        //切换上一张图片
        back() {
            this.curImgInex--;
            if (this.curImgInex < 0) {
                this.curImgInex = this.readyImageList.length - 1;
            }
            this.genrateVerificationArea();
        }
    }


    // ======================================导出接口======================================== //

    if (window) window.VerificationSlider = VerificationSlider;

    return VerificationSlider;

})();


//如果您用的是es6Module 请取消下面的代码注释就行
export default VerificationSlider;