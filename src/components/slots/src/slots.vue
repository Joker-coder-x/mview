<template>
     <div class="container">
        <div class="header">
            <slot name="header"><h1>每周一无限会员日</h1></slot>
        </div>
        <div class="main">
            <slot></slot>
        </div>
        <div class="footer">
            <slot name="footer"><button class="start-btn" @click="handleRun">开始抽奖</button></slot>
        </div>
    </div>
</template>

<script>
import { genrateRunTimesSet } from './utils.js';

export default {
    name:'MSlots',

    props:{
        //滑动速度
        speed:{
            type:Number,
            default:2
        },
        //控制曲线速度
        easeout:{
            type:Boolean,
            default:true
        },
        //自定义开始按钮的选择器
        customStartTargetSelector:{
            type:String,
            default:''
        },
        //随机递增的范围
        incrementTimesRange:{
            type:Number,
            default:10
        }      
    },

    provide(){
        return {
            //因为跟vue的slots同名 为了不引起不必要的误会 所有取名slotsRef
            slotsRef:this
        }
    },

    data(){
        return {
            isComplete:false,
            completeList:[]
        }
    },

    methods:{
        getItems(){
          return  this.$children.filter(item=>item.$options.name=='MSlotsItem');
        },

        handleComplete(){
           this.$emit('complete',JSON.stringify(this.completeList));
        },

        handleRun(){
            const vm=this;
            if (vm.isComplete) return;

            vm.isComplete = true;
            vm.completeList=[];
            vm.$emit('start');

            const items = vm.getItems(),
                  times = genrateRunTimesSet(items.length,vm.incrementTimesRange);

            times.forEach((count, index) => {
                items[index].setTimes(count);
                items[index].setUseTimes(0);
            });

            items.forEach(item=>item.handleMove());
        }
    },

    mounted(){
        
        if(this.customStartTargetSelector){
            const startTarget=document.querySelector(this.customStartTargetSelector);
           
            if(startTarget&&startTarget instanceof HTMLElement){
                const handler=()=>this.handleRun();

                startTarget.addEventListener('click',handler);

                this.__startTarget__=startTarget;
                this.__startTargetHandler__=handler;
            }
        }
    },

    beforeDestroy(){
        if(this.__startTarget__){
            this.__startTarget__.removeEventListener('click',this.__startTargetHandler__);
            this.__startTarget__=null;
            this.__startTargetHandler__=null;

            Reflect.deleteProperty(this,'__startTarget__');
            Reflect.deleteProperty(this,'__startTargetHandler__');
        }
    }
}
</script>

<style scoped>
 .container {
    min-width: 20rem;
    min-height: 10rem;
    background-color: #2c3e50;
    color: white;
    border-radius: 2rem;
    box-shadow: 0 0 2rem rgb(122, 118, 118);
    padding: 2rem;
    display: grid;
    color: #DEBF8A;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: "header" "main" "footer";
}

.header {
    grid-area: header;
    display: grid;
    place-items: center;
}

.header>h1 {
    font-size: 4rem;
    letter-spacing: 3px;
}

.main {
    grid-area: main;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    background-color: #1B1B1B;
    padding: 1rem;
    border-radius: 1rem;
   
}

.footer {
    grid-area: footer;
    display: grid;
    place-items: center;
}

.footer>.start-btn {
    padding: 2rem 4rem;
    border-radius: 5rem;
    font-weight: bold;
    font-size: 2rem;
    background-color: rgb(216, 230, 166);
    color: rgb(90, 83, 20);
    letter-spacing: 3px;
    outline: none;
    border: none;
    cursor: pointer;
}

.footer>.start-btn:hover{
    background-color: rgb(238, 252, 190);
}

.footer>.start-btn:active{
    background-color:rgb(171, 187, 112) ;
}
</style>