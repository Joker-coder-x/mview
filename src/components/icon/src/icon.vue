<template>
  <i :class="name | prefixIcon" @click="$emit('click', $event)"></i>
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
