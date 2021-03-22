<template>
  <div class="xiangqing">
    <div class="header">
      <header-group></header-group>
      <div class="picture"></div>
      <div class="title" v-text="detail.title"></div>
      <div class="jieshao" v-text="detail.desc"></div>
      <div class="but">
        <el-button v-if="detail.use_link" type="primary" class="but-1" @click="gotolink(detail.use_link)">立即使用</el-button>
        <el-button v-if="detail.scene_exp" plain class="but-2" @click="choose(detail.scene_exp.type, detail.scene_exp.data)">场景体验</el-button>
        <el-dialog :visible.sync="dialogVisible" fullscreen>
          <!-- <div v-show="dialogVisible"> -->
          <!-- <video :src="src" autoplay /> -->
          <video width="1900" height="800" controls>
            <source :src="src" type="video/mp4" autoplay />
            <!-- <source src="movie.ogg" type="video/ogg" /> -->
            您的浏览器不支持 video 标签。
          </video>
          <!-- </div> -->
        </el-dialog>
        <el-button v-if="detail.help_doc" type="text" class="but-3"><a :href="detail.help_doc" download="">帮助文档</a></el-button>
      </div>
    </div>
    <div class="youshi" v-if="detail.advantage">
      <div class="icon-title">
        <img src="~@/assets/img/images/advantage.png" />
        <p>应用优势</p>
      </div>
      <div class="card-group">
        <div class="card" v-for="item in detail.advantage" :key="item.id">
          <div class="card-title" v-text="item.title"></div>
          <div class="card-con" v-text="item.desc"></div>
        </div>
      </div>
    </div>
    <div class="youshi" v-if="detail.features">
      <div class="icon-title">
        <img src="~@/assets/img/images/features.png" />
        <p>应用功能</p>
      </div>
      <table>
        <tr v-for="item in detail.features" :key="item.id">
          <td class="left-t" v-text="item.title"></td>
          <td class="right-t" v-text="item.desc"></td>
        </tr>
      </table>
    </div>
    <div class="youshi" v-if="detail.cases">
      <div class="icon-title">
        <img src="~@/assets/img/images/cases.png" />
        <p>实战案例</p>
      </div>
      <div class="anli">
        <div class="anli-c" :class="'anli-c' + index" v-for="(item, index) in detail.cases" :key="index" v-show="anliIndex === index">
          <div class="neirong">
            <img :src="item.case_img" />
          </div>
          <div class="msg">
            <div class="msg-up"><p v-text="item.title"></p></div>
            <div class="msg-down"><p v-text="item.desc"></p></div>
          </div>
        </div>

        <div class="anli-but">
          <span v-show="caseNum > 0" class="anli-but1" :class="{ active: anliIndex === 0 }" @click="anliIndex = 0"></span>
          <span v-show="caseNum > 1" class="anli-but2" :class="{ active: anliIndex === 1 }" @click="anliIndex = 1"> </span>
          <span v-show="caseNum > 2" class="anli-but3" :class="{ active: anliIndex === 2 }" @click="anliIndex = 2"></span>
          <span v-show="caseNum > 3" class="anli-but4" :class="{ active: anliIndex === 3 }" @click="anliIndex = 3"></span>
        </div>
      </div>
    </div>
    <div class="youshi">
      <div class="icon-title">
        <img src="~@/assets/img/images/service.png" />
        <p v-text="'技术支持'"></p>
      </div>
      <div class="zhichi">
        <p>联系人：<span v-text="detail.service.name"></span></p>
        <p>电 话:<span v-text="detail.service.phone"></span></p>
        <p>邮 箱：<span v-text="detail.service.email"></span></p>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import HeaderGroup from '../menhu/components/HeaderGroup'
import Foot from '../menhu/components/Footer'
import { data } from '@/views/detail/sub/hs'

export default {
  name: 'Detail',
  components: {
    HeaderGroup,
    Foot
  },
  data() {
    return {
      detail: {
        name: '',
        title: '',
        desc: '',
        use_link: '',
        scene_exp: null,
        help_doc: null,
        advantage: [],
        features: [],
        other_img: null,
        cases: [],
        fee: '',
        service: {}
      },
      anliIndex: 0,
      dialogVisible: false,
      src: ''
    }
  },
  async created() {
    const p_name = this.$route.query.product
    this.detail = data[p_name]
  },
  computed: {
    link() {
      return this.detail.use_link
    },
    caseNum() {
      return this.detail.cases ? this.detail.cases.length : 0
    }
  },

  async mounted() {},
  methods: {
    gotolink(link) {
      console.log(link)
      window.location.href = link
    },
    choose(type, data) {
      if (type === 'url') {
        window.location.href = data
      } else if (type === 'vedio') {
        console.log(type, data)
        this.dialogVisible = true
        this.src = data
      } else {
        return
      }
    },
    downloadHelp(link) {
      window.open(link)
      console.log(link)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/detail.scss';
.xiangqing {
  width: 1920px;
}
</style>