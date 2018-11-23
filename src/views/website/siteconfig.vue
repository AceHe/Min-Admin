<template>
	<div class="site-container">
		
	<el-form ref="form" :model="form" label-width="80px">

		<el-form-item label="昵称:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="slog:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="简介:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="标签:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="爱好:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="技能:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="地址:">
			<el-input v-model="form.name"></el-input>
		</el-form-item>

	</el-form>


	</div>
</template>

<script>
	
	export default {
		name: '',
		data() {
			return {
				form: {}
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