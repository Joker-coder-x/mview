<template>
  <div id="app">
    <m-container class="demo-container">
      <m-aside width="250px" class="demo-aside">
        <ul class="nav">
          <router-link to="/button" tag="li">button</router-link>
          <router-link to="/checkbox" tag="li">checkbox</router-link>
          <router-link to="/bookmark" tag="li">bookmark</router-link>
          <router-link to="/dropdown" tag="li">dropdown</router-link>
          <router-link to="/layout" tag="li">layout</router-link>
          <router-link to="/slots" tag="li">slots</router-link>
          <router-link to="/tabs" tag="li">tabs</router-link>
          <router-link to="/scratch-card" tag="li">scratch-card</router-link>
          <router-link to="/verification" tag="li">verification</router-link>
          <router-link to="/collapse" tag="li">collapse</router-link>
          <router-link to="/rate" tag="li">Rate评分</router-link>
          <router-link to="/switch" tag="li">Switch开关</router-link>
          <router-link to="/popper" tag="li">Popper弹出框</router-link>
          <router-link to="/table" tag="li">Table表格</router-link>
          <router-link to="/scroll-container" tag="li"
            >Scroll滚动容器</router-link
          >
        </ul>
      </m-aside>
      <m-main class="demo-main"><router-view></router-view></m-main>
    </m-container>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "../src/style/index.less";

body,
ul {
  margin: 0;
  padding: 0;
}

body {
  padding-left: 250px;
}

.nav {
  list-style: none;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: 0;
  width: inherit;
  background-color: #2c3e50;
}

.nav::-webkit-scrollbar {
  width: 0px;
}

.nav > li {
  padding: 20px;
  border-bottom: 1px solid rgb(73, 70, 70);
  cursor: pointer;
  font-size: 15px;

  color: white;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
}

.nav > li:hover {
  background-color: @primary-color;
  color: white;
}

.m-container,
.m-aside {
  padding: 0;
  margin: 0;
}

.demo-main {
  padding: 30px;
  max-width: 100%;
  // overflow: hidden;
}

.demo-aside {
  position: fixed;
  top: 0;
  left: 0;
}

// .demo-container {
//   padding-left: 250px;
// }

.title-text {
  color: #1c2438;
}

.content-text {
  color: #495060;
}

.sub-text {
  color: #80848f;
}
</style>
