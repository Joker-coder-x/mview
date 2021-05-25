<template>
  <div class="demo-warpper">
    <h3><slot name="title"></slot></h3>
    <p><slot name="sub"></slot></p>
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "DemoCard"
};
</script>
