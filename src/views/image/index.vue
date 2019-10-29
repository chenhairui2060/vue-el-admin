<template>
	<div>
		<el-container style="position: absolute;top: 55px ;left: 0;right: 0; bottom: 0;">
			<!-- 头部 -->
			<el-header class="d-flex align-items-center border-bottom">
				<div class="d-flex mr-auto">
					<el-select class="mr-2" placeholder="请选择图片排列方式" v-model="searchForm.order" size="mini" style="width: 150px;">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-input placeholder="请输入相册名称" class="mr-2" size="mini" style="width: 150px;"></el-input>
					<el-button v-model="searchForm.kywords" type="success" size="mini">搜索</el-button>
				</div>
				<el-button type="success" size="mini" @click="openAblumModal()">创建相册</el-button>
				<el-button type="warning" size="mini" @click="uploadModel">上传图片</el-button>
			</el-header>
			<el-container>
				<!-- 侧边 相册列表-->
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top:60px;left: 0;bottom: 60px;">
					<ul class="list-group">
						<image-item 
						:ablumsIndex="ablumsIndex"
						@openAblumModal="openAblumModal"
						@delAblums="delAblums"
						:ablums="ablums" @changeAblums="changeAblums"></image-item>
					</ul>
				</el-aside>
				<el-container>
					<!-- 主布局 -->
					<el-main style="position: absolute;top:60px;bottom: 60px;right: 0;left: 200px;">
							<el-row :gutter="10">
							  <el-col  :span="24" :lg="4" :md="6" :sm="12" v-for="o in 100" :key="o">
								  <el-card 
								  :body-style="{padding:0}"
								  class="box-card mb-2">
								    <div  class="text item ">
									<div class="position-relative">
										<img src="http://img4.imgtn.bdimg.com/it/u=2350302849,3323337377&fm=26&gp=0.jpg" class="w-100" style="height: 100px;"/>
										<div style="background:rgba(0,0,0,.2);color: #FFFFFF;position: absolute;left: 0;bottom: 0;z-index: 99;width: 100%;">
																				  123
										</div>
									</div>		      
									  <div class="p-2 text-center">
										  <el-button-group>
										    <el-button size="mini"
											@click="previewImage"
											icon="el-icon-view"></el-button>
										    <el-button size="mini" icon="el-icon-edit"></el-button>
										    <el-button size="mini" icon="el-icon-delete"></el-button>
										  </el-button-group>
									  </div>
								    </div>
								  </el-card>
							  </el-col>
							</el-row>
						
					</el-main>
				</el-container>
			</el-container>
			<el-footer>Footer</el-footer>
		</el-container>
		<!-- 修改新建相册 -->
		<ablum-modal
		 :numdisabled="!!ablumEditindex"
		 :ablumModal="ablumModal" v-model="ablumModal" @oncilckConfirm="oncilckConfirm" :ablumForm="ablumForm" :modalTitle="modalTitle"></ablum-modal>
		 <!-- 上传图片 -->
		 <upload-img :uploadModal="uploadModal" v-model="uploadModal"></upload-img>
		 <preview-model :previewModel="previewModel" v-model="previewModel"></preview-model>
	</div>
</template>

<script>
import ablumModal from '@/components/image/ablumModal.vue';
import imageItem  from '@/components/image/image-item.vue';
import uploadImg from "@/components/image/uploadImg.vue";
import previewModel from "@/components/image/previewModel.vue"
export default {
	components: {
		ablumModal,
		imageItem,
		uploadImg,
		previewModel
	},
	data() {
		return {
			searchForm: {
				order: '',
				kywords: ''
			},
			modalTitle: '修改相册',
			ablumsIndex: 0,
			ablumEditindex: -1,
			ablums: [],
			ablumModal: false, //控制模态框显示隐藏
			ablumForm: {
				name: '',
				order: 0
			},
			formLabelWidth: '120px',
			uploadModal:false,
			previewModel:false
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			for (let i = 0; i < 20; i++) {
				this.ablums.push({
					name: '相册' + i,
					order: Math.floor(Math.random() * 100)
				});
			}
		},
		//切换相册
		changeAblums(index) {
			console.log(index)
			this.ablumsIndex = index;
		},
		//删除相册
		delAblums(index) {
			console.log(index);
			this.$confirm('是否删除该相册?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.ablums.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//修改增加相册/创建框
		openAblumModal(obj) {
			console.log(obj);
			if (obj) {
				//解构赋值
				let { item, index } = obj;
				//初始化表单
				this.ablumForm.name = item.name;
				this.ablumForm.order = item.order;
				this.ablumEditindex = index;
				this.modalTitle = '修改相册';
				//打开模态框
				return (this.ablumModal = true);
			}
			this.ablumForm = {
				name: '',
				order: 0
			};
			this.modalTitle = '创建相册';
			this.ablumEditindex = -1;
			this.ablumModal = true;
		},
		oncilckConfirm(options) {
			if (this.ablumEditindex > -1) {
				this.ablums[this.ablumEditindex].name = options.name;
				this.ablums[this.ablumEditindex].order = options.order;
				return;
			}
			if (options.name == '')
				return this.$message({
					type: 'info',
					message: '相册名不能为空'
				});
			this.ablums.unshift({
				name: options.name,
				order: options.order
			});
			// console.log('用户点击了确认')
		},
		//上传图片
		uploadModel(){
			this.uploadModal=!this.uploadModal;
		},
		//预览图片
		previewImage(){
			console.log('预览')
			this.previewModel=true
		}
	}
};
</script>

<style scoped>
{
	position: relative;
}
</style>
