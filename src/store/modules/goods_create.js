import $Util from "@/common/util.js"
// 创建商品
export default {
	state: {
		sku_type: 0, //单规格，多规格
		title: '', //商品名称
		category: [], //商品分类
		desc: '', //商品描述
		unit: '', //商品单位
		stock: 0, //总库存
		min_stock: 0, //预警库存
		display_stock: 0, //库存显示
		status: 0, //是否上架
		express: '', //运费模块
		oprice: 0, //市场价格
		pprice: 0, //销售价格
		cprice: 0, //成本价格
		weight: 0, //重量
		volume: 0, //体积
		//增加卡片
		sku_card: [{
				name: "颜色", //规格名称
				type: 0, //规格类型 0无 1颜色 2图片
				list: [{
						name: '黄色',
						image: '',
						color: ''
					},
					{
						name: '红色',
						image: '',
						color: ''
					}
				]
			},
			{
				name: "规格", //规格名称
				type: 0, //规格类型 0无 1颜色 2图片
				list: [{
						name: 'xl',
						image: '',
						color: ''
					},
					{
						name: 'xxl',
						image: '',
						color: ''
					}
				]
			}
		],
		//表头
		ths: [{
				name: '商品规格',
				rowspan: 1,
				colspan: 2,
				with: ''
			},
			{
				name: 'sku图片',
				rowspan: 2,
				with: '60'
			},
			{
				name: '销售价',
				rowspan: 2,
				with: '100'
			},
			{
				name: '市场价',
				rowspan: 2,
				with: '100'
			},
			{
				name: '成本价',
				rowspan: 2,
				with: '100'
			},
			{
				name: '库存',
				rowspan: 2,
				with: '100'
			},
			{
				name: '体积',
				rowspan: 2,
				with: '100'
			},
			{
				name: '重量',
				rowspan: 2,
				with: '100'
			},
			{
				name: '编码',
				rowspan: 2,
				with: '100'
			},
		]
	},
	getters: {
		skuLables(state) {
			return state.sku_card.filter(v => v.list.length > 0)
		},
		//获取表头
		tableThs(state, getters) {
			let length = getters.skuLables.length;
			state.ths[0].rowspan = length > 0 ? "1" : "2";
			state.ths[0].colspan = length;
			return state.ths
		},
		// 获取规格表格数据
		tableData(state) {
			// 当前是否有规格卡片
			if (state.sku_card.length === 0) {
				return [];
			}
			let sku_list = []
			for (var i = 0; i < state.sku_card.length; i++) {
				if (state.sku_card[i].list.length > 0) {
					sku_list.push(state.sku_card[i].list)
				}
			}
			if (sku_list.length === 0) {
				return []
			}
			let arr = $Util.cartesianProductOf(...sku_list)
			return arr.map(v => {
				let obj = {
					skus: [],
					image: "", // sku图片
					pprice: 0, // 销售价格
					oprice: 0, // 市场价格
					cprice: 0, // 成本价格
					stock: 0,
					volume: 0,
					weight: 0,
					code: ''
				}
				obj.skus = v
				return obj
			})
		}
	},
	mutations: {
		//修改state
		vModelState(state, {
			key,
			value
		}) {
			console.log(key, value)
			// console.log(state)
			state[key] = value
		},
		//增加规格卡片
		addSkuCard(state) {
			state.sku_card.push({
				name: '规格名称',
				type: 0,
				list: []
			})
		},
		//删除规格卡片
		delSkuCard(state, index) {
			state.sku_card.splice(index, 1)
		},
		//修改规格卡片值
		vModelSkuCard(state, {
			key,
			index,
			value
		}) {
			// console.log(key,index,value)
			state.sku_card[index][key] = value
		},
		//规格卡片排序
		sortSkuCard(state, {
			action,
			index
		}) {
			console.log(action, index)
			//上移  操作 ，下标
			$Util[action](state.sku_card, index)
		},
		//增加指定规格卡片的规格属性
		addSkuVulue(state, index) {
			state.sku_card[index].list.push({
				name: '规格名称',
				image: '',
				color: ''
			})
		},
		//删除指定规格卡片属性cardIndex卡片索引  valueIndex
		delSkuValue(state, {
			cardIndex,
			valueIndex
		}) {
			state.sku_card[cardIndex].list.splice(valueIndex, 1)
		},
		//修改指定规格卡片的规格属性  
		updateSkuValue(state, {
			cardIndex,
			valueIndex,
			key,
			value
		}) {
			state.sku_card[cardIndex].list[valueIndex][key] = value;
		},
		//排序规格卡片的规格列表修改
		sortSkuValue(state, {
			index,
			value
		}) {
			state.sku_card[index].list = value;
			console.log(state.sku_card[index])
		}
	},
	actions: {

	}
}
