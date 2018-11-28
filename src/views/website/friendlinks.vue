<template>
	<div class="site-container">
		
		<!-- start of 顶部按钮 -->
		<el-row>
			<el-col :span="24">
				<el-button type="primary"
					@click="handleAdd('新增')">新增友情链接</el-button>
			</el-col>
		</el-row>
		<!-- end of 顶部按钮 -->

		<!-- start of 友情链接表格 -->
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
				label="名称"
				prop="name"
				width="200">
			</el-table-column>

			<el-table-column
				label="链接"
				prop="site"
				width="200">
			</el-table-column>

			<el-table-column
				label="头像"
				prop="avatar"
				width="200">
			</el-table-column>

			<el-table-column
				label="slogan"
				prop="slogan"
				width="200">
			</el-table-column>

			<el-table-column
				label="Github"
				prop="github"
				width="200">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleChange( scope.row, '修改' )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete( scope.row.uuid )">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end of 友情链接表格 -->

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
			:title="dialogTitle+'友链'" 
			width="60%"
			label-width="120px"
			class="my-dialog"
			@close="emptyInfo"
			:visible.sync="dialogLinksVisible">
			<el-form :model="friendLink" label-width="80px">
				<el-form-item label="网址:">
					<el-input v-model="friendLink.site"></el-input>
				</el-form-item>
				<el-form-item label="名称:">
					<el-input v-model="friendLink.name"></el-input>
				</el-form-item>
				<el-form-item label="头像:">
					<el-input v-model="friendLink.avatar"></el-input>
				</el-form-item>
				<el-form-item label="slogan:">
					<el-input v-model="friendLink.slogan"></el-input>
				</el-form-item>
				<el-form-item label="github:">
					<el-input v-model="friendLink.github"></el-input>
				</el-form-item>						
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogLinksVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 新增分类dialog -->

	</div>
</template>

<script>
	import { setFrinedLink, getFrinedLink, delFrinedLink, changeFrinedLink } from '@/api/blog/friendlink'

	export default {
		name: 'FriendshipLinks',
		data() {
			return {
				dialogTitle: '新增',
				dialogLinksVisible: false,

				tableData: [],
				tableLoading: false,

				friendLink :{
					uuid: '',
					site: '',
					name: '',
					avatar: '',
					slogan: '',
					github: ''
				},

				currentPage: 1, 	// 当前页码
				pageSizes: 8, 		// 每页条目数
				pageTotal: 0 		// 总条目数
			}
		},
		created(){
			this.axiosGetFrinedLink()
		},
		methods: {
			axiosGetFrinedLink() {
				this.tableLoading = true;
				let data = {
					page: this.currentPage,
					limt: this.pageSizes,
				}
				getFrinedLink( data ).then( res=>{
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
					this.emptyInfo();
				}).catch(error => {
					this.emptyInfo();
					console.log(error) // for debug
				})
			},

			axiosSetFrinedLink() {
				setFrinedLink( this.friendLink ).then( res=>{
					if( res.code == 0 ){
						this.axiosGetFrinedLink();
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

			axiosDelFrinedLink(uuid) {
				let data = {
					uuid: uuid
				}
				delFrinedLink( data ).then( res=>{
					if( res.code == 0 ){
						this.axiosGetFrinedLink();
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
				})
			},

			axioschangeFrinedLink() {
				changeFrinedLink( this.friendLink ).then( res=>{
					if( res.code == 0 ){
						this.axiosGetFrinedLink();
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

			// 新增友链
			handleAdd(type){
				this.dialogTitle = type;
				this.dialogLinksVisible = true;
			},

			// 修改友链
			handleChange(data, type){
				this.friendLink = data;
				this.dialogTitle = type;
				this.dialogLinksVisible = true;
			},

			// 删除友链
			handleDelete(uuid){
				this.$confirm('确认删除该友情链接！', '警告', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					this.axiosDelFrinedLink( uuid );
				}).catch(action => {});
			},

			// 提交
			submit(){
				if( this.dialogTitle == '新增' ){
					this.axiosSetFrinedLink()
				}else{
					this.axioschangeFrinedLink();			
				}
			},

			// 切换分页
			handleCurrentChange(index) {
				// 保存当前分页
				this.currentPage = index;
				this.axiosGetFrinedLink();
			},

			// 清空数据
			emptyInfo(){
				this.dialogLinksVisible = false;
				this.tableLoading = false;

				this.friendLink.uuid = '';
				this.friendLink.site = '';
				this.friendLink.name = '';
				this.friendLink.avatar = '';
				this.friendLink.slogan = '';
				this.friendLink.github = '';
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

		.my-dialog {
			/deep/ .el-input {
				width: 85%;
			}
		}
	}
</style>