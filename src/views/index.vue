<template>
	<div class="index_box">
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
		<!-- <nav>
		<router-link tag='div' to="/index/myCloset">
			<i class="iconfont icon-yigui"></i>
			<p>My Closet</p>
			</router-link>

		<router-link  tag='div' to="/index/scenarios">
			<i class="iconfont icon-lianyiqun"></i>
			<p>Scenarios</p>
		</router-link>
		<router-link  tag='div' to="/index/personal">
			<i class="iconfont icon-nv"></i>
			<p>Personal</p>
		</router-link>
		</nav> -->
	</div>
</template>
<script>
	export default{
		data(){
			return {
				msg: 'index',
				transitionName: ''
			}
		},
		watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            console.log(toDepth + ',' + fromDepth)
        }
    }
	}

</script>
<style type="text/css" lang="scss">
	/*nav{
		position: fixed;
		height: 44px;
		bottom: 0;
		width: 100%;
		z-index: 1;
		background: #fff;
	}*/
	.index_box{
		/*display: flex;*/
		flex-direction:column;
		height:100%;
		header{
			height: 0.44rem;
			background:blue;
			padding: 10px 10px 30px;
		}
		nav{
			width: 100%;
			height:0.44rem;
			display:flex;
			/*padding-top: 0.05rem;*/
			position: fixed;
			bottom: 0;
			background-color: #fff;
			z-index: 1;
			div{
				flex:1;
				text-align: center;
				.iconfont{
					font-size: 24px;
					line-height: 26px;
				}
			}
			p{
				font-size: 12px;
			}
		}
	}

</style>
