/**
 * @todo 获取页面视口大小
 * @returns { {width:Number,height:Number} }
 */
export function getViewportSize() {
    let pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;
    if (typeof pageWidth !== 'number') {
        if (document.compatMode == 'CSS1Compat') {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }

    return {
        width: pageWidth,
        height: pageHeight
    }
}

/**
 * @todo 获取页面视口宽度
 * @returns {Number }
 */
export function getViewportWidth() {
    return getViewportSize().width;
}

/**
 * @todo 获取页面视口高度
 * @returns { Number }
 */
export function getViewportHeight() {
    return getViewportSize().height;
}

/**
 * @todo 获取元素距离文档顶部的偏移（距离）
 * @param {HTMLElement} el 
 * @returns {Number}
 */
export function getToDocumentTopOffset(el) {
    let offset = el.offsetTop,
        current = el.offsetParent;

    while (current) {
        offset += current.offsetTop;
        current = current.offsetParent;
    }

    return offset;
}

/**
 * @todo 获取元素距离文档左侧的偏移（距离）
 * @param {HTMLElement} el 
 * @returns {Number}
 */
export function getElementToDocumentLeftOffset(el) {
    let offset = el.offsetLeft,
        current = el.offsetParent;

    while (current) {
        offset += current.offsetLeft;
        current = current.offsetParent;
    }

    return offset;
}

/**
 * @todo 获取元素距离文档底部的距离(偏移)
 * @param {HTMLElement} el 
 * @returns {Number}
 */
export function getElementToDocumentBottomOffset(el) {
    const documentHeight = document.documentElement.scrollHeight,
        topOffset = getToDocumentTopOffset(el);
    return documentHeight - (topOffset + el.offsetHeight);
}

/**
 * @todo 获取元素距离页面视口底部的距离（偏移）从元素底部到浏览器底部这段距离 （不包含元素本身的高度）
 * @param {HTMLElement} el 
 * @return {Number}
 */
export function getElementToViewportBottomOffset(el) {
    return getViewportHeight() - el.getBoundingClientRect().bottom;
}

/**
 * @todo 获取元素距离页面视口右边边框的距离（偏移）从元素右边边框到浏览器右边边框这段距离（不包含元素本身的宽度）
 * @param {HTMLElement} el 
 * @return {Number}
 */
export function getElementToViewportRightOffset(el) {
    return getViewportWidth() - el.getBoundingClientRect().right;
}

/**
 * @todo 获取元素距离页面视口底部的距离（偏移） （不包含元素本身的高度）
 * @param {HTMLElement} el 
 * @return {Number}
 */
export function getElementToViewportTopOffset(el) {
    return el.getBoundingClientRect().top;
}

/**
 * @todo 获取元素距离页面视口左边边框的距离（偏移）（不包含元素本身的宽度）
 * @param {HTMLElement} el 
 * @return {Number}
 */
export function getElementToViewportLeftOffset(el) {
    return el.getBoundingClientRect().left;
}

/**
 * 获取鼠标指针位于某个元素中的相对坐标
 * @param {HTMLElement} el 
 * @param {Object} clientPos  鼠标指针位于浏览器视口的坐标
 * @returns {{x,y}} 
 */
export function getMousePosInElPos(el, clientPos) {
    return {
        x: clientPos.x - el.getBoundingClientRect().left,
        y: clientPos.y - el.getBoundingClientRect().top
    }
}

/**
 * 获取鼠标指针位于某个元素中的相对宽高比例
 * @param {HTMLElement} el 
 * @param {Object} clientPos  鼠标指针位于浏览器视口的坐标
 * @returns {{widthRate,heightRate}} 
 */
export function getMousePosElRate(el, clientPos) {
    const pos = getMousePosInElPos(el, clientPos);
    return {
        widthRate: pos.x / el.offsetWidth,
        heightRate: pos.y / el.offsetHeight
    }
}

/**
 * 获取鼠标指针位于某个元素中的相对宽度比例
 * @param {HTMLElement} el 
 * @param {Object} clientPos  鼠标指针位于浏览器视口的坐标
 * @returns {{widthRate,heightRate}} 
 */
export function getMousePosElWidthRate(el, clientPos) {
    return getMousePosElRate(el, clientPos).widthRate;
}

/**
 * 获取鼠标指针位于某个元素中的相对高度比例
 * @param {HTMLElement} el 
 * @param {Object} clientPos  鼠标指针位于浏览器视口的坐标
 * @returns {{widthRate,heightRate}} 
 */
export function getMousePosElHeightRate(el, clientPos) {
    return getMousePosElRate(el, clientPos).heightRate;
}