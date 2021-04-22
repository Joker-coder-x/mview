<template>
  <div id="app">
	<h2>checkbox</h2>
	<div class="demo-checkbox">
		<m-checkbox v-model="checked">默认样式</m-checkbox>
		<m-checkbox v-model="checked1" color="red">自定义颜色</m-checkbox>
		<m-checkbox v-model="checked2" line>镂空样式</m-checkbox>
		<m-checkbox v-model="checked3" circle>圆形</m-checkbox>
		<m-checkbox v-model="checked4" line circle>镂空圆形</m-checkbox>
	</div>
	<h2>下拉菜单,可根据视口位置自动调整弹窗位置</h2>
	<div class="demo-dropdown">
		<m-dropdown @commond="handleCommond" trigger="click">
			<template v-slot:default>
				<m-button type="primary">click方式触发(ESC快捷键可关闭)</m-button>
			</template>
			<template v-slot:dropdown>
				<m-dropdown-menu>
					<m-dropdown-item commond="a">test</m-dropdown-item>
					<m-dropdown-item commond="b">test2sss</m-dropdown-item>
					<m-dropdown-item commond="c">test3</m-dropdown-item>
					<m-dropdown-item commond="d">你好啊 是我看 洒出八月十八</m-dropdown-item>
				</m-dropdown-menu>
			</template>
		</m-dropdown>
		<m-dropdown @commond="handleCommond" trigger="hover">
			<template v-slot:default>
				<m-button type="primary">hover方式触发</m-button>
			</template>
			<template v-slot:dropdown>
				<m-dropdown-menu>
					<m-dropdown-item commond="a">test</m-dropdown-item>
					<m-dropdown-item commond="b">test2sss</m-dropdown-item>
					<m-dropdown-item commond="c">test3</m-dropdown-item>
					<m-dropdown-item commond="d">你好啊 是我看 洒出八月十八</m-dropdown-item>
				</m-dropdown-menu>
			</template>
		</m-dropdown>
	</div>
	
	<h2>按钮</h2>
	<div class="demo-button">
		<m-button >default</m-button>
		<m-button type="primary">primary</m-button>
		<m-button type="success">success</m-button>
		<m-button type="info">info</m-button>
		<m-button type="warning">warning</m-button>
		<m-button type="danger">danger</m-button>
	</div>
	<h2>圆角按钮</h2>
	<div class="demo-button">
		<m-button :round="true">default</m-button>
		<m-button type="primary" :round="true">primary</m-button>
		<m-button type="success" :round="true">success</m-button>
		<m-button type="info" :round="true">info</m-button>
		<m-button type="warning" :round="true">warning</m-button>
		<m-button type="danger" :round="true">danger</m-button>
	</div>
	<h2>圆形按钮</h2>
	<div class="demo-button">
		<m-button :circle="true" icon="home"></m-button>
		<m-button type="primary" :circle="true" icon="home"></m-button>
		<m-button type="success" :circle="true" icon="home"></m-button>
		<m-button type="info" :circle="true" icon="home"></m-button>
		<m-button type="warning" :circle="true" icon="home"></m-button>
		<m-button type="danger" :circle="true" icon="home"></m-button>
	</div>
	<h2>tabs标签页</h2>
	<m-tabs @on-click="handleTabPaneClick">
		<m-tab-pane v-for="item in tabList"
					:key="item.name"
					:name="item.name" :label="item.label">
			{{item.content}}
		</m-tab-pane>
	</m-tabs>
	<h2>可编辑的tabs标签页</h2>
	<m-tabs @on-click="handleTabPaneClick"
			@edit="handleEdit" :editable="true">
		<m-tab-pane v-for="item in tabList"
					:key="item.name"
					:name="item.name" :label="item.label">
			{{item.content}}
		</m-tab-pane>
	</m-tabs>
	<h2>书签</h2>
	<div class="demo-bookmark">
		<m-bookmark position="top">这里是书签</m-bookmark>
		<m-bookmark position="bottom" type="danger">这里是书签</m-bookmark>
		<m-bookmark position="left" type="success">这里是书签</m-bookmark>
		<m-bookmark position="right" type="warning">这里是书签</m-bookmark>
	</div>
	<h2>镂空书签</h2>
	<div class="demo-bookmark">
		<m-bookmark position="top" hollow-out>这里是书签</m-bookmark>
		<m-bookmark position="bottom" type="danger" hollow-out>这里是书签</m-bookmark>
		<m-bookmark position="left" type="success" hollow-out>这里是书签</m-bookmark>
		<m-bookmark position="right" type="warning" hollow-out>这里是书签</m-bookmark>
	</div>
	<h2>刮刮乐</h2>
	<div class="demo-strach-card">
		<m-scratch-card></m-scratch-card>
		<m-scratch-card maskColor="green"><h1>就你个臭咸鱼还想中奖？做梦吧!</h1></m-scratch-card>
		<m-scratch-card maskColor="#aaa"><h1>谢谢惠顾</h1></m-scratch-card>
	</div>

	<h2>验证组件</h2>
	<div class="demo-verification">
		<m-verification-exp @test="handleTest"></m-verification-exp>
		<m-verification-exp @test="handleTest"
							:isCaseSensitive="true"
							:config="{backgroundColor:'blue',fontColor:'white'}"></m-verification-exp>
		<!-- <m-verification-exp  @test="handleTest" 
							 type="exp" 
							 :config="{fontSize:30,fontColor:'red'}"></m-verification-exp> -->
	</div>
	
	<div class="demo">
		<div>
			<h2>老虎机</h2>
			<m-slots @complete="handleComplete">
				<template v-slot:default>
					<m-slots-item v-for="n in 4" :key="n">
						<m-slots-item-content v-for="item in slotsList" 
											:key="item.name" 
											:name="item.name">
						<div class="demo-slots-item-content-child">
							{{item.value}}
						</div>
						</m-slots-item-content>
					</m-slots-item>
				</template>
			</m-slots>
		</div>
		<div>
			<h2>自定义样式老虎机</h2>
			<m-slots @complete="handleComplete"
					customStartTargetSelector="#customTarget">
				<template v-slot:header>
					<h1>自定义header</h1>
				</template>
				<template v-slot:default>
					<m-slots-item v-for="n in 4" :key="n">
						<m-slots-item-content v-for="item in slotsList" 
											:key="item.name" 
											:name="item.name">
						<div class="demo-slots-item-content-child">
							{{item.value}}
						</div>
						</m-slots-item-content>
					</m-slots-item>
				</template>
				<template v-slot:footer>
					<button id="customTarget">自定义触发对象+footer</button>
				</template>
			</m-slots>
		</div>
	</div>

	<div class="demo">
		<div>
			<h2>匀速移动</h2>
			<m-slots @complete="handleComplete" :easeout="false">
				<template v-slot:default>
					<m-slots-item v-for="n in 4" :key="n">
						<m-slots-item-content v-for="item in slotsList" 
											:key="item.name" 
											:name="item.name">
						<div class="demo-slots-item-content-child">
							{{item.value}}
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
						<m-slots-item-content v-for="item in slotsList" 
											:key="item.name" 
											:name="item.name">
						<div class="demo-slots-item-content-child">
							{{item.value}}
						</div>
						</m-slots-item-content>
					</m-slots-item>
				</template>
			</m-slots>
		</div>
	</div>
	
  </div>
</template>

<script>

import mCheckbox from './components/checkbox/index.js';
import mDropdown from './components/dropdown/index.js';
import mDropdownMenu from './components/dropdown-menu/index.js';
import mDropdownItem from './components/dropdown-item/index.js';
import mTriangle from './components/triangle/index.js';
import mButton   from './components/button/index.js';
import mTabs	 from "./components/tabs/index.js";
import mTabPane	 from './components/tab-pane/index.js';
import mIcon 	 from './components/icon/index.js';
import mBookmark from './components/bookmark/index.js';
import mScratchCard from  './components/scratch-card/index.js';
import mVerificationExp from './components/verification-exp/index.js';
import mSlots   from './components/slots/index.js';
import mSlotsItem from './components/slots-item/index.js';
import mSlotsItemContent  from './components/slots-item-content/index.js';

export default {
  name: 'app',
  data(){
	  return {
		  checked:false,
		  checked1:false,
		  checked2:false,
		  checked3:false,
		  checked4:false,
		  tabList:[
			  {
				  label:"蝙蝠侠",
				  name:"1",
				  content:'test 1'
			  },
			  {
				  label:'小丑',
				  name:2,
				  content:'test 2'
			  },
			  {
				  label:"迪迦奥特曼",
				  name:3,
				  content:'test 3'
			  }
		  ],
		  slotsList:[
			{
				name:"0001",
				value:"安踏"
			},
			{
				name:"0002",
				value:"爱疯18"
			},
			{
				name:'0003',
				value:"小米"
			},
			{
				name:"0004",
				value:"李宁"
			},
			{
				name:"0005",
				value:"华为200"
			},
			{
				name:'0006',
				value:"切格瓦拉"
			}
		  ]
	  }
	 
  },

  components:{
	  mCheckbox,
	  mDropdown,
	  mTriangle,
	  mDropdownMenu,
	  mDropdownItem,
	  mButton,
	  mTabs,
	  mTabPane,
	  mIcon,
	  mBookmark,
	  mScratchCard,
	  mVerificationExp,
	  mSlots,
	  mSlotsItem,
	  mSlotsItemContent
  },

  methods:{
	  handleCommond(commond){
		  console.log("点击了菜单选项",commond);
	  },

	  handleTabPaneClick(name){
		  console.log(name+"  click");
	  },

	  handleEdit(action,name){
		  console.log(action,name);
		  const tabList=this.tabList;
		  if(action==='add'){
			  tabList.push({
				  name:tabList.length+1,
				  label:'New Tab',
				  content:`test ${tabList.length+1}`
			  });
		  }else if(action==='remove'){
			  for(let i=0,l=tabList.length;i<l;i++){
				  if(tabList[i].name==name){
					  tabList.splice(i,1);
					  break;
				  }
			  }
		  }
	  },

	  handleTest(data){
		  console.log(data);
	  },

	  handleComplete(result){
		   console.log(result);
           alert('抽奖结果为: ' + result);
	  }

  }
}
</script>

<style>
@import url("assets/css/mui.css");

body{
	padding:2rem ;
	margin: 0px;
}

.demo,.demo-checkbox,.demo-button,.demo-dropdown,.demo-bookmark,.demo-strach-card,.demo-verification{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

.trian{
	/* width: 0;
	height: 0; */
	border-right: 50px solid red;
	border-top: 30px solid transparent;
	border-bottom: 30px solid transparent;
	overflow: visible;
	position: relative;
	z-index: 999;
	display: inline-block;
}

.demo-slots-item-content-child{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	background-color: #34495e;
	color: white;
	width: 100%;
	height: 100%;
	text-align: center;
}
</style>
