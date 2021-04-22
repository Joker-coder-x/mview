<template>
	<div class="m-checkbox">
		<input type="checkbox" 
			   :disabled="disabled"
			   :checked="checked" 
			   v-on:change="$emit('change', $event.target.checked)"/>
		<label :class="getClass"
			   :style="checked?`color:${color};`:''"></label>
		<span class="m-checkbox__inner-text"
			  :style="checked?`color:${color};`:''"><slot></slot></span>
	</div>
</template>

<script>
	
	export default {
		name:'mCheckbox',

		model: {
		    prop: 'checked',
		    event: 'change'
		},

		props:{
			checked:{
				type:Boolean,
				default:false
			},
			isIndeterminate:{
				type:Boolean,
				default:false
			},
			color:{
				type:String,
				default:'#3498db'
			},
			disabled:{
				type:Boolean,
				default:false
			},
			circle:{
				type:Boolean,
				default:false
			},
			line:{
				type:Boolean,
				default:false
			}
		},
		
		computed:{
			getClass(){
				if(this.isIndeterminate){
					return 'mIcon-checkbox-indeterminate-fill'
				}

				let unchecked=("mIcon-"+(this.circle?'checkbox-circle-blank':'checkbox-square-blank')),
					checked=('mIcon-'+(this.circle?this.line?'checkbox-circle-line':'checkbox-circle-fill':this.line?'checkbox-square-outline':'checkbox-square-fill'));

				return this.checked===true?checked:unchecked;
			}
		}
	}
</script>

	
<style scoped>
	.m-checkbox{
		position: relative;
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		color:var(--text);
	}
	
	input[type='checkbox']{
		opacity: 0;
		cursor: pointer;
		padding-right: 50px;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	input[type='checkbox']+label{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: -1;
		transform: scale(1.2);
	}

	.m-checkbox__inner-text{
		padding-left: 5px;
		font-size: 1.3rem;
		position: relative;
		top: -.1rem;
		white-space: nowrap;

	}
</style>
