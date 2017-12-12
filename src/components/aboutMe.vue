<template>
  <div class="aboutMe">
    <headerTitle></headerTitle>
    <p class="crumbs-main">
        <i class="el-icon-location"></i>
        <span>您当前的位置:</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>关于我</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
    <div class="aboutMe-left" style="float: left;">
      <ul style="float: left" class="aboutMe-time-title">
        <li :class="[this.isPartBoolean[2] ? 'active1' : '']">
          <p class="aboutMe-title" :class="[this.isPartBoolean[2] ? 'active' : '']">个人信息</p>
          <div class="aboutMe-main" :class="[this.isPartBoolean[2] ? 'active' : '']">
            <p>姓名：刘琦</p>
            <p>QQ：723208305</p>
            <p>职业：前端工程师</p>
            <p>毕业院校：四川大学</p>
            <p>人生格言：勇敢地做自己！</p>
            <p><a href="http://my.csdn.net/xiaobai_dreamWeaver">CSDN博客</a><a href="https://github.com/lqdreaming">Github社区</a></p>
          </div>
        </li>
        <li :class="[this.isPartBoolean[1] ? 'active1' : '']">
          <p :class="[this.isPartBoolean[1] ? 'active' : '']" class="aboutMe-title">我的前端</p>
          <div class="myWeb" :class="[this.isPartBoolean[1] ? 'active' : '']">
            <a href="https://github.com/lqdreaming/my-project-douyu">
              <img src="http://p5.so.qhimgs1.com/bdr/_240_/t01da3a154e2b98283b.jpg">
              <h2>vue-仿斗鱼TV</h2>
            </a>
            <a href="https://github.com/lqdreaming/my-music">
              <img src="http://p2.so.qhimgs1.com/bdr/_240_/t0177d5617d33f3d92e.jpg">
              <h2>vue-音乐播放器</h2>
            </a>
            <a href="https://github.com/lqdreaming/my-react-zhihu">
              <img src="http://p1.so.qhimgs1.com/bdr/_240_/t01c172ab5138fc059d.jpg">
              <h2>react-知乎日报</h2>
            </a>
            <a href="https://github.com/lqdreaming/snake">
              <img src="http://p1.so.qhimgs1.com/bdr/_240_/t0149ed1c2a05ae721d.png">
              <h2>javascript-贪吃蛇游戏</h2>
            </a>
          </div>
        </li>
        <li :class="[this.isPartBoolean[0] ? 'active1' : '']">
          <p :class="[this.isPartBoolean[0] ? 'active' : '']" class="aboutMe-title">我的科研</p>
          <div>
          </div>
        </li>
      </ul>
      <template style="float: left">
          <el-slider
            v-model="value"
            vertical
            height="1200px" 
            range
            label
            show-stops
            show-input
            show-tooltip
            show-input-controls
            :max="3" v-on:change="change(value)">
          </el-slider>
      </template>
    </div>
    <sectionRight style="float: left"></sectionRight>
    <div style="clear: both"></div>
    <FooterPart></FooterPart>
  </div>
</template>

<script type="text/ecmascript-6">
import headerTitle from './headerTitle'
import sectionRight from './section_right'
import FooterPart from './FooterPart'

export default {
  components: {
    headerTitle,
    sectionRight,
    FooterPart
  },
  data () {
    return {
      value: 0,
      isPartBoolean: [false, false, true]
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    change (value) {
      this.isPartBoolean = [false, false, false]
      this.isPartBoolean[value[1] - 1] = true
      console.log(this.isPartBoolean[1])
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.aboutMe
  width: 1000px
  margin: 0 auto
  .crumbs-main
    height: 50px
    line-height: 50px
    font-family: '微软雅黑'
    .el-icon-location
      display: inline-block
      font-size: 20px
      opacity: 0.5
      padding: 0px 5px
      vertical-align: middle
    span
      font-size: 14px
      vertical-align: middle
    .el-breadcrumb
      display: inline-block
      vertical-align: middle
  .aboutMe-left
    width: 650px
    .el-slider
      width: 10px
      margin-top: 20px
      margin-left: 100px
      .el-slider__runway
        color: red
        .el-slider__bar
          color: red
    .aboutMe-time-title
      font-family: '微软雅黑'
      position: relative
      li
        font-size: 15px
        width: 600px
        line-height: 40px
        font-size: 18px
        opacity: 0.7
        color: rgb(82, 137, 185)
        &:nth-child(1)
          position: absolute
          top: 10px
          left: 16px
        &:nth-child(2)
          position: absolute
          top: 410px
          left: 16px
        &:nth-child(3)
          position: absolute
          top: 810px
          left: 16px
        .aboutMe-main
          font-size: 16px
          margin-left: 110px
          padding-left: 80px
          p
            a
              color: red
              &:nth-child(2)
                margin-left: 10px
        .myWeb
          padding-left: 10px
          margin-left: 110px
          a
            display: inline-block
            height: 130px
            padding: 10px
            margin-left: 10px
            img
              width: 200px
              height: 130px
              &:hover
                animation: rotate 0.4s ease-in
              @keyframes move1
                0%
                  transform: rotate(90deg)
                50%
                  transform: rotate(180deg)
                100%
                  transform: rotate(360deg)
            h2
              font-size: 16px
              line-height: 10px
              color: #fff
              text-align: center
              &:hover
                text-decoration: underline
                color: red
        .aboutMe-title
          width: 100px
          padding-left: 5px
      .active
        background: rgb(64, 158, 255)
        color: #fff
        opacity: 1
        border-radius: 10px
      .active1
        opacity: 1
</style>
