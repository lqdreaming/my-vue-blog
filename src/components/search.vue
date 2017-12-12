<template>
  <div class="search">
    <headerTitle></headerTitle>
    <div class="search-left" style="float: left;">
      <p class="crumbs-main">
        <i class="el-icon-location"></i>
        <span>您当前的位置:</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索 - {{this.$route.params.formData}}</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
        <ul class="search-main-left" v-if="this.webContentOne">
          <router-link :to="{name:'pageContent', params:{id: item.id}}" tag="li" v-for="item in this.webContentOne">
            <img :src="item.filePath">
            <div class="search-main-left-content">
              <h2>{{item.title}}</h2>
              <p>
                <span>作者：{{item.author}}</span>
                <span>时间：{{item.time}}</span>
                <span>分类：<router-link :to="{name:'search', params:{ formData: item.name } }">{{item.name}}</router-link></span>
              </p>
              <div class="search-main-left-maincontent">{{item.abstract}}</div>
            </div>
          </router-link>
        </ul>
        <ul class="search-main-left-more" v-if="this.webContentOne.length == 0">
          <h2>没有更多文章</h2>
        </ul>
        <el-pagination
          @current-change="handleCurrentChangeWebStudy"
          :current-page.sync="currentPageWebStudy"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="this.webContent.length" class="paging">
        </el-pagination>
  </div>
  <sectionRight style="float: left; margin-top: 70px"></sectionRight>
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
      webContent: [],
      webContentOne: [],
      formData: '',
      currentPageWebStudy: 1
    }
  },
  watch: {
    '$route': 'getInitSearch'
  },
  created () {
    this.getInitSearch()
  },
  methods: {
    getInitSearch () {
      var formData1 = this.$route.params.formData
      console.log(formData1)
      this.$http.post('/api/headerTitle/pageContent/search', {formData1: formData1}).then((res) => {
        this.webContent = res.data
        this.webContentOne = this.webContent.slice(0, 10)
        for (var i = 0; i < this.webContentOne.length; i++) {
          this.webContentOne[i].time = this.timeChange(this.webContentOne[i].addTime)
        }
        console.log(this.webContentOne)
      })
    },
    timeChange (t) {
      var d = new Date(t)
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return d
    },
    handleCurrentChangeWebStudy (val) {
      var startIndex = 10 * (val - 1)
      var endIndex = 10 * val - 1
      this.webContentOne.length = 0
      this.webContentOne = this.myContent.slice(startIndex, endIndex)
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.search
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
  .search-main-left
    width: 650px
    margin-top: 10px
    padding-right: 10px
    li
      margin-bottom: 15px
      padding: 10px 10px
      cursor: pointer
      font-family: '微软雅黑'
      opacity: 0.8
      &:hover
        box-shadow: 2px 2px 2px rgba(20%,20%,40%,0.6), 4px 4px 6px rgba(20%,20%,40%,0.4), 6px 6px 12px rgba(20%,20%,40%,0.4)
        opacity: 1
      img
        display: inline-block
        width: 200px
        height: 150px
      .search-main-left-content
        display: inline-block
        width: 420px
        margin-left: 5px
        vertical-align: top
        h2
          display: inline-block
          width: 440px
          font-size: 20px
          padding: 10px 0px
          text-overflow:ellipsis
          overflow: hidden
          white-space: nowrap
          &:hover
            color: red
            animation: move1 0.8s ease-in
          @keyframes move1
            0%
              margin-left: 0px
            50%
              margin-left: 200px
            100%
              margin-left: 0px
        p
          font-size: 12px
          span
            margin-left: 5px
            &:first-child
              &:hover
                color: red
                text-decoration: underline
            &:last-child
              &:hover
                color: red
                text-decoration: underline
        .search-main-left-maincontent
          font-size: 13px
          height: 80px
          margin-top: 5px
          line-height: 28px
          text-overflow:ellipsis
          overflow: hidden
          white-space: normal
          text-indent: 1em
  .search-main-left-more
    h2
      text-align: center
      font-size: 14px
      margin: 10px 0
      opacity: 0.5
  .paging
    width: 650px
    text-align: center
</style>
