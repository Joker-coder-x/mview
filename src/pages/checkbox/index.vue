<template>
  <div>
    <h1>Checkbox</h1>
    <h3>基础用法</h3>
    <m-checkbox v-model="checked">选项</m-checkbox>
    <h3>indeterminate 状态</h3>
    <m-checkbox indeterminate>选项</m-checkbox>
    <h3>自定义颜色</h3>
    <div class="demo-checkbox">
      <m-checkbox color="#e74c3c">red</m-checkbox>
      <m-checkbox color="#3498db">blue</m-checkbox>
      <m-checkbox color="#9b59b6">pink</m-checkbox>
      <m-checkbox color="#2ecc71">green</m-checkbox>
      <m-checkbox color="#e67e22">orange</m-checkbox>
    </div>
    <h3>镂空样式</h3>
    <m-checkbox v-model="checked2" line>选项</m-checkbox>
    <h3>圆形</h3>
    <m-checkbox v-model="checked3" circle>选项</m-checkbox>
    <h3>镂空圆形</h3>
    <m-checkbox v-model="checked4" line circle>选项</m-checkbox>
    <h3>禁用状态</h3>
    <m-checkbox disabled>选项</m-checkbox>
    <h3>自定义文字间距</h3>
    <m-checkbox :text-indent="20">选项</m-checkbox>
    <h3>通过font-size自定义checkbox大小</h3>
    <div class="demo-checkbox">
      <m-checkbox :font-size="10" :text-indent="3">选项</m-checkbox>
      <m-checkbox :font-size="14">选项</m-checkbox>
      <m-checkbox :font-size="18" :text-indent="7">选项</m-checkbox>
      <m-checkbox :font-size="25" :text-indent="10">选项</m-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false
    };
  }
};
</script>

<style scoped>
.demo-checkbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
}
</style>
