<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item, index) in counts" :key="index">
				<el-card class="box-card" shadow="hover">
					<div class="d-flex align-items-center">
						<i class="bg-primary h4 mb-0 text-white mr-3" :class="[item.icon, item.color]" style="height: 40px;width: 40px;line-height: 40px;text-align: center;"></i>
						<div>
							<h4>{{ item.num }}</h4>
							<small class="text-muted">{{ item.desc }})</small>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 商铺，订单提示|统计图 -->
		<el-row :gutter="20" class="my-3">
			<!-- -- 商铺，订单提示 -->
			<el-col :span="12" style="height: 370px; justify-content: space-between;" class="d-flex flex-column">
				<el-card class="box-card" shadow="never" v-for="(items, index) in tips" :key="index">
					<div slot="header" class="clearfix">
						<span>{{ items.title }}</span>
						<el-button style="float: right; padding: 3px 0" type="text">{{ items.desc }}</el-button>
					</div>
					<div class="row">
						<div :class="items.list.length | getCol" v-for="(item, idx) in items.list" :key="idx">
							<button class="btn btn-light w-100">
								<h4 class="mb-1">{{ item.value }}</h4>
								<small class="text-muted">{{ item.name }}</small>
							</button>
						</div>
					</div>
				</el-card>
			</el-col>
			<!-- 统计图 -->
			<el-col :span="12">
				<el-card class="box-card" style="height: 370px;" shadow="never">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<!-- 统计图容器 -->
					<div ref="myChart" style="width: 100%;height: 270px;"></div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 销量情况统计|单品销售排名 -->
		<el-row :gutter="20" class="mt-3" >
			<el-col :span="12">
				<el-card class="box-card"   style="height: 301px;">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div class="media border align-items-center mb-2">
						<span class="py-4 px-3 bg-light border-right">昨日销量</span>
						<div class="media-body h-100">
							<div class="border-bottom  align-items-center py-1 pl-1">
								<span>订单量(件)</span>
								12
							</div>
							<div class="py-1  pl-1">
								<span>订单量(件)</span>
								12
							</div>
						</div>
					</div>
					<div class="media border align-items-center" >
						<span class="py-4 px-3 bg-light border-right">昨日销量</span>
						<div class="media-body">
							<div class="border-bottom  py-1 pl-1">
								<span>订单量(件)</span>
								12
							</div>
							<div class=" py-1 pl-1">
								<span>订单量(件)</span>
								12
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>		
					</div>
					<el-table :data="tableData3" height="200" border style="width: 100%">
						<el-table-column type="index" label="#" width="50"></el-table-column>
						<el-table-column prop="name" label="商品信息" ></el-table-column>
						<el-table-column prop="num" label="销量" width="50"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import echarts from 'echarts';
export default {
	data() {
		return {
			counts: [
				{ icon: 'el-icon-user-solid', num: 30, desc: '关注人数(个)', color: 'bg-primary' },
				{ icon: 'el-icon-s-finance', num: 30, desc: '订单总数(笔)', color: 'bg-success' },
				{ icon: 'el-icon-s-order', num: 30, desc: '今日订单总金额(元)', color: 'bg-danger' },
				{ icon: 'el-icon-s-data', num: 30, desc: '本月销量(笔)', color: 'bg-warning' }
			],
			tips: [
				{
					title: '店铺及商品提示',
					desc: '需要关注的店铺信息及处理事项',
					list: [
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						}
					]
				},
				{
					title: '店铺及商品提示',
					desc: '需要关注的店铺信息及处理事项',
					list: [
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						},
						{
							name: '出售中',
							value: '64'
						}
					]
				}
			],
			tableData3: [
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				},
				{
					name: '小天鹅(LittleSwan) 滚筒洗衣机...',
					num: 9
				}
			]
		};
	},
	filters: {
		getCol: function(total) {
			return `col-${12 / total}`;
		}
	},
	methods: {
		drowLine() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(this.$refs.myChart);
			var option = {
				title: {},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '邮件营销',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '联盟广告',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '视频广告',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '直接访问',
						type: 'line',
						stack: '总量',
						areaStyle: { normal: {} },
						data: [320, 332, 301, 334, 390, 330, 320]
					},
					{
						name: '搜索引擎',
						type: 'line',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						areaStyle: { normal: {} },
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	},
	//dom渲染完毕
	mounted() {
		//画统计图
		this.drowLine();
	}
};
</script>

<style scoped></style>
