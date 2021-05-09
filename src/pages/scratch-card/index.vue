<template>
  <div>
    <h2>刮刮乐</h2>
    <div class="demo-strach-card">
      <m-scratch-card></m-scratch-card>
      <m-scratch-card maskColor="green"
        ><h1>就你个臭咸鱼还想中奖？做梦吧!</h1></m-scratch-card
      >
      <m-scratch-card maskColor="#aaa"><h1>谢谢惠顾</h1></m-scratch-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.demo-strach-card {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
