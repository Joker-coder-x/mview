<template>
  <aside class="m-aside" :style="{ width: width }"><slot></slot></aside>
</template>

<script>
export default {
  name: "MAside",

  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
};
</script>
