<template>
  <div>
    <div class="header-box">
      <header-group></header-group>
      <div class="banner">
        <div class="container">
          <div class="desc">
            <h3>NDVI植被指数</h3>
            <p>NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数NDVI植被指数</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container">
      <el-card>
        <h4>NDVI植被指数</h4>
        <!-- <div style="padding: 14px; text-align: center"><span>NDVI植被指数</span></div> -->
        <img src="~@/assets/img/product-1.png" class="image" />
        <p>
          植被指数（NDVI）是根据植被的光谱反射与吸收特性，将卫星遥感数据可见光与近红外波段的反射率进行线性或非线性组合，形成对地表植被变化敏感、可以有效反映植被覆盖程度的一系列指示因子的总称。植被指数与叶面积指数、净初级生产力等生物物理参数有着密切的关联，是植被覆盖的动态监测、成图和资源管理中的一个重要参数。归一化差分植被指数（Normalized
          Difference Vegetation Index, NDVI）是迄今为止应用最为广泛的一种植被指数。
        </p>
      </el-card>
      <el-card>
        <h4>LAI叶面积指数</h4>
        <img src="~@/assets/img/product-2.png" class="image" />
        <p>叶面积指数，亦称叶面积系数。是指单位土地面积上植物叶片总面积占土地面积的倍数 [1]  。它与植被的密度、结构（单层或复层）、树木的生物学特性（分枝角、叶着生角、耐荫性等）和环境条件（光照、水分、土壤营养状况）有关，是表示植被利用光能状况和冠层结构的一个综合指标。</p>
      </el-card>
      <el-card>
        <h4>REF地表反射率</h4>
        <img src="~@/assets/img/product-3.png" class="image" />
        <p>地表反射率（REF）是指地表物体向各个方向反射的太阳总辐射通量与到达该物体表面的总辐射通量之比，它是研究地表生态环境变化的重要物理量。</p>
      </el-card>
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
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 400px;
  background: url(~@/assets/img/banner-bg.png) no-repeat center;
  color: #fff;

  .desc {
    width: 400px;
    text-align: right;
    float: right;
  }
  h3 {
    padding: 150px 40px 20px 0;
    font-size: 40px;
    margin: 0;
  }
  p {
    width: 400px;
    // text-align: right;
  }
}
.box {
  width: 1200px;
  margin-right: 360px;
  margin-left: 360px;
  margin-top: 100px;
}
.title {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
}
.card-container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;

  justify-content: space-between;
}
h4 {
  text-align: center;
  // margin-top: 0;
}
// p {
//   text-align: center;
// }
.el-card {
  margin-top: 30px;
  box-shadow: 0px 0px 20px 3px #aaa;
  width: 380px;
  text-align: center;
  img {
    width: 100%;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
    -webkit-box-orient: vertical;
    text-align: left;
  }
}
</style>