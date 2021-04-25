<template>
    <div>
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
    </div>
</template>

<script>
export default {
    data(){
        return {
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
        }
    },

    methods:{
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
    }
}
</script>

<style scoped>
</style>