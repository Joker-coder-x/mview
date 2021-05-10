<template>
  <div>
    <h1>Button</h1>
    <h3>基本用法</h3>
    <div class="demo-button">
      <m-button>default</m-button>
      <m-button type="primary">primary</m-button>
      <m-button type="success">success</m-button>
      <m-button type="info">info</m-button>
      <m-button type="warning">warning</m-button>
      <m-button type="danger">danger</m-button>
    </div>
    <h3>圆角按钮</h3>
    <div class="demo-button">
      <m-button :round="true">default</m-button>
      <m-button type="primary" :round="true">primary</m-button>
      <m-button type="success" :round="true">success</m-button>
      <m-button type="info" :round="true">info</m-button>
      <m-button type="warning" :round="true">warning</m-button>
      <m-button type="danger" :round="true">danger</m-button>
    </div>
    <h3>圆形按钮</h3>
    <div class="demo-button">
      <m-button :circle="true" icon="home"></m-button>
      <m-button type="primary" :circle="true" icon="home"></m-button>
      <m-button type="success" :circle="true" icon="home"></m-button>
      <m-button type="info" :circle="true" icon="home"></m-button>
      <m-button type="warning" :circle="true" icon="home"></m-button>
      <m-button type="danger" :circle="true" icon="home"></m-button>
    </div>
    <h3>禁用状态</h3>
    <m-button type="primary" disabled>禁用</m-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.demo-button {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
