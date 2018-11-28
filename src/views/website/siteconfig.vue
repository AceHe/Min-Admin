<template>
	<div class="site-container">
		<el-form ref="form" :model="form" label-width="80px">

			<el-collapse v-model="activeName" accordion>
				<el-collapse-item title="个人信息" name="1">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="昵称:">
								<el-input 
									v-model="form.userName"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="Slogan:">
								<el-input 
									v-model="form.slogan"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="头像:">
								<el-input 
									v-model="form.avatar"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="简介:">
								<el-input 
									v-model="form.intro"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="爱好:">
								<el-input 
									v-model="form.hobby"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="技能:">
								<el-input 
									v-model="form.skills"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="标签:">
								<el-input 
									v-model="form.tag"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="地址:">
								<el-input 
									v-model="form.address"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-collapse-item>

				<el-collapse-item title="网站配置" name="2">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="网站名称:">
								<el-input 
									v-model="form.siteName"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="Follower:">
								<el-input 
									v-model="form.follower"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="Following:">
								<el-input 
									v-model="form.following"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-collapse-item>

				<el-collapse-item title="站外链接" name="3">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="Email:">
								<el-input 
									v-model="socals.email"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="github:">
								<el-input 
									v-model="socals.github"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="掘金:">
								<el-input 
									v-model="socals.juejin"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="网易云:">
								<el-input 
									v-model="socals.music"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="QQ群:">
								<el-input 
									v-model="socals.qq"
									:disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-collapse-item>
			</el-collapse>

			<el-row :gutter="10">
				<el-col :span="24">
					<el-form-item>
						<el-button type="primary"
							v-if="isDisabled"
							@click="modifyWebsiteConfig">修改</el-button>
						<el-button type="primary"
							v-else
							@click="saveConfig">保存</el-button>
						<el-button>重置</el-button>
					</el-form-item>
				</el-col>				
			</el-row>

		</el-form>
	</div>
</template>

<script>
	import { websiteConfig, getWebsite } from '@/api/blog/website'

	export default {
		name: '',
		data() {
			return {
				activeName: '1',
				isDisabled: false,

				form: {
					siteName: '', 	// 网站名称
					userName: '', 	// 昵称
					slogan: '', 	// Slogan
					avatar: '', 	// 头像
					intro: '', 		// 简介
					hobby: '', 		// 爱好
					skills: '', 	// 技能
					tag: '', 		// 标签
					address: '', 	// 地址
					follower: '', 	// Follower
					following: '', 	// Following
					socals: []
				},

				socals: {
					email: '',
					github: '',
					juejin: '',
					music: '',
					qq: ''
				}
					
			}
		},
		created(){
			this.axiosGetWebsite();
		},
		methods: {
			// 
			axiosWebsiteConfig() {
				console.log( this.form )
				websiteConfig( this.form ).then(res => {
					if( res.code == 0 ){
						this.$notify.success({
							title: '成功',
							message: res.message
						});
						this.isDisabled = true;
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

			axiosGetWebsite() {
				getWebsite().then(res => {
					if( res.code == 0 ){
						if( !res.data ) return;
						this.form = res.data;
						for( let item of res.data.socals ){
							var key = item.icon == 'netease-music' ? 'music' : item.icon;
							this.$set( this.socals, key, item.url)
						}
						this.isDisabled = true;
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

			saveConfig(){

				this.form.socals = [];
				for( let item in this.socals ){
					var obj = {
						url: this.socals[item],
						title: this.socals[item],
						icon: item == 'music' ? 'netease-music' : item
					}
					this.form.socals.push( obj )
				}			

				this.axiosWebsiteConfig();
			},

			modifyWebsiteConfig(){
				this.isDisabled = false;
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