<template>
    <div class="content-child"><slot></slot></div>
</template>

<script>
export default {
    name:'mSlotsItemContent',

    props:{
        name:{
            type:String|Number,
            required: true
        }
    }
}
</script>