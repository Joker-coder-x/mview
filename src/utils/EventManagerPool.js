const eventMangerPool=((document,window)=>{
let instance=null;
/**
 * 事件管理池
 * Todo:1.帮助兼容各大浏览器的事件绑定和移除
 *      2.提供统一的事件管理队列
 *      3.方便用户在将dom元素移出文档之前提供一键移除该元素身上所有绑定的事件处理程序方法
 *        防止事件处理程序的引用残留在内存中不能进行垃圾回收导致的内存泄露问题
 * 
 * 为了防止程序中出现过多的事件管理者(manager),后面代码会将事件管理池设计成一个单例模式
 */
class EventManagerPool {
    // [privite] 事件池指针
    #events = new Map();
    // [public]  标记元素的事件处理程序是在冒泡阶段执行还是捕获阶段执行
    mode;

    constructor(mode=false) {
        this.mode = mode;
    }

    /**
     * 
     * Todo: 向element绑定事件处理程序=>兼容各大版本浏览器
     * @private
     * @param {Element} element 
     * @param {String} type 
     * @param {Function} handler 
     * @returns {Void}
     */
    #addHandler(element, type, handler) {
        const {mode} = this;
        type=type.toLowerCase();

        if (element.addEventListener) {
            element.addEventListener(type, handler, mode);
        } else if (element.attachEvent) {
            element.attachEvent(type, handler);
        } else {
            element[`on${type}`] = handler;
        }
    }

    /**
     * Todo:向element移除事件处理程序=>兼容各大版本浏览器
     * @private
     * @param {Element} element 
     * @param {String} type 
     * @param {Function} handler 
     * @returns {Void}
     */

    #removeHandler(element, type, handler) {
        const {mode} = this;
        type=type.toLowerCase();

        if (element.removeEventListener) {
            element.removeEventListener(type, handler, mode);
        } else if (element.detachEvent) {
            element.detachEvent(type, handler);
        } else {
            element[`on${type}`] = null;
        }
    }

    /**
     * @todo 获取事件管理池指针
     * @public
     * @returns {Map}
     */
    getEventPool(){
        return this.#events;
    }

    /**
     * @todo 获取元素以绑定的事件对列
     * @public
     * @param {Element} element 
     * @returns {Object|undefined}
     */
    getElementEventQueue(element) {
        return this.#events.get(element);
    }

    /**
     * @todo 事件管理池是否有对element进行了事件管理
     * @public
     * @param {Element} element 
     * @returns {true|false}
     */
    has(element){
        return this.#events.has(element);
    }

    /**
     * Todo:向用户提供事件绑定接口
     * @public
     * @param {Element} element 
     * @param {String} type 
     * @param {Function} handler 
     * @returns {Void}
     */
    add(element, type, handler) {
        if (typeof element === 'object' && element !== null) {
            const events=this.#events;
            let _event;

            if (events.has(element)) {
                _event = events.get(element);
            } else {
                _event = {};
                events.set(element, _event);
            }

            _event[type] ? _event[type].push(handler) : (_event[type] = []).push(handler);

            this.#addHandler(element, type, handler);
        }
    }

    /**
     * Todo:向用户提供事件移除接口
     * @public
     * @param {Element} element 
     * @param {String} type 
     * @param {Function} handler 
     * @returns {Void}
     */
    remove(element, type, handler) {
        const events=this.#events;
        let _event;
        switch (arguments.length) {
            case 0: //清除事件池中的所有元素的所有事件队列
                this.clear();
                break;
            case 1: //清除事件池中element元素的所有事件队列
                _event = events.get(element);
                if (_event) {
                    for (const key in _event) {
                        if (Object.hasOwnProperty.call(_event, key)) {
                            this.remove(element, key);
                        }
                    }
                    //删除事件池中key为element的键值对
                    events.delete(element);
                }
                break;
            case 2: //清除事件池中element元素中类型为type的事件对列
                _event = events.get(element);
                if (_event && _event[type]) {
                    let fn;
                    while (_event[type].length) {
                        fn = _event[type][0];
                        this.remove(element, type, fn);
                    }
                }
                break;
            case 3:
                //清除事件池中element元素中类型为type的事件对列中值为handler的事件处理程序
                this.#removeHandler(element, type, handler);
                //删除_event[type]中的事件
                _event = events.get(element);
                if (_event && _event[type]) {
                    for (let i = 0, l = _event[type].length; i < l; i++) {
                        if (_event[type][i] === handler) {
                            _event[type].splice(i, 1);
                            break;
                        }
                    }
                }
                break;
        }
    }


    /**
     * @todo 清空事件管理池
     * @public
     * @returns {Void}
     */
    clear() {
        const events=this.#events;
        for (const [element] of events.entries()) {
            this.remove(element);
        }

        events.clear();
    }
}




/**
 * Todo:为了防止程序中出现过多的事件管理者 这里将事件管理池设计成一个单例模式
 * @param mode 规定元素的事件处理程序是在捕获阶段执行还是冒泡阶段执行 此参数只有在第一次实例化对象的时候才有用
 * @returns {EventManagerPool}
 */
function getEventManagerPoolInstance(mode=false){
    if(instance===null){
        instance=new EventManagerPool(mode);
    }

    return instance;
}

//导出接口
if(window) {
 window.getEventManagerPoolInstance=getEventManagerPoolInstance;
}


return getEventManagerPoolInstance();

})(document,window);


export default eventMangerPool;

