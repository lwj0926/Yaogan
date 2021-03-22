<template>
  <div>
    <header-group></header-group>
    <div class="container">
      <div class="container-b">
        <div class="imgbox"><img src="~@/assets/img/card-2.png" /></div>
        <div class="jieshao">
          <h3>NDVI植被指数</h3>
          <p>
            植被指数（NDVI）是根据植被的光谱反射与吸收特性，将卫星遥感数据可见光与近红外波段的反射率进行线性或非线性组合，形成对地表植被变化敏感、可以有效反映植被覆盖程度的一系列指示因子的总称。植被指数与叶面积指数、净初级生产力等生物物理参数有着密切的关联，是植被覆盖的动态监测、成图和资源管理中的一个重要参数。归一化差分植被指数（Normalized
            Difference Vegetation Index, NDVI）是迄今为止应用最为广泛的一种植被指数。
          </p>
        </div>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="label" label="参数"> </el-table-column>
        <el-table-column prop="value" label="指标"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import HeaderGroup from '@/components/header'

export default {
  components: {
    HeaderGroup
  },
  data() {
    return {
      tableData: [
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        },
        {
          label: '参数',
          value: '值值'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.container-b {
  display: flex;
}
.imgbox {
  width: 550px;
  padding: 20px;
  // border: 1px solid #EBEEF5;
  img {
    //width: 100%;
  }
}

.jieshao {
  width: 550px;
  padding: 20px;
}
</style>