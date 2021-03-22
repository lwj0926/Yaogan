<template>
  <div class="header">
    <div class="container">
      <router-link to="/">
        <div class="logo">
          <div class="logo-p">
            <img style="margin-top: 10px" src="~@/assets/img/logo.png" />
          </div>
          <p><span style="font-size: 16px; font-weight: bold">数据服务平台</span><br /><span style="font-size: 10px; font-weight: bold">Data Service Platform</span></p>
        </div>
      </router-link>
      <el-menu :default-active="this.$route.path" mode="horizontal" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/service">产品服务</el-menu-item>
        <el-menu-item index="/show">产品展示</el-menu-item>
        <el-menu-item index="/analyse">产品分析</el-menu-item>
        <el-menu-item index="/picture">产品专题图</el-menu-item>
        <el-menu-item index="/suanfa">算法定制</el-menu-item>
      </el-menu>
      <div class="icon-c">
        <i class="el-icon-user-solid"></i><span>Hellen，您好</span> <i class="el-icon-document"></i><span>我的订单</span>
        <i class="el-icon-shopping-cart-1"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderGroup',
  data() {
    return {
      // navselected: $route
      // this.$store.state.selectMenuIndex
    }
  },
  watch: {},
  methods: {},
  mounted() {
    // console.log(this.$route.path)
  }
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #545c64;
  height: 60px;
  .container {
    display: flex;
    justify-content: space-between;
  }

  // justify-content: space-between;
}
.header .logo {
  width: 200px;
  color: #fff;
  // margin-left: 360px;
  display: flex;
}
.el-menu {
  width: 670px;
}
.logo-p {
}
.logo-title {
  display: flex;
  flex-direction: column;
}
.icon-c {
  // margin-right: 360px;
  color: #fff;
}
i {
  color: white;
  margin-top: 22px;
  margin-left: 20px;
}
p {
  height: 30px;
  margin-top: 15px;
  margin-left: 10px;
}
</style>