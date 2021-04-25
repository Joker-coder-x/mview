<template>
	<span class="m-triangle" :style="getTriangleStyle"></span>
</template>

<script>
	const positionList=[
		'top',
		'bottom',
		'left',
		'right',
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right'
	];
	const genrateTriangleStyle=function(position,color,size,rate){
		let   styleObj=null;
		const mainBorder=`${size}px solid ${color}`,
			  transparentBorder=`${Math.floor(size/rate)}px solid transparent`;
		
		switch(position.toLowerCase()){
			case positionList[0] :
				styleObj={
					borderBottom:mainBorder,
					borderLeft:transparentBorder,
					borderRight:transparentBorder
				}
				break;
			case positionList[1]:
				styleObj={
					borderTop:mainBorder,
					borderLeft:transparentBorder,
					borderRight:transparentBorder
				}
				break;
			case positionList[2]:
				styleObj={
					borderTop:transparentBorder,
					borderRight:mainBorder,
					borderBottom:transparentBorder
				}
				break;
			case positionList[3]:
				styleObj={
					borderTop:transparentBorder,
					borderLeft:mainBorder,
					borderBottom:transparentBorder
				}
				break;
			case positionList[4]:
				styleObj= {
					borderTop:mainBorder,
					borderRight:transparentBorder
				}
				break;
			case positionList[5]:
				styleObj={
					borderTop:mainBorder,
					borderLeft:transparentBorder
				}
				break;
			case positionList[6]:
				styleObj={
					borderBottom:mainBorder,
					borderRight:transparentBorder
				};
				break;
			case positionList[7]:
				styleObj={
					borderBottom:mainBorder,
					borderLeft:transparentBorder
				}
				break;
			default:
				break;
		}

		return styleObj;
	}
	
	
	export default {
		name:"MTriangle",
		
		props:{
			size:{
				type:Number,
				default:20
			},
			position:{
				type:String,
				default:positionList[0],
				validator(value){
					return positionList.indexOf(value)!==-1;
				}
			},
			color:{
				type:String,
				default:'blue'
			},
			rate:{
				type:Number,
				default:1
			}
		},

		computed:{
			getTriangleStyle(){
				return genrateTriangleStyle(this.position,this.color,this.size,this.rate);
			}
		}
	}
</script>

<style>
.m-triangle{
	display: inline-block;
}
</style>