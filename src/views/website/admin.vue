<template>
	<div class="site-container">
		管理员
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Admin',
		computed: {
			...mapGetters([
				'name',
				'roles'
			])
		},
		data(){
			return {
				form: {
					name: '',
					pwd: '',
		        }				
			}
		}

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.site {
	  &-container {
	    margin: 30px;
	  }
	  &-text {
	    font-size: 30px;
	    line-height: 46px;
	  }
	}
</style>
