<template>
  <footer class="m-footer" :style="{ height: height }"><slot></slot></footer>
</template>

<script>
export default {
  name: "MFooter",

  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
};
</script>
