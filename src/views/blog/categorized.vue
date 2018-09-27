<template>
	<div class="blog-container">

		<el-row>
			<el-col :span="24">
				<el-button type="primary"
					@click="dialogNewCateVisible = true">新增分类</el-button>
				<el-button type="danger">批量删除</el-button>
			</el-col>
		</el-row>
	
		<!-- start of 分类表格 -->
		<el-table
			:data="tableData"
			stripe
			style="width: 100%">

			<el-table-column
				type="selection"
				width="55">
			</el-table-column>

			<el-table-column
				label="分类"
				width="200">
				<template slot-scope="scope">
					<el-tag size="medium">{{ scope.row.cate }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				label="文章数量"
				prop="articleNum"
				sortable
				width="200">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit( scope.row.cate )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handDelCate( scope.row.cate )">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end of 分类表格 -->

		<!-- start of 新增分类dialog -->
		<el-dialog 
			title="新增分类" 
			width="40%"
			:visible.sync="dialogNewCateVisible">
			<el-form :model="newCateform">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="newCateform.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogNewCateVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitAddNewCate">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 新增分类dialog -->


	</div>
</template>

<script>
	import { getCategorized, addCategorized, delCategorized } from '@/api/blog'

	export default {
		name: 'Categorized',
		data() {
			return {
				tableData: [],  // 分类数据

				dialogNewCateVisible: false, // 新增分类dialog
				newCateform: {
					name: ''
				}
			}
		},
		created() {
			this.axiosGetCategorized();
		},
		methods: {

			// 获取分类数据
			axiosGetCategorized() {
				getCategorized().then(res => {
					this.tableData = res.data;
					this.newCateform.name = '';
					this.dialogNewCateVisible = false;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 删除分类
			axiosDelCategorized( cate ) {
				delCategorized( cate ).then(res =>{
					this.axiosGetCategorized();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 新增分类
			submitAddNewCate() {
				addCategorized( this.newCateform.name ).then(res =>{
					if( res.code == 0 ){
						this.axiosGetCategorized();
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
				})
			},

			// 删除分类
			handDelCate( cate ) {
				this.$confirm('成功删除后，此分类下的文章剔除此分类！', '删除 '+cate+ ' 分类', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					this.axiosDelCategorized( cate );
				}).catch(action => {});
			},

			handleEdit(index, row) {
				console.log(index, row);
			},

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
</style>
