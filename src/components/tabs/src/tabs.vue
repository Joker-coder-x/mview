<template>
    <div class="m-tabs">
        <dir class="m-tabs-bar">
            <div>
                <div v-for="item in navList"
                    :key="item.name"
                    :class="getTabCls(item)"
                    @click="handleTabBarItemClick(item.name)">
                    {{item.label}} 
                    <i class="mIcon-cross m-tabs-bar-remove" 
                        v-show="editable&&item.name==currentIndex"
                        @click.stop="handleRemoveItemClick(item)"></i>
                </div>
            </div>
             <i  class="mIcon-plus1 m-tabs-bar-add" 
                :circle="true"
                v-if="editable"
                @click="handleAddItemClick"></i>
        </dir>
        <div class="m-tabs-content">
                <slot></slot> 
        </div>
    </div>
</template>

<script>


import mButton from "../../button/index.js";
export default {
  
    name:'mTabs',

    model:{
        prop:'value',
        event:'change'
    },

    props:{
        value:{
            type:String|Number,
            default:''
        },
        editable:{
            type:Boolean,
            default:false
        }
    },

    data(){
        return {
            navList:[],
            currentIndex:this.value
        }
    },

    components:{mButton},


    methods:{
        //遍历子组件 获得所有m-tab-pane组件
        getTabs(){
            return this.$children.filter((item)=>item.$options.name==='mTabPane');
        },

        //动态获取tabBarItem的class
        getTabCls(item){
            return [
                'm-tabs-bar-item',
                {
                    active:item.name==this.currentIndex
                }
            ]
        },

        //更新NavBar
        updateNav(){
            this.navList=[];
           
            this.getTabs().forEach((pane,index)=>{
                this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });

                if(!pane.name) pane.name=index;
                if(index===0){
                    if(!this.currentIndex){
                        this.currentIndex=pane.name||index;
                    }
                }
            });

            this.updatePaneStatus(this.currentIndex);
        },

        //移除tarBarItem
        removeTabBarItem(name){
            const navList=this.navList;
            let   nextItem=null;

            for(let i=0,l=navList.length;i<l;i++){
                if(navList[i].name==name){
                    if(i>=1){
                        nextItem=navList[i-1];
                    }else if(i==0&&navList.length>1){
                        nextItem=navList[i+1];
                    }

                    this.navList.splice(i,1);
                    break;
                }
            }

            this.handleTabBarItemClick(nextItem?nextItem.name:undefined);
        },

        //更新插槽pane的显示状态
        updatePaneStatus(currentIndex){
            this.getTabs().forEach(pane=>pane.isShow=pane.name===currentIndex?true:false)
        },

        //监听tabBarItem的点击
        handleTabBarItemClick(name){
            this.currentIndex=name;
            this.$emit('change',this.currentIndex);
            this.$emit('on-click',this.currentIndex);
        },

        //监听增加按钮点击
        handleAddItemClick(){
            this.$emit('edit','add');
        },

         //增加移除按钮点击
        handleRemoveItemClick(item){
            this.$emit('edit','remove',item.name);
        },
    },

    watch:{
        value(newValue){
            this.currentIndex=newValue;
        },
        currentIndex(newVal){
            this.updatePaneStatus(newVal);
        }
    }
}
</script>


<style scoped>
.m-tabs{
    overflow: hidden;
}

.m-tabs-bar{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid #eee;
}

.m-tabs-bar-item{
    display: inline-block;
    height: 100%;
    padding: 5px 20px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #ddd;
    margin-right:1rem ;
    position: relative;
    top:1px;
    font-weight: bold;
    color: var(--text);
    background-color: var(--white);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
}

.m-tabs-bar-item:last-child{
    margin-right: 0;
}

.m-tabs-bar-item.active{
    color: var(--blue);
    border-bottom: 1px solid var(--white);
    border-top: 2px solid var(--blue);
}


 .m-tabs-bar-remove{
    margin-left: .5rem;
}

.m-tabs-bar-remove:hover{
   background: #ddd;
   color: white;
   padding: 2px;
   border-radius: 50%;
   cursor: pointer;
}

.m-tabs-bar-add{
   font-weight: bold;
   padding: 5px;
   border: 1px solid #ddd;
   border-radius: 4px;
   color: #bbb;
}

.m-tabs-bar-add:hover{
    color: var(--blue);
    border: 1px solid var(--primary);
    cursor: pointer;
}
</style>