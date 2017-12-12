<template>
<div class="sectionLeft">
  <ul v-for="item in this.myContentOne">
    <h2>{{item.title}}</h2>
    <p class="sectionInf">
      <span class="sectionAuthor">作者：{{item.author}} -</span>
      <span class="sectionAddTime">发布时间：{{item.addTime}} -</span>
      <span class="sectionName">分类：{{item.name}}</span>
    </p>
    <p class="sectionAbs">{{item.abstract}}</p>
    <p class="sectionView">
      <span class="sectionViewLeft">
        <i class="el-icon-edit"></i>
        <router-link :to="{name:'pageContent', params:{id: item.id}}" tag="span">阅读全文</router-link>
      </span>
      <i class="el-icon-view"> {{item.views}}</i>
    </p>
  </ul>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="this.myContent.length">
    </el-pagination>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      myContent: [],
      time1: '',
      currentPage: 1,
      myContentOne: []
    }
  },
  created () {
    this.$http.get('/api/headerTitle').then((res) => {
      this.myContent = res.data
      this.myContentOne.length = 0
      this.myContentOne = this.myContent.slice(0, 10)
      for (var i = 0; i < this.myContentOne.length; i++) {
        this.myContentOne[i].addTime = this.timeChange(this.myContentOne[i].addTime)
      }
    })
  },
  methods: {
    timeChange (t) {
      var d = new Date(t)
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return d
    },
    handleCurrentChange (val) {
      var startIndex = 10 * (val - 1)
      var endIndex = 10 * val - 1
      this.myContentOne.length = 0
      this.myContentOne = this.myContent.slice(startIndex, endIndex)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.sectionLeft
  width: 650px
  margin-top: 10px
  padding-right: 10px
  border-right: 2px solid #878D99
  ul
    background: #D8DCE5
    margin-bottom: 25px
    padding: 2px 8px
    &:hover
      box-shadow: 2px 2px 2px rgba(20%,20%,40%,0.6), 4px 4px 6px rgba(20%,20%,40%,0.4), 6px 6px 12px rgba(20%,20%,40%,0.4)
    h2
      display: inline-block
      font-size: 24px
      padding: 10px 0px
      &:hover
        color: red
    .sectionInf
      font-size: 13px
      padding: 10px 0px
      span
        padding-left: 5px
        font-family: '微软雅黑'
        opacity: 0.5
      .sectionAuthor
        padding-left: 0px
      .sectionName
        opacity: 1
        color: red
        font-weight: bold
    .sectionAbs
      font-size: 14px
      font-family: '微软雅黑'
      line-height: 30px
      opacity: 0.6
      &:hover
        opacity: 1
    .sectionView
      height: 40px
      margin-top: 5px
      .sectionViewLeft
        display: inline-block
        width: 85px
        height: 35px
        padding-left:5px
        line-height: 35px
        font-size: 14px
        background: rgba(135, 141, 153, 0.5)
        color: #fff
        border-radius: 5px
        cursor: pointer
        &:hover
          background-color: rgb(250, 85, 85)
          font-weight: bold
          opacity: 1
        .el-icon-edit
          width: 15px
          margin-right: 2px
      .el-icon-view
        font-size: 14px
        float: right
        margin-right: 8px
        &:hover
          color: red
  .block
    width: 650px
    height: 40px
    text-align: center
    margin-top: -5px
    .el-pagination
      .el-pagination__total
        font-size: 14px
        font-weight: bold
      .btn-prev, .btn-next
        color: black
</style>
