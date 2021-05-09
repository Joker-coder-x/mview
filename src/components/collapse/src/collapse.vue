<template>
  <div class="m-collapse">
    <slot></slot>
  </div>
</template>

<script>
import { jsonClone } from "@/utils/index.js";

export default {
  name: "MCollapse",

  props: {
    value: {
      type: [Array, String]
    },
    simple: {
      type: Boolean,
      default: false
    },
    //手风琴模式 每次至多打开一个面板
    accordion: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentValue: this.value
    };
  },

  watch: {
    value(newValue) {
      this.currentValue = newValue;
    }
  },

  mounted() {
    this.setActive();
  },

  methods: {
    getPanels() {
      return this.$children.filter(c => {
        return c.$options.name === "MCollapsePanel";
      });
    },

    getActiveKey() {
      let activeKey = this.currentValue || [];

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey];
      }

      for (let i = 0; i < activeKey.length; i++) {
        activeKey[i] = activeKey[i].toString();
      }

      return activeKey;
    },

    setActive() {
      const activeKey = this.getActiveKey(),
        panels = this.getPanels();

      panels.forEach((p, index) => {
        if (p.getName() === "") {
          p.setIndex(index.toString());
          p.setLastChildFlag(false);
        }

        if (activeKey.indexOf(p.getName()) !== -1) {
          p.isOpen = true;
        }

        if (index === panels.length - 1) {
          p.setLastChildFlag(true);
        }
      });
    },

    closePanel(exclude = []) {
      const panels = this.getPanels();
      panels.forEach(p => {
        if (exclude.indexOf(p.getName()) === -1) {
          p.handleClose();
        }
      });
    },

    handlePanelClick(name, isOpen) {
      name = name.toString();

      if (this.accordion) {
        if (isOpen) {
          this.closePanel([name]);
          this.currentValue = [];
        }
      }

      const activeKey = this.getActiveKey(),
        index = activeKey.indexOf(name);

      let isModify = false;
      if (isOpen) {
        if (index === -1) {
          activeKey.push(name);
          isModify = true;
        }
      } else {
        if (index !== -1) {
          activeKey.splice(index, 1);
          isModify = true;
        }
      }

      if (isModify) {
        this.currentValue = activeKey;
        this.$emit("input", jsonClone(activeKey));
        this.$emit("on-change", jsonClone(activeKey));
      }
    }
  }
};
</script>
