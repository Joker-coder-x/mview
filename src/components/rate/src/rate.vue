<template>
    <div class="m-rate">
        <m-icon v-for="(n,index) in count" 
                :key="n" 
                :class="[
                    'm-rate-item',
                    currentValue>=n||index<=maxHover?'is-hover':'',
                ]" 
                @click.native="handleItemClick(n)"
                name="star-full"
                v-hover="{
                    enter:handleEnterItem,
                    leave:handleLeaveItem,
                    index:index
                }"
                ></m-icon>
        <span v-if="showScore" class="is-hover">{{currentValue}}</span>
    </div>
</template>

<script>
//导入子组件
import MIcon from '../../icon/index.js';

//导入自定义指令
import {Hover} from '@/directives/index.js';


export default {
    name:'MRate',

    directives:{Hover},

    props:{
        value:{
            type:Number,
            default:5
        },

        count:{
            type:Number,
            default:5
        },
        //间距 默认10 单位像素
        spacing:{
            type:Number,
            default:10
        },
        disabled:{
            type:Boolean,
            default:false
        },
        //展现分数
        showScore:{
            type:Boolean,
            default:false
        }
    },

    data(){
        return {
            currentValue:this.value,
            maxHover:0,
            isLeave:false
        }
    },

    watch:{
        value(newValue){
            this.currentValue=newValue;
        }
    },

    methods:{
        handleEnterItem({value}){
            if(this.disabled) return;

            this.isLeave=false;
            this.maxHover=value.index;
        },

        handleLeaveItem(){
            if(this.disabled) return;

            this.isLeave=true;

            setTimeout(() => {
                if(this.isLeave){
                    this.maxHover=0;
                }
            }, 100);
        },

        handleItemClick(n){
            if(this.disabled) return;

            this.currentValue=n;
            this.$emit('input',n);
        }
    },

    components:{
        MIcon
    }
}
</script>

<style scoped>
.m-rate{
    display: inline-block;
    cursor: pointer;
    font-size: 20px;
}

.m-rate>.m-rate-item{
   
    margin-right: 10px;
    color: #E9E9E9;
}

.m-rate>.m-rate-item:last-child{
    margin-right: 0;
}

.m-rate>.is-hover{
    color: #F7B84F;
}

</style>