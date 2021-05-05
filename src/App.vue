<template>
  <div id="app">
    <m-container>
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
          <router-link to="/popper" tag="li">Popper弹出框</router-link>
          <router-link to="/popper" tag="li">Popper弹出框</router-link>
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

<style>
@import url("assets/css/index.css");

body {
  margin: 0px;
  padding: 0;
}

.nav {
  list-style: none;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: 0;
  width: inherit;
}

.nav::-webkit-scrollbar {
  width: 0px;
}

.nav > li {
  padding: 2rem;
  border-bottom: 1px solid rgb(73, 70, 70);
  cursor: pointer;
  font-size: 1.5rem;
  background-color: #2c3e50;
  color: white;
  margin: 0;
  font-weight: bold;
  font-family: -apple-system, Helvetica Neue, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Open Sans, sans-serif;
  text-transform: uppercase;
}

.nav > li:hover {
  background-color: var(--primary);
  color: white;
}

.m-container,
.m-aside {
  padding: 0;
  margin: 0;
}

.demo-main {
  padding: 30px;
}
</style>
