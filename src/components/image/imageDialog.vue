<template>
	
	<el-dialog title="图片管理" :visible.sync="imageModel" width="80%">
		<el-container style="position: relative;height: 60vh;">
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
			</el-header>
			<el-container>
				<!-- 侧边 相册列表-->
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top:60px;left: 0;bottom: 60px;">
					<ul class="list-group">
						<image-item
						 :showOptions="false"
						 :ablumsIndex="ablumsIndex"   :ablums="ablums" @changeAblums="changeAblums"></image-item>
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
		<div slot="footer" class="dialog-footer">
			<el-button @click="hide">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import imageItem from '@/components/image/image-item.vue';
	export default{
		props:{
			max:{
				type:Number,
				default:9
			}
		},
		components:{
			imageItem
		},
		data() {
			return {
				imageModel:false,
				callback:false,
				//弹窗数据
				searchForm: {
					order: '',
					kywords: ''
				},
				ablumsIndex: 0,
				ablums: [],
				imageList: [],
				//选中列表
				chooseList: [],
				currentPage4: 1
			};
		},
		created() {
			this.init();
		},
		methods:{
			//隐藏弹窗
			hide(){
				this.imageModel=false;
				this.callback=false;
			},
			//打开弹窗  callback传过来的函数  空函数
			chooseImage(callback){
				this.unChoose()
				this.callback=callback;
				this.imageModel=true;
			},
			//确定
			confirm(){
				//拿到图片路径
				if(typeof this.callback==='function'){
					this.callback(this.chooseList)
				}
				//隐藏弹窗
				this.hide()
			},
			init() {
				for (let i = 0; i < 20; i++) {
					this.ablums.push({
						name: '相册' + i,
						order: Math.floor(Math.random() * 100)
					});
					this.imageList.push({
						id: i,
						name: '相册' + i,
						url: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d985fb87d81b0ef473e89e5eedc551a1/b151f8198618367aa7f3cc7424738bd4b31ce525.jpg',
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
			//删除图片
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
				console.log(this.max)
				if (!item.ischeck) {
					if(this.chooseList.length>=this.max){
						this.$message({
							type: 'warning',
							message: '只能选择'+this.max+'张图片'
						});
						return;
					}
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
			//清除选中
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
				})
			}
		}
	}
</script>

<style>
</style>
