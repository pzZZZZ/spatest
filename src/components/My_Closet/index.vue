<template>
	<div class="index_box">
		<div class="swiper-container">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide" id="wrapper"> 
		    	<ul>
		    		<li v-for='item in items'>{{item}}</li>
		    	</ul>

		    </div>
		    <div class="swiper-slide">slider2</div>
		    <div class="swiper-slide">slider3</div>
 		 </div>
		</div>	

	</div>
	

</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				Closet:'hello world~~~~',
				items:[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,,2,2,2,2,2,,2,2,2,,2,2,2,2,2,2,,2,2,2,2,2,2,,2,22,2,,2,2,2,2,,2,2,2,2,2,2,2,,2,2,2,2,2,22,2,2,2]
			}
		},
		mounted(){
			var mySwiper = new Swiper('.swiper-container', {
				
			})
			  var wrapper = document.getElementById('wrapper');
			  var myScroll = new IScroll(wrapper,{
			  	mouseWheel:true
			  });
			console.log(mySwiper)
		}
		
		
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.index_box{
	height: 100%;
	.swiper-container{
		height:100%;
	}
	.swiper-wrapper{
		height:100%;
	}
	.swiper-slide{
		background: orange;
		&:nth-child(2){
			 background:red;
		}
		&:nth-child(3){
			 background:blue;
		}
	}
}
</style>