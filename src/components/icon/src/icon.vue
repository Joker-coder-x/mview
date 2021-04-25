<template>
    <i :class="'mIcon-'+name"></i>
</template>


<script>
export default {
    name:'MIcon',

    props:{
        name:String
    }
}
</script>