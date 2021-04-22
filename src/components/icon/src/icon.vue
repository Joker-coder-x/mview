<template>
    <i :class="'mIcon-'+name"></i>
</template>


<script>
export default {
    name:'mIcon',

    props:{
        name:String
    }
}
</script>