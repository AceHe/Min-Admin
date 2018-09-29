<template>
	<div class="blog-container">

		<el-row>
			<el-col :span="24">
				<el-button type="primary"
					@click="dialogNewTagVisible = true">新增标签</el-button>
			</el-col>
		</el-row>
	
		<!-- start of 标签表格 -->
		<el-table
			:data="tableData"
			stripe
			style="width: 100%">

			<el-table-column
				type="index"
				width="55">
			</el-table-column>

			<el-table-column
				label="标签"
				width="200">
				<template slot-scope="scope">
					<el-tag size="medium">{{ scope.row.tag }}</el-tag>
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
						@click="handChangeTag( scope.row.tag, scope.row.id )">修改</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handDelTag( scope.row.tag, scope.row.id )">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end of 标签表格 -->

		<!-- start of 新增标签dialog -->
		<el-dialog 
			title="新增标签" 
			width="40%"
			label-width="120px"
			:visible.sync="dialogNewTagVisible">
			<el-form :model="newTagform">
				<el-form-item label="标签名称:">
					<el-input v-model="newTagform.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogNewTagVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitAddNewTag">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 新增标签dialog -->

		<!-- start of 修改标签dialog -->
		<el-dialog 
			title="修改标签" 
			width="40%"
			label-width="120px"
			:visible.sync="dialogChangeTagVisible">
			<el-form :model="changeTagform">
				<el-form-item label="修改前标签名称:">
					<el-tag size="medium">{{ changeTagform.beforName }}</el-tag>
				</el-form-item>
				<el-form-item label="修改后标签名称:">
					<el-input v-model="changeTagform.afterName"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogChangeTagVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitChangeTag">确 定</el-button>
			</div>
		</el-dialog>
		<!-- end of 修改标签dialog -->


	</div>
</template>

<script>
	import { getTags, addTags, delTags, changeTags } from '@/api/blog/tag'

	export default {
		name: 'Tag',
		data() {
			return {
				tableData: [],  // 标签数据

				dialogNewTagVisible: false,    // 新增标签dialog
				dialogChangeTagVisible: false, // 修改标签dialog
				newTagform: {
					name: ''
				},
				changeTagform: {
					beforName: '',
					afterName: '',
					index: '',
				},


			}
		},
		created() {
			this.axiosGetTags();
		},
		methods: {

			// 获取标签数据
			axiosGetTags() {
				getTags().then(res => {
					this.tableData = res.data;

					this.newTagform.name = '';
					this.dialogNewTagVisible = false;

					this.changeTagform.beforName = '';
					this.changeTagform.afterName = '';
					this.changeTagform.index = '';
					this.dialogChangeTagVisible = false;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 新增标签
			axiosAddTags( data ) {
				addTags( data ).then(res =>{
					if( res.code == 0 ){
						this.axiosGetTags();
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}
				})
			},

			// 删除标签
			axiosDelTags( data ) {
				delTags( data ).then(res =>{
					this.axiosGetTags();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 修改标签
			axiosChangeTag( data ) {
				changeTags( data ).then(res =>{
					this.axiosGetTags();
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 新增标签
			submitAddNewTag(){
				let data = { tag: this.newTagform.name };
				this.axiosAddTags( data );
			},

			// 删除标签
			handDelTag( tag, index ){
				this.$confirm('成功删除后，所有文章不再包含此标签！', '删除 '+tag+ ' 标签', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认删除',
					cancelButtonText: '取消'
				}).then(() => {
					let data = { id: index };
					this.axiosDelTags( data );
				}).catch(action => {});
			},

			// 修改标签-dialog
			handChangeTag( tag, index ) {
				this.changeTagform.beforName = tag;
				this.changeTagform.afterName = tag;
				this.changeTagform.index = index;
				this.dialogChangeTagVisible = true;
			},

			// 修改标签-提交
			submitChangeTag(){
				let data = {
					id : this.changeTagform.index,
					newtag : this.changeTagform.afterName
				}
				this.axiosChangeTag( data );
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
</style>
