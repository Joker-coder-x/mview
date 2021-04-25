<template>
    <div>
        <h2>书签</h2>
        <div class="demo-bookmark">
            <m-bookmark position="top">这里是书签</m-bookmark>
            <m-bookmark position="bottom" type="danger">这里是书签</m-bookmark>
            <m-bookmark position="left" type="success">这里是书签</m-bookmark>
            <m-bookmark position="right" type="warning">这里是书签</m-bookmark>
        </div>
        <h2>镂空书签</h2>
        <div class="demo-bookmark">
            <m-bookmark position="top" hollow-out>这里是书签</m-bookmark>
            <m-bookmark position="bottom" type="danger" hollow-out>这里是书签</m-bookmark>
            <m-bookmark position="left" type="success" hollow-out>这里是书签</m-bookmark>
            <m-bookmark position="right" type="warning" hollow-out>这里是书签</m-bookmark>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.demo-bookmark{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>