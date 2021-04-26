<template>
  <div id="app">
	 <m-container>
	   <m-aside>
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
		   </ul>
	   </m-aside>
	   <m-main><router-view></router-view></m-main>
	 </m-container>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
@import url("assets/css/index.css");

body{
	padding:2rem ;
	margin: 0px;
}

.nav{
	list-style: none;
}

.nav>li{
	padding: 2rem;
	border-bottom: 1px solid #aaa;
	cursor: pointer;
	font-size: 1.5rem;
	color: var(--text);
}

.nav>li:hover{
	background-color: var(--primary);
	color: white;
}

.m-main{
	padding: 20px;
}
</style>
