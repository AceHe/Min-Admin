<template>
	<div class="blog-container">

		<!-- start of 顶部按钮 -->
		<el-row>
			<el-col :span="24">
				<el-button type="primary"
					@click="dialogNewCateVisible = true">新增分类</el-button>
			</el-col>
		</el-row>
		<!-- end of 顶部按钮 -->
	
		<!-- start of 分类表格 -->
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
				label="分类"
				width="200">
				<template slot-scope="scope">
					<el-tag size="medium">{{ scope.row.name }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				label="文章数量"
				prop="count"
				sortable
				width="200">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handChangeCate( scope.row.name, scope.row.uuid )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handDelCate( scope.row.name, scope.row.uuid )">删除</el-button>
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
				tableData: [], 		 // 表格分类数据
				tableLoading: false, // 表格loading

				dialogNewCateVisible: false,    // 新增分类dialog
				newCateform: {
					name: '' 	// 新增分类名称
				},

				dialogChangeCateVisible: false, // 修改分类dialog
				changeCateform: {
					beforName: '', 	// 修改前名称
					afterName: '', 	// 修改后名称
					uuid: '' 		// 当前分类ID
				},

				currentPage: 1, 	// 当前页码
				pageSizes: 8, 		// 每页条目数
				pageTotal: 0 		// 总条目数

			}
		},
		created() {
			this.axiosGetCategory();
		},
		methods: {

			// 获取分类数据
			axiosGetCategory() {
				// 显示loading
				this.tableLoading = true;

				let data = {
					page: this.currentPage,
					limt: this.pageSizes,
				}
				getCategory(data).then(res => {
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

			// 新增分类
			axiosAddCategory( data ) {
				addCategory( data ).then(res =>{
					// 重置新增分类信息
					this.newCateform.name = '';
					this.dialogNewCateVisible = false;

					if( res.code == 0 ){
						// 跳转到第一页
						this.currentPage = 1;
						this.axiosGetCategory();
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

			// 删除分类
			axiosDelCategory( data ) {
				delCategory( data ).then(res =>{
					if( res.code == 0 ){
						this.axiosGetCategory();
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

			// 修改分类
			axiosChangeCategory( data ) {
				changeCategory( data ).then(res =>{
					// 重置修改分类信息
					this.changeCateform.beforName = '';
					this.changeCateform.afterName = '';
					this.changeCateform.uuid = '';
					this.dialogChangeCateVisible = false;

					if( res.code == 0 ){
						this.axiosGetCategory();
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

			// 新增分类
			submitAddNewCate() {
				let data = {
					name: this.newCateform.name
				}
				this.axiosAddCategory(data);
			},

			// 删除分类
			handDelCate( name, uuid ) {
				this.$confirm('成功删除后，所有文章不再包含 '+name+ ' 分类！', '警告', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					let data = {
						uuid: uuid
					};
					this.axiosDelCategory( data );
				}).catch(action => {});
			},

			// 修改分类-dialog
			handChangeCate( name, uuid ) {
				// 保存修改前信息
				this.changeCateform.beforName = name;
				this.changeCateform.afterName = name;
				this.changeCateform.uuid = uuid;

				this.dialogChangeCateVisible = true;
			},

			// 修改分类-提交
			submitChangeCate(){
				let data = {
					uuid: this.changeCateform.uuid,
					newcate: this.changeCateform.afterName
				}

				this.axiosChangeCategory( data );
			},

			// 切换分页
			handleCurrentChange(index) {
				// 保存当前分页
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
