/**
 * @todo 解决用户处理url的search参数繁琐的问题，提供面向对象处理search参数的解决方法，为了更好的平台兼容性，
 *       当平台支持URLSearchParams时用平台的，不支持时用自定义的MURLSearchParams。
 * @param {String}  qs search字符串参数
 * @returns {URLSearchParams|MURLSearchParams}
 * @method get(name)            get()方法返回第一个与搜索参数对应的值。
 * @method getAll(name)         getAll()方法，以数组的形式返回与指定搜索参数对应的所有值。
 * @method has(name)            has() 方法返回一个 Boolean 表示一个指定的键名对应的值是否存在。
 * @method set(name,value)      set()方法用于设置和搜索参数相关联的值。如果设置前已经存在匹配的值，
 *                              该方法会删除多余的，如果将要设置的值不存在，则创建它
 * @method append(name,value)   append() 是 MURLSearchParams 接口的一个方法。可以插入一个新搜索参数。
 * @method delete(name)         delete() 是 URLSearchParams 接口的一个方法。可以删除指定名称的所有搜索参数。
 * @method sort()               sort() 方法对包含在此对象中的所有键/值对进行排序，并返回undefined。排序顺序是根据键的
 *                              Unicode代码点。该方法使用稳定的排序算法 (即，将保留具有相等键的键/值对之间的相对顺序)。
 * @method forEach(callback)    URLSearchParams的实例对象上的方法forEach允许通过回调函数来遍历URLSearchParams实例对象上的键值对
 * @method entries()            方法返回一个iterator，允许遍历该对象中包含的所有键/值对。每一组键值对都是 USVString对象
 * @method keys()               keys()返回一个iterator，遍历器允许遍历对象中包含的所有键。这些键都是USVString对象。
 * @method values()             values()方法返回一个iterator，该遍历器允许遍历对象中包含的所有值。这些值都是USVString对象。
 * @method toString()           toString()方法 返回适用在URL中的查询字符串。
 * @author 稀饭
 * @version 1.0
 * @time 2021/3/31
 */
 const URLSearchParamsFactory=(()=>{
    //name映射
    const nameMap={};

    /**
     * 生成唯一标识
     * @returns {String}
     */
    function uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        
        var uuid = s.join("");
        return uuid;
    }


    function generateUniqueKey(key){
        const uniquekey=`${key}-${uuid()}`;
        nameMap[key]?nameMap[key].push(uniquekey):(nameMap[key]=[]).push(uniquekey);
        return uniquekey;
    }

    function getKeys(){
        return Object.keys(nameMap);
    }

    function getValues(){
        return Object.values(nameMap);
    }

    function getUniqueKeyList(key){
        return nameMap[key];
    }

    function getKeyByUniqueKey(uniqueKey){
        return uniqueKey.split('-')[0];
    }

    function hasUniqueKey(uniqueKey){
        const [key]=uniqueKey.split('-');
        return nameMap[key].indexOf(uniqueKey)!==-1;
    }

    function hasKey(key){
        return nameMap[key]!==undefined;
    }

    function deleteKey(key){
        Reflect.deleteProperty(nameMap,key);
    }

    function deleteUniqueKey(uniqueKey){
        const [key]=uniqueKey.split('-');
        const index=nameMap[key].indexOf(uniqueKey);
        if(index!==-1){
            nameMap[key].splice(index,1);
        }
    }

    class MURLSearchParams{
        constructor(qs){
             //参数集合
            this.params=new Map();
            try{
                if(qs&&typeof qs==='string'){
                    //解析search参数字符串
                    this.parseSearchParams(qs);
                }
            }catch{
                console.error(err);
            }
        }

        /**
         * @todo 解析传递进来的search字符串
         * @param {String} qs search字符串
         * @returns {undefined}
         */
        parseSearchParams(qs){
            qs=qs.trim();
            if(qs.length>0&&qs.charAt(0)==='?'){
                qs=qs.substr(1);
                if(qs.length==0){
                    return;
                }
            }

            const params=this.params;

            for (const item of qs.split('&').map(item=>item.split('='))) {
                const name=decodeURIComponent(item[0]),
                    value=decodeURIComponent(item[1]);
                params.set(generateUniqueKey(name),value);
            }
        }

        /**
         * @todo  get()方法返回第一个与搜索参数对应的值。
         * @param {String} name 将要返回的参数的键名
         * @returns {null|*} 如果没找到，返回 null,找到了则返回对应的value值
         */
        get(name){
        const firstKey=getUniqueKeyList(name)[0],
                value=this.params.get(firstKey);
        return value===undefined?null:value;
        }

        /**
         * @todo getAll()方法，以数组的形式返回与指定搜索参数对应的所有值。
         * @param {String} name 要返回的参数的名称
         * @returns {Array}
         */
        getAll(name){
            const _values=[];
            getUniqueKeyList(name).forEach(uniqueKey=>{
                const value=this.params.get(uniqueKey);
                if(value){
                    _values.push(value);
                }
            })
            return _values;
        }

        /**
         * @todo has() 方法返回一个 Boolean 表示一个指定的键名对应的值是否存在。
         * @param {String} name 要查找的参数的键名
         * @returns {Boolean}
         */
        has(name){
            return this.get(name)!==null;
        }

        /**
         * @todo append() 是 MURLSearchParams 接口的一个方法。可以插入一个新搜索参数。
         * @param {String} name 需要插入搜索参数的键名
         * @param {*} value  需要插入搜索参数的值
         */
        append(name,value){
            this.params.set(generateUniqueKey(name),value);
        }

        /**
         * @todo set()方法用于设置和搜索参数相关联的值。如果设置前已经存在匹配的值，
         *       该方法会删除多余的，如果将要设置的值不存在，则创建它
         * @param {String} name  将要设置的参数的健值名
         * @param {*} value 所要设置的参数值
         * @returns {undefined}
         */
        set(name,value){
            this.delete(name);
            this.append(name,value);
        }

        /**
         * @todo delete() 是 URLSearchParams 接口的一个方法。可以删除指定名称的所有搜索参数。
         * @param {String} name  需要删除的键值名称
         * @returns {undefined}
         */
        delete(name){
            const keys=getUniqueKeyList(name);
            keys.forEach(key=>this.params.delete(key));
            deleteKey(name);
        }

        /**
         * @todo sort() 方法对包含在此对象中的所有键/值对进行排序，并返回undefined。排序顺序是根据键的Unicode
         *  代码点。该方法使用稳定的排序算法 (即，将保留具有相等键的键/值对之间的相对顺序)。
         * @returns {undefined}
         */
        sort(){
            const keys=getKeys(),
                  map=new Map(),
                  params=this.params;
            keys.forEach(name=>{
                getUniqueKeyList(name).forEach(uniqueKey=>{
                    map.set(uniqueKey,params.get(uniqueKey));
                });
            });
            this.params=map;
        }

        /**
         * @todo toString()方法 返回适用在URL中的查询字符串。
         * @returns {String}
         */
        toString(){
            const params=this.params;
            let strList=[];

            for (const [name,value] of params.entries()) {
                strList.push(`${encodeURIComponent(getKeyByUniqueKey(name))}=${encodeURIComponent(value)}`);
            }

            return strList.join('&');
        }

        /**
         * @syntax searchParams.forEach(callback(value,key,searchParams))
         * @param {Function} callback 该回调函数可以接收到3个参数value,key,searchParams，
         * 我们可以在回调函数中对接收到的参数进行处理。而三个参数的含义如下：
                1.  value
                当前遍历到的键值
                2.  key
                当前遍历到的键名
                3.  searchParams
                当前调用forEach方法的实例对象
        * @returns {undefined}
        */
        forEach(callback){
            for(const [name,value] of this.entries()){
                callback&&callback(value,name,this);
            }
        }

        /**
         * @todo entries()方法返回一个iterator，允许遍历该对象中包含的所有键/值对。
         *       每一组键值对都是 USVString对象
         * @returns {Iterator}
         */
        *entries(){
            const params=this.params;
            for (const [name,value] of params.entries()) {
                yield [getKeyByUniqueKey(name),value];
            }
        }

        /**
         * @todo keys()返回一个iterator，遍历器允许遍历对象中包含的所有键。这些键都是USVString对象。
         * @returns {Iterator}
         */
        *keys(){
            const params=this.params;
            for (const [name] of params.entries()) {
                yield getKeyByUniqueKey(name);
            }
        }

        /**
         * @todo values()方法返回一个iterator，该遍历器允许遍历对象中包含的所有值。这些值都是USVString对象。
         * @returns {Iterator}
         */
        *values(){
            const params=this.params;
            for (const [,value] of params.entries()) {
                yield value;
            }
        }
    }

    /**
     * @todo URLSearchParams工厂 当平台支持URLSearchParams时用平台的，不支持时用自定义的MURLSearchParams
     * @param {String} qs 
     * @returns {URLSearchParams|MURLSearchParams}
     */
    function URLSearchParamsFactory(qs){
        return URLSearchParams?new URLSearchParams(qs):new MURLSearchParams(qs);
    }

    //导出接口 web平台
    if(window){
        window.URLSearchParamsFactory=URLSearchParamsFactory;
        window.MURLSearchParams=MURLSearchParams;
    }
    
    //导出接口 MODULE
    return URLSearchParamsFactory;
})();

export default URLSearchParamsFactory;