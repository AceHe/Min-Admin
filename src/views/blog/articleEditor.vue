<template>
	<div class="blog-container">
		
		<!-- 文章信息 -->
		<el-form :inline="true" :model="form" label-width="80px">

			<el-row>
				<el-col :span="24">
					<el-form-item label="分类">
						<el-select v-model="form.category" placeholder="请选择分类">
							<el-option v-for="(item,index) in categoryArr"
								:key="index"
								:label="item.cate"
								:value="item.cate"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="标签">
						<el-select 
						 	multiple
    						collapse-tags
							v-model="form.tag" 
							placeholder="请选择标签">
							<el-option v-for="(item,index) in tagsArr"
								:key="index"
								:label="item.tag"
								:value="item.tag"></el-option>
							</el-select>
					</el-form-item>

					<el-form-item label="置顶">
						<el-select v-model="form.top" placeholder="请选择状态">
							<el-option label="否" value="false"></el-option>
							<el-option label="是" value="true"></el-option>
						</el-select>
					</el-form-item>		

					<el-form-item label="发布日期">
						<el-date-picker
							v-model="form.time"
							type="datetime"
							placeholder="选择日期时间">
							</el-date-picker>
					</el-form-item>						
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="文章标题">
						<el-input v-model="form.title" placeholder="文章标题" class="w-title"></el-input>
					</el-form-item>

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

				categoryArr: [],
				tagsArr: [],

				form: {
					category: '',
					tag: '',
					top: '',
					time: '',
					title: ''
				}
			}
		},
		created() {

			console.log( this.$route.params.articid )

			if( this.$route.params.articid ){
				this.axiosGetArticles()
			}

			this.axiosGetCategory();
			this.axiosGetTags();

		},
		methods: {

			// 获取文章
			axiosGetArticles() {
				let data = {
					id: this.$route.params.articid
				}
				getArticlesById( data ).then(res => {
					console.log( res.data );
					this.modifyArtic = res.data[0];

					this.form.category = this.modifyArtic.category;
					this.form.tag = this.modifyArtic.tags;
					this.form.top = this.modifyArtic.top;
					this.form.time = this.modifyArtic.upload_time;
					this.form.title = this.modifyArtic.title;

					this.markdownContent = this.modifyArtic.markdown;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 获取分类数据
			axiosGetCategory() {
				getCategory().then(res => {
					this.categoryArr = res.data;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 获取标签数据
			axiosGetTags() {
				getTags().then(res => {
					this.tagsArr = res.data;
				}).catch(error => {
					console.log(error) // for debug
				})
			},

			// 发布文章
			saveBlog(value, render) {
				let artic = {
					id: this.modifyArtic.id,
					title: this.form.title,
					markdown: value,
					render: render,
					category: this.form.category,
					tags: this.form.tag,
					upload_time: new Date(this.form.time).getTime(),
					read_num: 0,
					author: 'hemin',
					top: this.form.top
				};
				let data = {
					artic: artic
				}

				// 发布新文章
				if( !this.modifyArtic.id ){
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
				// 跟新文章
				else {
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