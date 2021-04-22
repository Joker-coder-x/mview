export const HollowOutStyleConfig={
	top:{
		beforePosition:'bottom',
		beforeStylePosition:{
			left:0,
			top:0
		},
		afterPosition:'bottom-left',
		afterStylePosition:{
			right:'-2px',
			bottom:0,
			transform:'translateX(100%)'
		}
	},
	
	
	
	bottom:{
		beforePosition:'top',
		beforeStylePosition:{
			left:0,
			bottom:0
		},
		afterPosition:'bottom-right',
		afterStylePosition:{
			left:'-2px',
			top:0,
			transform:'translateX(-100%)'
		}
	},
	
	
	
	left:{
		beforePosition:'right',
		beforeStylePosition:{
			left:0,
			top:0
		},
		afterPosition:'top-left',
		afterStylePosition:{
			top:'100%',
			right:0,
			transform:'translateY(2px)'
		}
	},
	
	
	
	right:{
		beforePosition:'left',
		beforeStylePosition:{
			right:0,
			top:0
		},
		afterPosition:'top-right',
		afterStylePosition:{
			top:'100%',
			left:0,
			transform:'translateY(2px)'
		}
	},
	
	beforeColor:'white'
}


export const CommonStyleConfig={
	top:{
		beforePosition:'top',
		beforeStylePosition:{
			top:0,
			left:0,
			transform:'translateY(-100%)'
		},
		afterPosition:'bottom-left',
		afterStylePosition:{
			right:'-1px',
			bottom:0,
			transform:'translateX(100%)'
		}
	},
	
	
	
	bottom:{
		beforePosition:'bottom',
		beforeStylePosition:{
			top:'100%',
			left:'-2px'
		},
		afterPosition:'bottom-right',
		afterStylePosition:{
			left:'-2px',
			top:0,
			transform:'translateX(-100%)'
		}
	},
	
	
	
	left:{
		beforePosition:'left',
		beforeStylePosition:{
			top:0,
			left:0,
			transform:'translateX(-100%)'
		},
		afterPosition:'top-left',
		afterStylePosition:{
			top:'100%',
			right:0
		}
	},
	
	
	
	right:{
		beforePosition:'right',
		beforeStylePosition:{
			top:0,
			right:0,
			transform:'translateX(100%)'
		},
		afterPosition:'top-right',
		afterStylePosition:{
			top:'100%',
			left:0
		}
	},
	
	
	
	beforeColor:'white'
}


export const TypeColorConfig={
	default:{
		before:'#fff',
		after:'#5c6161'
	},
	primary:{
		before:'#409eff',
		after:'#2865a1'
	},
	success:{
		before:'#67c23a',
		after:'#567f51'
	},
	info:{
		before:'#909399',
		after:'#76787d'
	},
	warning:{
		before:'#e6a23c',
		after:'#78623c'
	},
	danger:{
		before:'#f56c6c',
		after:'#8b5844'
	},
}