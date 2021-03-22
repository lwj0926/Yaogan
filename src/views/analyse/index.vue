<template>
  <div>
    <header-group></header-group>
    <div class="container-box">
      <div class="container-box-top">
        <div class="chanpin">
          <el-form style="margin-top: 20px" :rules="rules" ref="formref" :model="form" label-width="100px">
            <el-form-item label="数据集:" prop="dataset">
              <el-cascader style="width: 350px" :options="options" v-model="form.dataset" placeholder="请选择数据集" :show-all-levels="false" :props="{ expandTrigger: 'hover' }"> </el-cascader>
            </el-form-item>
            <el-form-item label="时间范围:" prop="daterange">
              <el-date-picker v-model="form.daterange" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </el-form-item>
            <el-form-item label="空间位置:" prop="lon">
              <el-input style="width: 350px" v-model="form.lon" placeholder="请输入经度"></el-input>
            </el-form-item>
            <el-form-item label="" prop="lat">
              <el-input style="width: 350px" v-model="form.lat" placeholder="请输入纬度"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left: 140px; width: 100px" @click="onSubmit('formref')">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="map-box">
          <open-map :data.sync="form"></open-map>
        </div>
      </div>
      <h4>分析结果</h4>
      <point-chart :serie-name="form.dataset.length ? form.dataset[1] : ''" :daterange="form.daterange" :chart-data="resultList"></point-chart>
      <!-- <div class="p-line"></div> -->
      <!-- <img src="/img/u1024.png" v-show="!showpicture" />
      <div class="result" v-show="showpicture">
        <point-chart style="margin: 0px"></point-chart>
      </div> -->
    </div>
  </div>
</template>
 <script >
import HeaderGroup from '@/components/header'
import OpenMap from '@/components/map'
import PointChart from '@/components/Charts/PointChart'
import { pickerOptions } from '@/utils/options'
import { parseDate } from '@/utils'
import { fetchProductList, fetchProductAnalyze } from '@/api'
import { parse } from 'path-to-regexp'

export default {
  components: {
    HeaderGroup,
    PointChart,
    OpenMap,
    PointChart
  },
  data() {
    return {
      pickerOptions,
      productList: [],
      resultList: [],
      form: {
        dataset: [],
        daterange: [],
        lon: '104.8567',
        lat: '53.808333'
      },
      rules: {
        dataset: [{ required: true, message: '请选择数据集', trigger: 'blur' }],
        daterange: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
        lon: [{ required: true, message: '请输入经度', trigger: 'blur' }],
        lat: [{ required: true, message: '请输入纬度', trigger: 'blur' }]
      }
    }
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
            label: d.dataset,
            layers: d.layers,
            url: d.url
          })
        })
        arr.push(temp)
      })
      return arr
    }
  },
  watch: {},
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
      console.log(this.form)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { dataset, daterange, lon, lat } = this.form
          const query = {
            product_name: dataset[0],
            dataset: dataset[1],
            start: parseDate(daterange[0]),
            end: parseDate(daterange[1]),
            lon,
            lat
          }
          const res = await fetchProductAnalyze(query)
          this.resultList = res.data
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
 <style lang="scss" scoped>
html,
body,
#app {
  width: 1920px;
}
.container {
  width: 1920px;
  height: 100vh;
}
.container-box {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  height: 100px;
  // background: red;
  // margin-left: 360px;
  // margin-right: 360px;
}
.container-box-top {
  display: flex;
  justify-content: space-between;
  height: 300px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.result {
  position: absolute;
  top: 580px;
  left: 380px;
  width: 1150px;
  height: 400px;
}
.chanpin {
  // position: absolute;
  // top: 90px;
  // left: 380px;
  width: 500px;
  // height: 400px;
  border: 1px dashed #169bd5;
  border-radius: 6px;
}
.el-collapse {
  width: 600px;
}
.time {
  width: 120px;
}
.small {
  width: 80px;
}
.box-title {
  background-color: #b8bfc5;
  color: #fff;
  height: 40px;
}
img {
  position: absolute;
  top: 580px;
  left: 800px;
}
.map-box {
  width: 640px;
  // position: absolute;
  // height: 400px;
  // top: 90px;
  // left: 922px;
}
.map {
  width: 100%;
  // height: 400px;
  height: 100%;
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
h4 {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #e8e9eb;
}
h4::after {
  content: '';
  display: inline-block;
  width: 80px;
  height: 2px;
  background-color: #169bd5;
  position: absolute;
  left: 0;
  /* bottom: 0; */
  bottom: -1px;
}
// p {
//   position: absolute;
//   top: 530px;
//   left: 380px;
// }
// .p-line {
//   position: absolute;
//   top: 565px;
//   left: 380px;
//   height: 1px;
//   width: 1150px;
//   border: 0.2px solid #e8e9eb;
// }
</style>
