<template>
  <div>
    <h1>Circle仪表盘</h1>
    <p>显示某项任务进度的百分比和状态。</p>
    <demo-card>
      <template v-slot:title>基础用法</template>
      <template v-slot:sub
        >通过给m-circle组件配置percent属于设置进度,通过stroke-color属性配置边框颜色。</template
      >
      <template>
        <m-row type="flex" justify="space-around" align="center">
          <m-col>
            <m-circle :percent="percent">
              <span style="font-size:1.5em;">{{ percent + "%" }}</span>
            </m-circle>
          </m-col>
          <m-col>
            <m-circle :percent="percent2" stroke-color="#67c23a">
              <span style="font-size:1.5em;">{{ percent2 + "%" }}</span>
            </m-circle>
          </m-col>
          <m-col>
            <m-circle :percent="percent3" stroke-color="#909399">
              <span style="font-size:1.5em;">{{ percent3 + "%" }}</span>
            </m-circle>
          </m-col>
          <m-col>
            <m-circle :percent="percent4" stroke-color="#e6a23c">
              <span style="font-size:1.5em;">{{ percent4 + "%" }}</span>
            </m-circle>
          </m-col>
          <m-col>
            <m-circle :percent="percent5" stroke-color="#f56c6c">
              <span style="font-size:1.5em;">{{ percent5 + "%" }}</span>
            </m-circle>
          </m-col>
        </m-row>
      </template>
    </demo-card>

    <demo-card style="margin-top:60px;">
      <template v-slot:title>配合外部组件使用</template>
      <template v-slot:sub>通过数据的联动和逻辑控制，实现交互效果。</template>
      <template>
        <m-circle :percent="percent6">
          <span style="font-size:1.5em;">{{ percent6 + "%" }}</span>
        </m-circle>
        <div style="margin-top:10px;">
          <m-button @click="handleIncrement">+</m-button>
          <m-button @click="handleReduce">-</m-button>
        </div>
      </template>
    </demo-card>

    <demo-card style="margin-top:60px;">
      <template v-slot:title>自定义更多样式</template>
      <template v-slot:sub
        >通过自定义slot和丰富的配置，可以组合出很多统计效果。</template
      >
      <template>
        <m-circle :percent="percent4" size="250">
          <div class="data-show">
            <span class="title-text">15,86,756</span>
            <span class="sub-text">商品订单数</span>
            <span class="content-text"
              >占总订单 <span class="bold-text">{{ percent4 + "%" }}</span>
            </span>
          </div>
        </m-circle>
      </template>
    </demo-card>

    <demo-card style="margin-top:60px;">
      <template v-slot:title>仪表盘模式</template>
      <template v-slot:sub
        >通过设置属性 dashboard，可以很方便地实现仪表盘样式的进度环。</template
      >
      <template>
        <m-circle :percent="percent6" dashboard>
          <span style="font-size:1.5em;">{{ percent6 + "%" }}</span>
        </m-circle>
        <div style="margin-top:10px;">
          <m-button @click="handleIncrement">+</m-button>
          <m-button @click="handleReduce">-</m-button>
        </div>
      </template>
    </demo-card>

    <h1 style="margin-top:60px;">API</h1>
    <h3>Circle props</h3>
    <m-table :data="CirclePropsData" border stripe text-align="left">
      <m-table-column prop="prop" label="属性"></m-table-column>
      <m-table-column prop="explain" label="说明" width="340"></m-table-column>
      <m-table-column prop="type" label="类型"></m-table-column>
      <m-table-column prop="optionalValue" label="可选值"></m-table-column>
      <m-table-column prop="defaultValue" label="默认值"></m-table-column>
    </m-table>
  </div>
</template>

<script>
import { CirclePropsData } from "./data.js";

export default {
  data() {
    return {
      CirclePropsData,
      percent: 20,
      percent2: 40,
      percent3: 60,
      percent4: 80,
      percent5: 100,
      percent6: 0
    };
  },

  methods: {
    handleIncrement() {
      this.percent6 += 10;
      if (this.percent6 > 100) {
        this.percent6 = 100;
      }
    },

    handleReduce() {
      this.percent6 -= 10;
      if (this.percent6 < 0) {
        this.percent6 = 0;
      }
    }
  }
};
</script>

<style scoped>
.data-show {
  display: flex;
  flex-direction: column;
  white-space: pre;
}

.data-show span {
  padding-bottom: 10px;
}

.data-show > span:first-of-type {
  font-size: 2em;
}

.data-show > span:nth-of-type(2) {
  text-decoration: underline;
}

.data-show > span:last-of-type {
  padding-bottom: 0;
  font-size: 1.2em;
  font-weight: 300;
}
</style>
