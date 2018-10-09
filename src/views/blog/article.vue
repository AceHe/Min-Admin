<template>
	<div class="blog-container">

		<el-row>
			<el-col :span="24">
				<router-link to="/blog/new">
					<el-button type="primary">写文章</el-button>
				</router-link>				
			</el-col>
		</el-row>

		<!-- start of 文章表格 -->
		<el-table
			:data="tableData"
			stripe
			style="width: 100%">

			<el-table-column
				type="index"
				width="55">
			</el-table-column>

			<el-table-column
				label="标题"
				prop="title"
				width="250">
			</el-table-column>

			<el-table-column
				label="分类"
				prop="category"
				width="150">
			</el-table-column>

			<el-table-column
				label="标签"
				width="300">
				<template slot-scope="scope">
					<el-tag v-for="(item,index) in scope.row.tags"
						:key="index"
						size="medium">{{ item }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				label="阅读量"
				prop="read_num"
				width="100">
			</el-table-column>

			<el-table-column
				label="置顶"
				width="100">
				<template slot-scope="scope">
					<span> {{ scope.row.top == 'true' ? '是' : '否' }} </span>
				</template>
			</el-table-column>

			<el-table-column
				label="发布时间">
				<template slot-scope="scope">
					<span> {{ scope.row.upload_time | formatTime }} </span>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handChangeArtic( scope.row.id )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handDelArtic( scope.row.id )">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end of 文章表格 -->

	</div>
</template>

<script>
	import { getArticles, delArticles } from '@/api/blog/article'
	import { parseTime } from '@/utils/formatTime'

	export default {
		name: 'Article',
		data(){
			return {
				tableData: [],  // 文章数据
			}
		},
		created() {
			this.axiosGetArticles();
		},
		filters: {
			formatTime: function (value) {
				if (!value) return ''
				return parseTime(value)
			}
		},
		methods: {
			// 获取文章
			axiosGetArticles() {
				getArticles().then(res => {
					this.tableData = res.data;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 删除文章
			axiosDelAarticles( data ) {
				delArticles( data ).then(res =>{
					this.axiosGetArticles();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 删除文章
			handDelArtic( index ) {
				this.$confirm('一经删除，不可恢复！', '删除文章', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					let data = {
						id: index
					}
					this.axiosDelAarticles( data );
				}).catch(action => {});
			},

			// 修改文章
			handChangeArtic( index ) {
				this.$router.push({
					name: 'EditArticle',
					params: {articid:index} 
				});
			}
		}
	}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.blog {
	  &-container {
	    margin: 30px;
	  }
	  &-text {
	    font-size: 30px;
	    line-height: 46px;
	  }
	}

	.el-dialog .el-input, .el-dialog .el-select {
		width: 300px;
	}

	.el-tag--medium {
	    margin-right: 5px;
	    margin-bottom: 2px;
	}
</style>