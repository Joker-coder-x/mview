<template>
    <div class="m-collapse">
       <slot></slot>
    </div>
</template>

<script>

export default {
    name:'MCollapse',

    props:{
        value:{
            type:[Array,String]
        }
    },

    data(){
        return {
            currentValue:this.value
        }
    },

    watch:{
        value(newValue){
            this.currentValue=newValue;
        }
    },

    methods:{
        getPanels(){
            return this.$children.filter(c=>{
                return c.$options.name==='MCollapsePanel';
            });
        },

        getActiveKey(){
            let activeKey=this.currentValue||[];

            if(!Array.isArray(activeKey)){
                activeKey=[activeKey];
            }

            for(let i=0;i<activeKey.length;i++){
                activeKey[i]=activeKey[i].toString();
            }

            return activeKey;
        },

        setActive(){
            const activeKey=this.getActiveKey(),
                  panels=this.getPanels();

            panels.forEach((p,index)=>{
                if(p.getName()===''){
                     p.setIndex(index.toString());
                     p.setLastChildFlag(false);
                }

                if(activeKey.indexOf(p.getName())!==-1){
                    p.isOpen=true;
                }

                if(index===panels.length-1){
                    p.setLastChildFlag(true);
                }
            });
        },

        handlePanelClick(name,isOpen){
            name=name.toString();
            
            const activeKey=this.getActiveKey(),
                  index=activeKey.indexOf(name);
          
            let isModify=false;
            if(isOpen){
                if(index===-1){
                    activeKey.push(name);
                    isModify=true;
                }
            }else{
                if(index!==-1){
                    activeKey.splice(index,1);
                    isModify=true;
                }
            }

            if(isModify){
                this.currentValue=activeKey;
                this.$emit('input',JSON.parse(JSON.stringify(activeKey)))
                this.$emit('on-change',JSON.parse(JSON.stringify(activeKey))); 
            }
        }
    },


    mounted(){
        this.setActive();
    }
}
</script>

<style scoped>
.m-collapse{
    border-radius: 5px;
    overflow: hidden;
}
</style>