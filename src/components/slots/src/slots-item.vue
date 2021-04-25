<template>
     <div class="m-slots-item" ref="item">
        <div class="m-slots-item__content"
             ref="contentWarp"
             :style="{height:height}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {
    aiMove,
    easeout
} from './utils.js';

export default {
    name:'MSlotsItem',

    inject:['slotsRef'],

    data(){
        return {
            height:'400%',
            children:this.$children,
            useTimes:0,
            times:0
        }
    },

    watch:{
        children(newValue){
            this.height = `${newValue.length*100}%`;
        }
    },
    
    methods:{   
         //获取所有content-child
         getContentChild(){
             return this.$children.filter(c=>c.$options.name==='MSlotsItemContent');
         },
         
         //设置移动次数
         setTimes(times){
             this.times=times;
         },
         
         //设置已移动次数
         setUseTimes(useTimes){
             this.useTimes=useTimes;
         },
        
        //根据el 找到对应的vue组件获取name prop
         findName(el){
            const children=this.getContentChild();

            let c;
            for(let i=0,l=children.length;i<l;i++){
                c=this.children[i];
                if(c.$el===el){
                    return c.name;
                }
            }
         },
         
         //处理移动
         handleMove(){
            const vm=this;
            const handler = () => {
                const content = this.$refs['contentWarp'],
                      item    = this.$refs['item'];

                aiMove(content, item.offsetHeight, () => {
                    content.insertBefore(content.children[content.children.length - 1], content.children[0]);
                    content.style.bottom = '0px';

                    vm.slotsRef.isComplete = false;
                    vm.useTimes++;

                    if (vm.useTimes < vm.times) {
                        requestAnimationFrame(handler);
                    } else {
                        const completeList = vm.slotsRef.completeList;
                        //换位
                        completeList.push(this.findName(content.children[content.children.length - 1]));

                        if (completeList.length ===  vm.slotsRef.getItems().length) {
                            vm.slotsRef.handleComplete();
                        }
                    }
                }, 'bottom',vm.slotsRef.easeout?easeout(vm.useTimes, vm.slotsRef.speed, vm.times):vm.slotsRef.speed)();//aiMove end
            }// handler end

            requestAnimationFrame(handler);
        }
    }
}
</script>

<style scoped>
.m-slots-item {
    background-color: #34495e;
    height: 100%;
    flex: 1;
    margin-right: 2rem;
    position: relative;
    overflow: hidden;
    padding: 0;
    border-radius: 5px;
}

.m-slots-item:last-child {
    margin-right: 0;
}

.m-slots-item__content {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 400%;
    width: 100%;
    padding: 0;
    margin: 0;
}

.m-slots-item__content .content-child {
    flex: 1;
    cursor: pointer;
}
</style>