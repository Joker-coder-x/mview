<template>
    <div>
        <h2>验证组件</h2>
        <div class="demo-verification">
            <m-verification-exp @test="handleTest"></m-verification-exp>
            <m-verification-exp @test="handleTest"
                                :isCaseSensitive="true"
                                :config="{backgroundColor:'blue',fontColor:'white'}"></m-verification-exp>
            <m-verification-exp  @test="handleTest" 
                                type="exp" 
                                :config="{fontSize:30,fontColor:'red',operatorConfig:['+','-']}"></m-verification-exp>
        </div>
        <div class="demo" style="margin:20px">
            <m-verification-slider :imgList="imgList"
                                    sliderShape="circle"
                                @test="handleVerificationTest"></m-verification-slider>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
             imgList:[
			  require("@/assets/images/01.jpeg"),
			  require("@/assets/images/02.jpeg"),
			  require("@/assets/images/04.jpeg"),
		  ]
        }
    },

    methods:{
      handleTest(data){
		  console.log(data);
	  },

	  handleVerificationTest(res){
		  console.log(res);
	  },
    }
}
</script>

<style scoped>
.demo,.demo-verification{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>