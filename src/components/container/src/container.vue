<template>
   <div class="m-container"  :class="{ 'is-vertical': isVertical }">
       <slot></slot>
   </div>  
</template>

<script>
export default {
    name:'MContainer',

    props: {
      direction: String
    },

    computed:{
        isVertical(){
            if (this.direction === 'vertical') {
                return true;
            } else if (this.direction === 'horizontal') {
                return false;
            }
            return this.$slots&&this.$slots.default
                    ?
                    this.$slots.default.some(vnode=>{
                         const tag = vnode.componentOptions && vnode.componentOptions.tag;
                         return tag === 'm-header' || tag === 'm-footer';
                    })
                    :
                    false;
        }
    },
}
</script>

<style>
.m-container{
 display: flex;
}

.is-vertical{
  flex-direction: column;
}

.m-container>.m-aside{
    flex:2;
}

.m-container>.m-aside+.m-main,.m-container>.m-aside+.m-container,.m-container>.m-main,.m-container>.m-container{
    flex:8;
}
</style>