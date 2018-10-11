<template>
	<div class="blog-container">
		
		<!-- start of 顶部按钮 -->
		<el-row>
			<el-col :span="24">
				<router-link to="/blog/new">
					<el-button type="primary">写文章</el-button>
				</router-link>				
			</el-col>
		</el-row>
		<!-- end of 顶部按钮 -->

		<!-- start of 文章表格 -->
		<el-table
			:data="tableData"
			v-loading="tableLoading"
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

		<!-- start of 分页 -->
		<el-pagination
		 	class="pagination"
		 	layout="total, prev, pager, next"
		 	@current-change="handleCurrentChange"
		 	:current-page="currentPage"
		 	:page-size="pageSizes"
		 	:total="pageTotal">
		</el-pagination>
		<!-- end of 分页 -->

	</div>
</template>

<script>
	import { getArticles, delArticles } from '@/api/blog/article'
	import { parseTime } from '@/utils/formatTime'

	export default {
		name: 'Article',
		data(){
			return {
				tableData: [], 		// 表格文章数据
				tableLoading: false,// 表格loading

				currentPage: 1, 	// 当前页码
				pageSizes: 8, 		// 每页条目数
				pageTotal: 0 		// 总条目数
			}
		},
		created() {
			this.axiosGetArticles();
		},
		filters: {
			// 时间格式化 {y}-{m}-{d} {h}:{i}:{s}
			formatTime: function (value) {
				if (!value) return ''
				return parseTime(value)
			}
		},
		methods: {
			// 获取文章
			axiosGetArticles() {
				// 显示loading
				this.tableLoading = true;

				let data = {
					page: this.currentPage,
					limt: this.pageSizes,
				}
				getArticles(data).then(res => {
					if( res.code == 0 ){
						// 保存数据
						this.tableData = res.data;
						this.pageTotal = res.total;
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
					this.tableLoading = false; // 隐藏loading
				}).catch(error => {
					this.tableLoading = false; // 隐藏loading
					console.log(error) // for debug
				})
			},

			// 删除文章
			axiosDelAarticles( data ) {
				delArticles( data ).then(res =>{
					if( res.code == 0 ){
						this.axiosGetArticles();
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 删除文章
			handDelArtic( index ) {
				this.$confirm('一经删除，不可恢复！', '警告', {
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
				// 跳转到文章编辑页
				this.$router.push({
					name: 'EditArticle',
					params: {articid:index} 
				});
			},

			// 切换分页
			handleCurrentChange(index) {
				// 保存当前分页
				this.currentPage = index;
				this.axiosGetArticles();
			}
		}
	}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.blog {
	  &-container {
	    margin: 30px;
	    .pagination {
		  margin-top: 10px;
	  	  text-align: right;
		}
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