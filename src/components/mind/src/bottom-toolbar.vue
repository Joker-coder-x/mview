<template>
  <div class="m-mind-bottom__toolbar unselect">
    <div class="left">
      <span>主题：<span>1</span></span>
    </div>
    <div class="right">
      <div>
        <span
          class="mIcon-plus"
          :data-disabled="
            zoomRate >= $parent.DEFAULT_CONFIG.MAX_ZOOM_RATE ? 'true' : 'false'
          "
          @click="handleScalePlus"
        ></span>
        <span>{{ zoomRate }}%</span>
        <span
          class="mIcon-minus"
          :data-disabled="
            zoomRate <= $parent.DEFAULT_CONFIG.MIN_ZOOM_RATE ? 'true' : 'false'
          "
          @click="handleScaleReduce"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MMindBottomToolBar",

  props: {
    zoomRate: Number
  },

  methods: {
    handleScalePlus() {
      this.$parent.scalePlus();
    },

    handleScaleReduce() {
      this.$parent.scaleReduce();
    }
  }
};
</script>

<style lang="less">
.m-mind-bottom__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 30px;
  width: 100%;
  margin: 0;
  padding: 0 20px;
  color: #505353;
  border: 1px solid #ccc;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 12px;

  .right {
    div {
      span {
        padding-right: 10px;

        &:hover[data-disabled*="false"] {
          color: #3498db;
        }

        &:first-of-type,
        &:last-of-type {
          cursor: pointer;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }

      span[data-disabled*="true"] {
        opacity: 0.2;
      }
    }
  }
}
</style>
