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
				<el-button type="warning" 
				@click="unChoose"
				size="mini" v-if="chooseList.length">取消选中</el-button>
				<el-button type="danger" size="mini" v-if="chooseList.length" @click="imageDel({ all: true })">批量删除</el-button>
				<el-button type="success" size="mini" @click="openAblumModal()">创建相册</el-button>
				<el-button type="warning" size="mini" @click="uploadModel">上传图片</el-button>
			</el-header>
			<el-container>
				<!-- 侧边 相册列表-->
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top:60px;left: 0;bottom: 60px;">
					<ul class="list-group">
						<image-item :ablumsIndex="ablumsIndex" @openAblumModal="openAblumModal" @delAblums="delAblums" :ablums="ablums" @changeAblums="changeAblums"></image-item>
					</ul>
				</el-aside>
				<el-container>
					<!-- 主布局 -->
					<el-main style="position: absolute;top:60px;bottom: 60px;right: 0;left: 200px;">
						<el-row :gutter="10">
							<el-col v-for="(item, index) in imageList" :key="index" :span="24" :lg="4" :md="6" :sm="12">
								<el-card :body-style="{ padding: 0 }" class="box-card mb-2">
									<div class="text item border" :class="{ 'border-danger': item.ischeck }">
										<div class="position-relative">
											<span v-if="item.ischeck" class="badge badge-danger" style="position: absolute;top: 0;right: 0;">{{ item.checkOrder }}</span>
											<img :src="item.url" class="w-100" style="height: 100px;" @click="chooseItem(item)" />
											<div
												style="background:rgba(0,0,0,.2);color: #FFFFFF;position: absolute;left: 0;bottom: 0;z-index: 99;width: 100%; font-size: 14px;text-indent: 5px;"
											>
												{{ item.name }}
											</div>
										</div>
										<div class="p-2 text-center">
											<el-button-group>
												<el-button size="mini" @click="previewImage(item)" icon="el-icon-view"></el-button>
												<el-button @click="imageEdit(item, index)" size="mini" icon="el-icon-edit"></el-button>
												<el-button size="mini" icon="el-icon-delete" @click="imageDel({ index })"></el-button>
											</el-button-group>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
			</el-container>
			<el-footer class="d-flex border-top align-items-center px-0">
				<div class="d-flex  align-items-center justify-content-center border-right h-100" style="width: 200px;flex-shrink: 0;">
					<!-- 底部 -->
					<el-button-group>
						<el-button size="mini" icon="el-icon-arrow-left">上一页</el-button>
						<el-button size="mini">
							下一页
							<i class="el-icon-arrow-right el-icon--right"></i>
						</el-button>
					</el-button-group>
				</div>
				<div style="flex: 1;" class="px-3">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage4"
						:page-sizes="[100, 200, 300, 400]"
						:page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
						:total="400"
					></el-pagination>
				</div>
			</el-footer>
		</el-container>
		<!-- 修改新建相册 -->
		<ablum-modal
			:numdisabled="!!ablumEditindex"
			:ablumModal="ablumModal"
			v-model="ablumModal"
			@oncilckConfirm="oncilckConfirm"
			:ablumForm="ablumForm"
			:modalTitle="modalTitle"
		></ablum-modal>
		<!-- 上传图片 -->
		<upload-img :uploadModal="uploadModal" v-model="uploadModal"></upload-img>
		<preview-model :previewUrl="previewUrl" :previewModel="previewModel" v-model="previewModel"></preview-model>
	</div>
</template>

<script>
import ablumModal from '@/components/image/ablumModal.vue';
import imageItem from '@/components/image/image-item.vue';
import uploadImg from '@/components/image/uploadImg.vue';
import previewModel from '@/components/image/previewModel.vue';
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
			uploadModal: false,
			previewModel: false,
			previewUrl: '',
			imageList: [],
			//选中列表
			chooseList: [],
			currentPage4: 1
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
				this.imageList.push({
					id: i,
					name: '相册' + i,
					url: 'http://img1.imgtn.bdimg.com/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
					ischeck: false,
					checkOrder: 0
				});
			}
		},
		//切换相册
		changeAblums(index) {
			console.log(index);
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
		uploadModel() {
			this.uploadModal = !this.uploadModal;
		},
		//预览图片
		previewImage(item) {
			console.log('预览', item);
			this.previewUrl = item.url;
			this.previewModel = true;
		},
		//修改图片名称
		imageEdit(item, index) {
			this.$prompt('请输入新名称', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValue: item.name,
				inputValidator(val) {
					if (val === '') {
						return '相册名称不能为空';
					}
				}
			})
				.then(({ value }) => {
					item.name = value;
					this.$message({
						type: 'success',
						message: '修改名称成功！'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
		},
		//删除相册
		imageDel(obj) {
			console.log(obj);
			this.$confirm(obj.all ? '是否删除选中相册' : '是否删除该相册?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					if (obj.all) {
						let list = this.imageList.filter(img => {
							return !this.chooseList.some(val => {
								return val.id == img.id;
							});
						});
						this.imageList = list;
						this.chooseList = [];
					} else {
						this.imageList.splice(obj.index, 1);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//选择当前
		chooseItem(item) {
			//选中图片
			if (!item.ischeck) {
				this.chooseList.push({
					id: item.id,
					url: item.url
				});
				//计算序号
				item.checkOrder = this.chooseList.length;
				item.ischeck = true;
				return;
			}
			//取消选中
			let i = this.chooseList.findIndex(v => v.id === item.id);
			if (i === -1) return;
			//重新计算序号
			let length = this.chooseList.length;
			//取消选中中间部分
			if (i + 1 < length) {
				//重新计算 imageList选中的序列号
				for (let j = i; j < length; j++) {
					let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id);
					// console.log(no)
					if (no > -1) {
						this.imageList[no].checkOrder--;
					}
				}
			}
			//删除
			this.chooseList.splice(i, 1);
			//更新状态
			item.ischeck = false;
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		unChoose(){
			this.imageList.forEach(img=>{
				// console.log(img)
				let iIdx=this.chooseList.findIndex(item=>{
					return item.id==img.id
				})
				if(iIdx>-1){
					//取消选中样式,checkOrder清零
					img.ischeck=false;
					img.checkOrder=0;
					//从chooseList中清除
					this.chooseList.splice(iIdx,1);
				}
				console.log(iIdx)
			})
		}
	}
};
</script>

<style scoped></style>
