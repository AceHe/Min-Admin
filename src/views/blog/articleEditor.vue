<template>
	<div class="blog-container" v-loading="loading">
		
		<!-- 文章信息 -->
		<el-form :inline="true" :model="form" label-width="80px">

			<el-row>
				<el-col :span="6">
					<el-form-item label="分类">
						<el-select v-model="form.category" placeholder="请选择分类">
							<el-option v-for="(item,index) in categoryArr"
								:key="index"
								:label="item.name"
								:value="item.uuid"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="标签">
						<el-select 
						 	multiple
    						collapse-tags
							v-model="form.tag" 
							placeholder="请选择标签">
							<el-option v-for="(item,index) in tagsArr"
								:key="index"
								:label="item.name"
								:value="item.uuid"></el-option>
							</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="置顶">
						<el-select v-model="form.hots" placeholder="请选择状态">
							<el-option v-for="(item,index) in hotsOption"
								:key="index"
								:label="item.name"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>	
				</el-col>

				<el-col :span="6">
					<el-form-item label="来源">
						<el-select v-model="form.source" placeholder="请选择来源">
							<el-option v-for="(item,index) in sourceOption"
								:key="index"
								:label="item.name"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>	

				<el-col :span="18">
					<el-form-item label="来源地址" v-if="form.source != 1">
						<el-input v-model="form.from" placeholder="来源地址" class="w-title"></el-input>
					</el-form-item>						
				</el-col>

				<el-col :span="12">
					<el-form-item label="文章标题">
						<el-input v-model="form.title" placeholder="文章标题" class="w-title"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="发布日期" v-if="!this.modifyArtic.uuid">
						<el-date-picker
							v-model="form.creatTime"
							type="datetime"
							value-format="timestamp"
							placeholder="选择日期时间">
							</el-date-picker>
					</el-form-item>
					<el-form-item label="更新日期" v-else>
						<el-date-picker
							v-model="form.updataTime"
							type="datetime"
							value-format="timestamp"
							placeholder="选择日期时间">
							</el-date-picker>
					</el-form-item>	
				</el-col>

				<el-col :span="6">
					<el-form-item label="大图地址">
						<el-input v-model="form.thumb" placeholder="大图地址"></el-input>
					</el-form-item>						
				</el-col>

				<el-col :span="12">
					<el-form-item label="文章摘要">
						<el-input v-model="form.description" placeholder="文章摘要" class="w-title"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item>
						<el-button type="primary">发布文章</el-button>
						<el-button type="primary">存为草稿</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- 文章信息 -->

		<!-- markdown 编辑插件 -->
		<mavon-editor 
			ref=md
			v-model="markdownContent"
			placeholder="请开始你的创作吧!"
			@save="saveBlog"
			@imgAdd="$imgAdd"
			/>

	</div>
</template>

<script>
	import axios from 'axios'
	import { getCategory } from '@/api/blog/category'
	import { getTags } from '@/api/blog/tag'
	import { getArticlesById, addArticles, changeArticles } from '@/api/blog/article'

	export default {
		name: '',
		data() {
			return {
				modifyArtic: {}, 	// 保存需要修改前内容
				markdownContent: '',// markdown 内容
				loading: false, 	// loading

				categoryArr: [], 	// 分类数组
				tagsArr: [], 		// 标签数组

				form: {
					category: '', 	// 分类
					tag: [], 		// 标签
					hots: false, 		// 热门文章
					creatTime: new Date().getTime(),  // 发布时间
					updataTime: new Date().getTime(), // 更新时间
					source: 1,		// 来源
					from: '',		// 来源地址
					thumb: '',		// 大图地址
					title: '',		// 标题
					description: '' // 描述
				},

				hotsOption: [{
					value: false,
					name: '否'
				},{
					value: true,
					name: '是'
				}],
				sourceOption: [{
					value: 1,
					name: '原创'
				},{
					value: 2,
					name: '转载'
				}]
			}
		},
		created() {
			// 修改文章前 先获取需要修改的文章信息
			console.log( this.$route.params.uuid )
			if( this.$route.params.uuid ){
				this.loading = true;
				this.axiosGetArticles()
			}

			// 获取分类、标签数组
			this.axiosGetCategory();
			this.axiosGetTags();
		},
		methods: {

			// 获取文章
			axiosGetArticles() {
				let data = {
					uuid: this.$route.params.uuid
				}
				getArticlesById( data ).then(res => {
					console.log(res)
					if( res.code == 0 ){
						this.modifyArtic = res.data;

						// 保存文章其他信息
						this.form.category = this.modifyArtic.category.uuid;
						this.form.tag = []
						for( let ietm of this.modifyArtic.tag ){
							this.form.tag.push( ietm.uuid )
						}
						// this.form.tag = this.modifyArtic.tag;


						this.form.hots = this.modifyArtic.hots;
						this.form.creatTime = parseInt(this.modifyArtic.createdAt);
						this.form.updataTime = parseInt(this.modifyArtic.updatedAt);
						this.form.source = this.modifyArtic.source;
						this.form.from = this.modifyArtic.from;
						this.form.thumb = this.modifyArtic.thumb;
						this.form.title = this.modifyArtic.title;
						this.form.description = this.modifyArtic.description;

						// 保存markdown内容
						this.markdownContent = this.modifyArtic.markdown;
					}else {
						this.$notify.error({
							title: '错误',
							message: res.message
						});
					}

					this.loading = false; // 隐藏loading
				}).catch(error => {
					this.loading = false; // 隐藏loading
					console.log(error) // for debug
				})
			},

			// 获取分类数据
			axiosGetCategory() {
				getCategory().then(res => {
					if( res.code == 0 ){
						this.categoryArr = res.data;
						console.log( this.categoryArr )
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

			// 获取标签数据
			axiosGetTags() {
				getTags().then(res => {
					if( res.code == 0 ){
						this.tagsArr = res.data;
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

			// 发布文章
			saveBlog(value, render) {
				let articObj = {
					'description': this.form.description,
					'renderedContent': render,
					'markdown': value,
					'title': this.form.title,
					'thumb': this.form.thumb,
					'category': {},
					'tag': [],
					'createdAt': new Date(this.form.creatTime).getTime(),
					'updatedAt': new Date(this.form.updataTime).getTime(),
					'source': this.form.source,
					'from': this.form.from,
					'hots': this.form.hots
				};

				// 整理 分类 数据
				for( let itemC of this.categoryArr ){
					if( itemC.uuid == this.form.category ){
						let obj = {
							icon: itemC.icon,
							uuid: itemC.uuid,
							name: itemC.name
						}
						articObj.category = obj;
					}
				}

				// 整理 标签 数据
				for( let itemT of this.tagsArr ){
					for( let itemFT of this.form.tag ){
						if( itemT.uuid == itemFT ){
							let obj = {
								icon: itemT.icon,
								uuid: itemT.uuid,
								name: itemT.name
							}
							articObj.tag.push(obj);
						}
					}
				}

				let data = articObj;

				// 发布新文章
				if( !this.modifyArtic.uuid ){
					addArticles(data).then(res =>{
						if( res.code == 0 ){
							this.$router.push({path: '/blog/article'});
						}else {
							this.$notify.error({
								title: '错误',
								message: res.message
							});
						}
					})
				}
				// 更新文章
				else {
					data.uuid = this.modifyArtic.uuid;
					changeArticles( data ).then(res =>{
						if( res.code == 0 ){
							this.$router.push({path: '/blog/article'});
						}else {
							this.$notify.error({
								title: '错误',
								message: res.message
							});
						}
					})
				}
			},

			// 上传图片
	        $imgAdd(pos, $file){
	            // 第一步.将图片上传到服务器.
	           var formdata = new FormData();
	           formdata.append('smfile', $file);
	           axios({
	               url: 'https://sm.ms/api/upload',
	               method: 'post',
	               data: formdata,
	               headers: { 'Content-Type': 'multipart/form-data' },
	           }).then(res => {
	               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
	               let url = res.data.data.url;
	               let hash = res.data.data.hash;

	               // 简单混淆一下hash
	               hash = hash.split("").reverse().join('');

	               let imgUrl = url + '?h' + hash;
	               this.$refs.md.$img2Url(pos, imgUrl);
	           })
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

	.w-title {
		width: 577px;
	}

	.el-dialog .el-input, .el-dialog .el-select {
		width: 300px;
	}
</style>