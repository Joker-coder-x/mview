<template>
    <header class="m-header"><slot></slot></header>
</template>

<script>
export default {
    name:'MHeader',

    props:{
        height:{
            type:String,
            default:'60px'
        }
    }
}
</script>