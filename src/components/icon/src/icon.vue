<template>
  <i :class="name | prefixIcon"></i>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";

export default {
  name: "MIcon",

  mixins: [StyleMixin],

  props: {
    name: String
  }
};
</script>
