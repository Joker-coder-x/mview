<template>
	<li class="m-dropdown-item" @click="handleItemClick"><slot></slot></li>
</template>

<script>
	export default {
		name:"mDropdownItem",
		
		inject:['dropdown','menuItemClickCallMethodName'],
		
		props:{
			commond:String|Number,
		},
		
		methods:{
			//选项被点击
			handleItemClick(){
				this.dropdown[this.menuItemClickCallMethodName]&&this.dropdown[this.menuItemClickCallMethodName](this.commond);
			}
		}
	}
</script>

<style scoped>
	.m-dropdown-item{
		text-align: center;
		padding: 1rem 1rem;
		font-size: 1.3rem;
	}
	
	.m-dropdown-item:hover{
		background-color: #eee;
		color: var(--blue);
	}
</style>
