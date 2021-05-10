<template>
  <div>
    <h1>ScratchCard 刮刮乐</h1>

    <h3 class="title-text">基础用法</h3>
    <div><m-scratch-card>谢谢惠顾</m-scratch-card></div>

    <h3 class="title-text">自定义颜色</h3>
    <p class="sub-text">通过mask-color属性配置</p>
    <div style="margin-bottom:30px;">
      <m-scratch-card mask-color="green"><h1>谢谢惠顾1</h1></m-scratch-card>
    </div>
    <div>
      <m-scratch-card mask-color="blue"><h1>谢谢惠顾2</h1></m-scratch-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
