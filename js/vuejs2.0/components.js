
var rateTemplate = '<div data-hasclick="true" class="rate-wrapper" :class="startStyle"><span class="rate-item" v-for="(item, index) in classItem" :key="index" :class="item" @click="setClassItem(index)"></span></div>';

var circleTemplate = `<svg :class="color" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" :width="width" :height="height">
				<circle class="circle" cx="50" cy="50" r="50" stroke="#EEEEEE" fill="transparent" />
				<circle class="circle circle-on" cx="50" cy="50" r="50" stroke-dasharray="314" :stroke-dashoffset="circleProcess" fill="transparent" />
				<text class="svg-text" x="50" y="50" lengthAdjust="spacingAndGlyphs" :font-size="fontSize">
					<slot></slot>
				</text>
			</svg> `

var VueComponents = {
	rate: function() {
		// 评分插件
		Vue.component('rate', {
			template: rateTemplate,
			props: {
				score: Number,
				size: {
					type: String,
					default: 'lager'
				},
				setStar: {
					type: Boolean,
					default: true
				}
			},
			computed: {
				startStyle: function() {
					var ret = this.size === 'small' ? 'sm-rate' : ''
					return ret
				},
				classItem: function() {
					let starCount = 5;
					let result = [];
					const STAR_HALT = 'star-half';
					const STAR_ON = 'star-on';
					const STAR_OFF = 'star-off';
					let score = Math.floor(this.score * 2) / 2; // 四舍五入取整
					let hasDecimal = score % 1 !== 0; // 判断是否有小数点
					score = Math.floor(score);
					// 先判断满星的个数
					for (let i = 0; i < score; i++) {
						result.push(STAR_ON);
					}

					// 再计算半星的个数,只有一个
					if (hasDecimal) {
						result.push(STAR_HALT);
					}

					// 最后计算没有星的个数
					while (result.length < starCount) {
						result.push(STAR_OFF);
					}

					return result;
				}
			},
			methods: {
				setClassItem: function(index) {
					if (this.setStar) {
						this.$emit('update:score', index + 1);
					}
				}
			}
		});
	},
	circleProcess: function() {
		// 圆环
		Vue.component('circle-process', {
			template: circleTemplate,
			props: {
				score: Number,
				fontSize: {
					type: Number,
					default: 22
				},
				color: String,
				width: {
					type: String,
					default: '100%'
				},
				height: {
					type: String,
					default: '100%'
				},
				allCount: {
					type: Number,
					default: 5
				}
			},
			computed:  {
				circleProcess: function() {
					return ( 1 - this.score / this.allCount) * 314;
				}
			}
		});
	}
}