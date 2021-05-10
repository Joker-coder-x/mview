<template>
  <div>
    <h1 style="font-size:3rem">Popper弹出框</h1>
    <p style="margin-bottom:40px;">内部使用popper.js定位引擎</p>
    <h1>基础用法</h1>
    <m-row :gutter="20">
      <m-col :span="6">
        <m-popper>
          <template v-slot:default>
            <div>trigger=Hover</div>
          </template>
          <!-- 2.6xx版本 通过v-slot指令使用具名插槽，如果是组件的话获取不到组件的componentInstancce -->
          <template v-slot:reference>
            <m-button type="primary">hover激活</m-button>
          </template>
          <!-- 通过slot属性名使用具名插槽，如果是组件的话可以获取组件的componentInstancce -->
        </m-popper>
      </m-col>
      <m-col :span="6">
        <m-popper trigger="click" placement="bottom">
          <template v-slot:default>
            <div>trigger=Click</div>
          </template>
          <template v-slot:reference>
            <m-button type="primary">click激活</m-button>
          </template>
        </m-popper>
      </m-col>

      <m-col :span="6">
        <m-popper trigger="focus" placement="bottom" :tabindex="0">
          <template v-slot:default>
            <div>trigger=Focus</div>
          </template>
          <template v-slot:reference>
            <m-button type="primary">focus激活</m-button>
          </template>
        </m-popper>
      </m-col>

      <m-col :span="6">
        <m-popper trigger="manual" placement="bottom" v-model="value">
          <template v-slot:default>
            <div>trigger=Manual</div>
          </template>
          <template v-slot:reference>
            <m-button type="primary" @click="handleClick">手动激活</m-button>
          </template>
        </m-popper>
      </m-col>
    </m-row>

    <h1>位置</h1>
    <div style="width: 45vw;">
      <m-row :gutter="20" style="margin-bottom: 30px;">
        <m-col :span="4" :offset="4">
          <m-popper placement="top-start" popper-class="custom">
            <template v-slot:default>
              <div>Top Left 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>上左</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4">
          <m-popper placement="top" popper-class="custom">
            <template v-slot:default>
              <div>Top 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>上边</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4">
          <m-popper placement="top-end" popper-class="custom">
            <template v-slot:default>
              <div>Top Right 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>上右</m-button>
            </template>
          </m-popper>
        </m-col>
      </m-row>

      <m-row style="margin-bottom: 30px;">
        <m-col :span="4">
          <m-popper placement="left-start" popper-class="custom">
            <template v-slot:default>
              <div>Left Top 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>左上</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4" :offset="12">
          <m-popper placement="right-start" popper-class="custom">
            <template v-slot:default>
              <div>Right Top 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>右上</m-button>
            </template>
          </m-popper>
        </m-col>
      </m-row>

      <m-row style="margin-bottom: 30px;">
        <m-col :span="4">
          <m-popper placement="left" popper-class="custom">
            <template v-slot:default>
              <div>Left 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>左边</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4" :offset="12">
          <m-popper placement="right" popper-class="custom">
            <template v-slot:default>
              <div>Right 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>右边</m-button>
            </template>
          </m-popper>
        </m-col>
      </m-row>

      <m-row style="margin-bottom: 30px;">
        <m-col :span="4">
          <m-popper placement="left-end" popper-class="custom">
            <template v-slot:default>
              <div>Left Bottom 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>左下</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4" :offset="12">
          <m-popper placement="right-end" popper-class="custom">
            <template v-slot:default>
              <div>Right Bottom 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>右下</m-button>
            </template>
          </m-popper>
        </m-col>
      </m-row>

      <m-row :gutter="20">
        <m-col :span="4" :offset="4">
          <m-popper placement="bottom-start" popper-class="custom">
            <template v-slot:default>
              <div>Bottom Left 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>下左</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4">
          <m-popper placement="bottom" popper-class="custom">
            <template v-slot:default>
              <div>Bottom 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>下边</m-button>
            </template>
          </m-popper>
        </m-col>
        <m-col :span="4">
          <m-popper placement="bottom-end" popper-class="custom">
            <template v-slot:default>
              <div>Bottom Right 提示文字</div>
            </template>
            <template v-slot:reference>
              <m-button>下右</m-button>
            </template>
          </m-popper>
        </m-col>
      </m-row>
    </div>

    <h1>Attributes</h1>
    <m-row class="demo-th">
      <m-col :span="2">参数</m-col>
      <m-col :span="6">说明</m-col>
      <m-col :span="2">类型</m-col>
      <m-col :span="8">可选值</m-col>
      <m-col :span="6">默认值</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">trigger</m-col>
      <m-col :span="6">触发方式</m-col>
      <m-col :span="2">String</m-col>
      <m-col :span="8">hover | click | focus | manual</m-col>
      <m-col :span="6">hover</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">placement</m-col>
      <m-col :span="6">出现位置</m-col>
      <m-col :span="2">String</m-col>
      <m-col :span="8"
        >top | top-start | top-end,right | right-start | right-end,bottom |
        bottom-start | bottom-end,left | left-start | left-end,aoto |auto-start|
        aoto-end</m-col
      >
      <m-col :span="6">bottom</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">disabled</m-col>
      <m-col :span="6">popper是否可用</m-col>
      <m-col :span="2">Boolean</m-col>
      <m-col :span="8">true | false</m-col>
      <m-col :span="6">false</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">visible-arrow</m-col>
      <m-col :span="6">是否显示箭头</m-col>
      <m-col :span="2">Boolean</m-col>
      <m-col :span="8">true | false</m-col>
      <m-col :span="6">true</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">value / v-model</m-col>
      <m-col :span="6">状态是否可见</m-col>
      <m-col :span="2">Boolean</m-col>
      <m-col :span="8">true | false</m-col>
      <m-col :span="6">false</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">popper-class</m-col>
      <m-col :span="6">为 popper 添加类名</m-col>
      <m-col :span="2">String</m-col>
      <m-col :span="8">——</m-col>
      <m-col :span="6">——</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">open-delay</m-col>
      <m-col :span="6">显示延迟，单位为毫秒</m-col>
      <m-col :span="2">Number</m-col>
      <m-col :span="8">——</m-col>
      <m-col :span="6">0</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">close-delay</m-col>
      <m-col :span="6">隐藏延迟，单位为毫秒</m-col>
      <m-col :span="2">Number</m-col>
      <m-col :span="8">——</m-col>
      <m-col :span="6">200</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">x-offset</m-col>
      <m-col :span="6">tooltip距离原位置x轴方向的偏移量，单位为像素</m-col>
      <m-col :span="2">Number</m-col>
      <m-col :span="8">——</m-col>
      <m-col :span="6">0</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="2">y-offset</m-col>
      <m-col :span="6">tooltip距离原位置y轴方向的偏移量，单位为像素</m-col>
      <m-col :span="2">Number</m-col>
      <m-col :span="8">——</m-col>
      <m-col :span="6">10</m-col>
    </m-row>

    <h1 style="margin-top:40px;">Slots</h1>
    <m-row class="demo-th">
      <m-col :span="12">参数</m-col>
      <m-col :span="12">说明</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="12">default</m-col>
      <m-col :span="12">Popover 内嵌 HTML 文本</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="12">reference</m-col>
      <m-col :span="12">触发 Popover 显示的 HTML 元素</m-col>
    </m-row>

    <h1 style="margin-top:40px;">Events</h1>
    <m-row class="demo-th">
      <m-col :span="8">事件名称</m-col>
      <m-col :span="8">说明</m-col>
      <m-col :span="8">回调参数</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="8">show</m-col>
      <m-col :span="8">说明</m-col>
      <m-col :span="8">——</m-col>
    </m-row>
    <m-row class="demo-tr">
      <m-col :span="8">hide</m-col>
      <m-col :span="8">隐藏时触发</m-col>
      <m-col :span="8">——</m-col>
    </m-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false
    };
  },

  methods: {
    handleClick() {
      this.value = !this.value;
    }
  }
};
</script>

<style>
.custom {
  background-color: #303133;
  font-weight: bold;
  color: white;
}

.demo-th,
.demo-tr {
  font-size: 1.5rem;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  white-space: pre-line;
  align-items: center;
}

.demo-th {
  color: var(--text);
}
</style>
