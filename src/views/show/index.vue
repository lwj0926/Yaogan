<template>
  <div class="show">
    <header-group></header-group>
    <div class="form-wrap">
      <el-button type="primary" class="zhankai" :icon="showindex ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'" @click="showindex = !showindex"> </el-button>
      <el-form class="chanpin" v-show="showindex" style="margin-top: 20px" :rules="rules" ref="formref" :model="form" label-width="100px">
        <el-form-item label="数据集:" prop="dataset">
          <el-cascader style="width: 400px" :options="options" v-model="form.dataset" placeholder="请选择数据集" :show-all-levels="false" :props="{ expandTrigger: 'hover' }" @change="handleChange"> </el-cascader>
        </el-form-item>
        <el-form-item label="时间范围:" prop="daterange">
          <el-date-picker style="width: 400px" v-model="form.daterange" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="空间位置:" prop="f_lon">
          <el-col :span="11">
            <el-form-item prop="f_lon" style="margin-bottom: 0"><el-input style="margin-left: 0px; width: 100%" v-model="form.f_lon" placeholder="请输入起始经度"></el-input></el-form-item>
          </el-col>
          <el-col style="margin-left: 10px" class="line" :span="1">--</el-col>
          <el-col :span="11">
            <el-form-item prop="s_lon" style="margin-bottom: 0"> <el-input style="margin-left: 0px; width: 100%" v-model="form.s_lon" placeholder="请输入终止经度"></el-input></el-form-item
          ></el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="11">
            <el-form-item prop="f_lat" style="margin-bottom: 0"><el-input style="margin-left: 0px; width: 100%" v-model="form.f_lat" placeholder="请输入起始纬度"></el-input></el-form-item
          ></el-col>
          <el-col style="margin-left: 10px" class="line" :span="1">--</el-col>
          <el-col :span="11">
            <el-form-item prop="s_lat" style="margin-bottom: 0"> <el-input style="margin-left: 0px; width: 100%" v-model="form.s_lat" placeholder="请输入终止纬度"></el-input></el-form-item
          ></el-col>
        </el-form-item>
        <el-button type="primary" style="margin-left: 100px" @click="onSubmit('formref')">加载地图</el-button>
      </el-form>
    </div>
    <open-map :data.sync="form" :url="url" :layer-name="layerName" :dates="dates"></open-map>
  </div>
</template>
 <script >
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import HeaderGroup from '@/components/header'
import OpenMap from '@/components/showmap'
import { pickerOptions } from '@/utils/options'
import { parseDate } from '@/utils'
import { fetchProductList, fetchProductRange } from '@/api'

export default {
  components: {
    HeaderGroup,
    OpenMap
  },
  data() {
    return {
      radio: 2,
      showindex: true,
      pickerOptions,
      productList: [],
      url: '',
      layerName: '',
      dates: [],
      // form: {
      //   dataset: ['musyq_npp_1km', 'NPP/DataSet_NPP'],
      //   daterange: [new Date(2014, 1, 1), new Date(2014, 11, 1)],
      //   f_lon: '8591597.03468111',
      //   f_lat: '15254459.916243354',
      //   s_lon: '1954822.810721418',
      //   s_lat: '7384909.300100339'
      // },
      form: {
        dataset: [],
        daterange: [],
        f_lon: '',
        f_lat: '',
        s_lon: '',
        s_lat: ''
      },
      rules: {
        dataset: [{ required: true, message: '请输入数据集', trigger: 'blur' }],
        daterange: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
        f_lon: [{ required: true, message: '请输入起始经度', trigger: 'blur' }],
        f_lat: [{ required: true, message: '请输入终止经度', trigger: 'blur' }],
        s_lon: [{ required: true, message: '请输入起始纬度', trigger: 'blur' }],
        s_lat: [{ required: true, message: '请输入终止纬度', trigger: 'blur' }]
      }
    }
  },
  watch: {
    // currentIndex(val) {
    //   // console.log(val)
    //   this.value = (100 * (val + 1)) / this.dates.length
    //   console.log('currentIndex', val)
    //   console.log('value', this.value)
    // }
  },
  computed: {
    options() {
      const arr = []
      this.productList.forEach(p => {
        const temp = {
          value: p.product,
          label: p.product,
          children: []
        }
        p.dataset.forEach(d => {
          temp.children.push({
            value: d.dataset,
            label: d.dataset
          })
        })
        arr.push(temp)
      })
      return arr
    }
  },

  mounted() {},
  created() {
    this.fetchProductList()
  },
  methods: {
    async fetchProductList() {
      const res = await fetchProductList()
      this.productList = res.data
    },

    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { dataset, daterange, lon, lat } = this.form
          const query = {
            product_name: dataset[0],
            start: parseDate(daterange[0]),
            end: parseDate(daterange[1])
          }
          const res = await fetchProductRange(query)
          this.dates = res.data

          // console.log(this.dates, this.dates.length)
          if (this.dates.length === 0) {
            this.isShow = false
            this.$message('当前选择没有数据')
          } else {
            this.getDatasetInfo()
          }
        } else {
          return false
        }
      })
    },
    getDatasetInfo() {
      const dataset = this.form.dataset[1]
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i]
        for (let j = 0; j < product.dataset.length; j++) {
          const item = product.dataset[j]
          if (item.dataset === dataset) {
            this.url = item.url
            this.layerName = item.layers
            return
          }
        }
      }
    },
    handleChange(arr) {
      // const dataset = arr[1]
      // for (let i = 0; i < this.productList.length; i++) {
      //   const product = this.productList[i]
      //   for (let j = 0; j < product.dataset.length; j++) {
      //     const item = product.dataset[j]
      //     if (item.dataset === dataset) {
      //       this.url = item.url
      //       this.layerName = item.layers
      //       return
      //     }
      //   }
      // }
    }
  }
}
</script>
 <style lang="scss" scoped>
.header {
  position: absolute;
  z-index: 2;
  width: 100%;
}

.form-wrap {
  position: absolute;
  top: 95px;
  left: 40px;
  z-index: 999;
}
.chanpin {
  width: 550px;
  background-color: #ffffff;
  // position: absolute;

  padding: 20px;
}
.but-title {
  width: 100px;
  text-align: center;
}
.zhankai {
  position: absolute;
  right: -44px;
  top: 20px;
  // width: 30px;
  // z-index: 1000;
  // align-items: center;
  // vertical-align: center;
  // display: flex;
  text-align: center;
  // padding: 10px 0;
  border-radius: 0;
}
.contain {
  height: 30px;
  width: 100%;
  display: flex;
  margin-top: 35px;
  text-align: center;
}
.low-contain {
  height: 35px;
  width: 100%;
}
.el-input {
  width: 169px;
  margin-left: 10px;
  margin-right: 10px;
}
// span {
//   padding-left: 10px;
//   padding-right: 10px;
//   padding-top: 10px;
// }
.small {
  width: 80px;
}
.map {
  width: 100%;
  height: 100vh;
}

a.skiplink {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
a.skiplink:focus {
  clip: auto;
  height: auto;
  width: auto;
  background-color: #fff;
  padding: 0.3em;
}
#map:focus {
  outline: #4a74a8 solid 0.15em;
}
</style>