<template>
  <div>
    <div>
      <h2>老虎机</h2>
      <m-slots @complete="handleComplete">
        <template v-slot:default>
          <m-slots-item v-for="n in 4" :key="n">
            <m-slots-item-content
              v-for="item in slotsList"
              :key="item.name"
              :name="item.name"
            >
              <div class="demo-slots-item-content-child">
                {{ item.value }}
              </div>
            </m-slots-item-content>
          </m-slots-item>
        </template>
      </m-slots>
    </div>
    <div>
      <h2>自定义样式老虎机</h2>
      <m-slots
        @complete="handleComplete"
        customStartTargetSelector="#customTarget"
      >
        <template v-slot:header>
          <h1>自定义header</h1>
        </template>
        <template v-slot:default>
          <m-slots-item v-for="n in 4" :key="n">
            <m-slots-item-content
              v-for="item in slotsList"
              :key="item.name"
              :name="item.name"
            >
              <div class="demo-slots-item-content-child">
                {{ item.value }}
              </div>
            </m-slots-item-content>
          </m-slots-item>
        </template>
        <template v-slot:footer>
          <button id="customTarget">自定义触发对象+footer</button>
        </template>
      </m-slots>
    </div>

    <div>
      <h2>匀速移动</h2>
      <m-slots @complete="handleComplete" :easeout="false">
        <template v-slot:default>
          <m-slots-item v-for="n in 4" :key="n">
            <m-slots-item-content
              v-for="item in slotsList"
              :key="item.name"
              :name="item.name"
            >
              <div class="demo-slots-item-content-child">
                {{ item.value }}
              </div>
            </m-slots-item-content>
          </m-slots-item>
        </template>
      </m-slots>
    </div>
    <div>
      <h2>自定义速度</h2>
      <m-slots @complete="handleComplete" :speed="1">
        <template v-slot:default>
          <m-slots-item v-for="n in 3" :key="n">
            <m-slots-item-content
              v-for="item in slotsList"
              :key="item.name"
              :name="item.name"
            >
              <div class="demo-slots-item-content-child">
                {{ item.value }}
              </div>
            </m-slots-item-content>
          </m-slots-item>
        </template>
      </m-slots>
    </div>

    <div>
      <h2>禁用状态</h2>
      <m-slots @complete="handleComplete" disabled>
        <template v-slot:default>
          <m-slots-item v-for="n in 4" :key="n">
            <m-slots-item-content
              v-for="item in slotsList"
              :key="item.name"
              :name="item.name"
            >
              <div class="demo-slots-item-content-child">
                {{ item.value }}
              </div>
            </m-slots-item-content>
          </m-slots-item>
        </template>
      </m-slots>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slotsList: [
        {
          name: "0001",
          value: "安踏"
        },
        {
          name: "0002",
          value: "爱疯18"
        },
        {
          name: "0003",
          value: "小米"
        },
        {
          name: "0004",
          value: "李宁"
        },
        {
          name: "0005",
          value: "华为200"
        },
        {
          name: "0006",
          value: "切格瓦拉"
        }
      ]
    };
  },

  methods: {
    handleComplete(result) {
      console.log(result);
      alert("抽奖结果为: " + result);
    }
  }
};
</script>

<style scoped>
.demo-slots-item-content-child {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: #34495e;
  color: white;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
