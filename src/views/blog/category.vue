<template>
	<div class="blog-container">

		<el-row>
			<el-col :span="24">
				<el-button type="primary"
					@click="dialogNewCateVisible = true">新增分类</el-button>
			</el-col>
		</el-row>
	
		<!-- start of 分类表格 -->
		<el-table
			:data="tableData"
			stripe
			style="width: 100%">

			<el-table-column
				type="index"
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
						@click="handChangeCate( scope.row.cate, scope.row.id )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handDelCate( scope.row.cate, scope.row.id )">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end of 分类表格 -->

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

		<!-- start of 新增分类dialog -->
		<el-dialog 
			title="新增分类" 
			width="40%"
			label-width="120px"
			:visible.sync="dialogNewCateVisible">
			<el-form :model="newCateform">
				<el-form-item label="分类名称:">
					<el-input v-model="newCateform.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogNewCateVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitAddNewCate">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 新增分类dialog -->

		<!-- start of 修改分类dialog -->
		<el-dialog 
			title="修改分类" 
			width="40%"
			label-width="120px"
			:visible.sync="dialogChangeCateVisible">
			<el-form :model="changeCateform">
				<el-form-item label="修改前分类名称:">
					<el-tag size="medium">{{ changeCateform.beforName }}</el-tag>
				</el-form-item>
				<el-form-item label="修改后分类名称:">
					<el-input v-model="changeCateform.afterName"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogChangeCateVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitChangeCate">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 修改分类dialog -->


	</div>
</template>

<script>
	import { getCategory, addCategory, delCategory, changeCategory } from '@/api/blog/category'

	export default {
		name: 'Category',
		data() {
			return {
				tableData: [],  // 分类数据

				dialogNewCateVisible: false,    // 新增分类dialog
				dialogChangeCateVisible: false, // 修改分类dialog
				newCateform: {
					name: ''
				},
				changeCateform: {
					beforName: '',
					afterName: '',
					index: ''
				},

				currentPage: 1,
				pageSizes: 8,
				pageTotal: 0

			}
		},
		created() {
			this.axiosGetCategory();
		},
		methods: {

			// 获取分类数据
			axiosGetCategory() {
				let data = {
					page: this.currentPage,
					limt: this.pageSizes,
				}
				getCategory(data).then(res => {
					this.tableData = res.data;
					this.pageTotal = res.total;

					this.newCateform.name = '';
					this.dialogNewCateVisible = false;

					this.changeCateform.beforName = '';
					this.changeCateform.afterName = '';
					this.dialogChangeCateVisible = false;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 新增分类
			axiosAddCategory( cate ) {
				addCategory( cate ).then(res =>{
					if( res.code == 0 ){
						this.axiosGetCategory();
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
				})
			},

			// 删除分类
			axiosDelCategory( data ) {
				delCategory( data ).then(res =>{
					this.axiosGetCategory();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 修改分类
			axiosChangeCategory( data ) {
				changeCategory( data ).then(res =>{
					this.axiosGetCategory();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 新增分类
			submitAddNewCate() {
				let data = {
					category: this.newCateform.name
				}
				this.axiosAddCategory(data);
			},

			// 删除分类
			handDelCate( cate, index ) {
				this.$confirm('成功删除后，此分类下的文章剔除此分类！', '删除 '+cate+ ' 分类', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					let data = {
						id: index
					}
					this.axiosDelCategory( data );
				}).catch(action => {});
			},

			// 修改分类-dialog
			handChangeCate( cate, index ) {
				this.changeCateform.beforName = cate;
				this.changeCateform.afterName = cate;
				this.changeCateform.index = index;
				this.dialogChangeCateVisible = true;
			},

			// 修改分类-提交
			submitChangeCate(){
				let data = {
					id: this.changeCateform.index,
					newcate: this.changeCateform.afterName
				}
				this.axiosChangeCategory( data );
			},

			// 切换分页
			handleCurrentChange(index) {
				this.currentPage = index;
				this.axiosGetCategory();
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
</style>
