<template>
    <div>
	   <h1>Switch 开关</h1>
	   <p><b>表示两种相互对立的状态间的切换，多用于触发「开/关」。(可通过ENTER键触发)</b></p>
		
	   <h2 style="margin-top: 30px;">基本用法</h2>
	   <div>
		   <m-switch></m-switch>
	   </div>
		
	   <h2 style="margin-top: 30px;">文字描述</h2>
	   <div>
		   <m-switch active-text="灰原" inactive-text="苦艾酒" v-model="value1"></m-switch>
	   </div>
	   <h2 style="margin-top: 30px;">内联文字</h2>
	   <div>
	   	   <m-switch active-text="ON" inactive-text="OFF" inline-text></m-switch>
	   </div>
	   
	   <h2 style="margin-top: 30px;">禁用状态</h2>
	   <div style="display: flex;">
		   <m-switch :value="true" disabled style="margin-right: 20px;"></m-switch>
		   <m-switch disabled ></m-switch>
	   </div>
		
		<h2 style="margin-top: 30px;">自定义颜色</h2>
		<div style="display: flex;">
			<m-switch inactive-color="#e74c3c"  active-color="#27ae60" style="margin-right: 20px;"></m-switch>
			<m-switch inactive-color="blue"  active-color="#8e44ad" ></m-switch>
		</div>
		
		<h2 style="margin-top: 30px;">自定义大小</h2>
		<div style="display: flex;">
			<m-switch  :width="60" style="margin-right: 20px;"></m-switch>
			<m-switch  :width="80" :height="30"></m-switch>
		</div>
		
		<h2 style="margin-top: 30px;">自定义switch获得焦点时outline的宽度</h2>
		<div style="display: flex;">
			<m-switch  inactive-text="none" :outline-width="0" style="margin-right: 20px;"></m-switch>
			<m-switch  inactive-text="5px" :outline-width="5" style="margin-right: 20px;"></m-switch>
			<m-switch inactive-text="10px" :outline-width="10" ></m-switch>
		</div>
		
		
		<h2 style="margin-top: 30px;">可中断的Switch,设置属性 before-change 并返回 Promise或者false，可以阻止切换。</h2>
		<div style="display: flex;">
			<m-switch  :before-change="handleBeforeChange"></m-switch>
		</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value1:false,//被视图依赖的数据
        }
    },
    watch:{
        value1(newVal){
            console.log(newVal);
        }
    },
	methods:{
		handleBeforeChange(){
			return new Promise((resolve,reject)=>{
				 const r=confirm("是否切换按钮?");
				 if (r==true){
					resolve();
				 }
			});
		}
	},
	
}
</script>