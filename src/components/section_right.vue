<template>
<div class="sectionRight">
  <div>
    <div class="sectionRight-top">
      <div class="line"></div>
      <h2>站内搜索</h2>
    </div>
    <div class="sectionRight-search"  @mouseleave="changeTooltipBoolean()">
      <el-input v-model="input1" placeholder="请输入内容" v-on:input ="inputFunc"  v-on:keyup.enter.native="showSearch()">
        <router-link :to="{name:'search', params:{ formData: this.input1}}" tag='i' class="el-icon-search el-input__icon" slot="suffix"></router-link>
      </el-input>
      <ul class="tooltip" v-if="this.tooltipBoolean">
      <router-link :to="{name:'pageContent', params:{id: item.id}}" tag='li' v-for="item in this.tooltipData">{{item.title}}</router-link>
      </ul>
    </div>
    <div style="clear: both"></div>
  </div>
  <div>
    <div class="sectionRight-user">
      <div class="line"></div>
      <h2>最近访客</h2>
    </div>
    <ul class="sectionRight-user-main">
      <li v-for="item in this.userList">
        <img :src="item.filePath">
        <span>{{item.username}}</span>
      </li>
    </ul>
  </div>
  <div>
    <div class="sectionRight-newPage">
      <div class="line"></div>
      <h2>最新文章</h2>
    </div>
    <ul class="sectionRight-newPage-main" v-for="item in this.newPage">
      <router-link :to="{name:'pageContent', params:{id: item.id}}" tag='li'>{{item.title}}</router-link>
      <span>- ({{item.difTime}})</span>
    </ul>
  </div>
  <div>
    <div class="sectionRight-newComments">
      <div class="line"></div>
      <h2>热门评论</h2>
    </div>
    <ul class="sectionRight-newComments-main" v-for="item in this.commentsList" v-if="item">
      <p>
        <img :src="item.filePath">
        <span>{{item.username}}-在{{item.difTime}}说：</span>
      </p>
      <li>{{item.content}}</li>
    </ul>
  </div>
  <div>
    <div class="sectionRight-newMessages">
      <div class="line"></div>
      <h2>最新留言</h2>
    </div>
    <ul class="sectionRight-newMessage-main" v-for="item in this.leaveContentsSec" v-if="item">
      <p>
        <img :src="item.filePath">
        <span>{{item.username}} 留言：</span>
        <span>{{item.time}}</span>
      </p>
      <li v-html="emoji(item.content)"></li>
    </ul>
  </div>
  <div>
    <div class="sectionRight-link">
      <div class="line"></div>
      <h2>友情链接</h2>
    </div>
    <ul class="sectionRight-link-main">
      <li><a href="http://my.csdn.net/xiaobai_dreamWeaver">我的CSDN</a></li>
      <li><a href="https://github.com/lqdreaming">我的GitHub</a></li>
      <li><a href="https://www.nowcoder.com/">牛客网</a></li>
      <li><a href="https://www.imooc.com/u/3818279/plans">慕课网</a></li>
      <li><a href="http://www.daiyou8.com/">网站模板</a></li>
      <li><a href="http://www.qdfuns.com/">W3C前端</a></li>
      <li><a href="http://www.php230.com/">IT程序员</a></li>
      <li><a href="#">个人博客</a></li>
      <li><a href="http://www.yangmingseo.com/">SEO博客</a></li>
      <li><a href="http://bbs.0dianidc.com/">站长论坛</a></li>
    </ul>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import vueEmoji from './emoji.vue'

export default {
  components: {
    vueEmoji
  },
  data () {
    return {
      input1: '',
      restaurants: [],
      tooltipData: [],
      userList: [],
      tooltipBoolean: false,
      newPage: [],
      commentsList: [],
      leaveContentsSec: [],
      leaveContentsOne: [],
      leaveContents: []
    }
  },
  created () {
    this.$http.get('/api/headerTitle/user').then((res) => {
      this.userList = res.data
      this.userList = this.userList.splice(0, 9)
    })
    this.$http.get('/api/headerTitle/leaveMessage').then((res) => {
      this.leaveContents = res.data
      this.leaveContentsOne = this.leaveContents.sort(this.compare1('time'))
      this.leaveContentsSec = this.leaveContentsOne.splice(0, 4)
    })
    this.$http.get('/api/headerTitle/pageContent').then((res) => {
      this.newPage = res.data
      console.log(this.newPage[0].addTime)
      this.newPage = this.newPage.splice(0, 9)
      var currentTime = new Date().getTime()
      for (var i = 0; i < this.newPage.length; i++) {
        this.newPage[i].addTime = this.timeChange(this.newPage[i].addTime)
        var leave = currentTime - new Date(this.newPage[i].addTime).getTime()
        var difTime1 = Math.floor(leave / (1000 * 60 * 60 * 24))
        if (difTime1 < 7 && difTime1 > 1) {
          var difTime = difTime1 + '天前'
        } else if (difTime1 >= 7 && difTime1 < 30) {
          difTime = Math.floor(difTime1 / 7) + '周前'
        } else if (difTime1 >= 30 && difTime1 <= 360) {
          difTime = Math.floor(difTime1 / 30) + '月前'
        } else if (difTime1 <= 1) {
          difTime = '今天'
        } else {
          difTime = Math.floor(difTime1 / 360) + '年前'
        }
        this.newPage[i].difTime = difTime
      }
    })
    this.$http.get('/api/headerTitle/pageContent/comments').then((res) => {
      this.commentsList = res.data
      this.commentsList = this.commentsList.sort(this.compare('like'))
      var currentTime = new Date().getTime()
      for (var i = 0; i < this.commentsList.length; i++) {
        this.commentsList[i].time = this.timeChange(this.commentsList[i].time)
        var leave = currentTime - new Date(this.commentsList[i].time).getTime()
        var difTime1 = Math.floor(leave / (1000 * 60 * 60 * 24))
        if (difTime1 < 7 && difTime1 > 1) {
          var difTime = difTime1 + '天前'
        } else if (difTime1 >= 7 && difTime1 < 30) {
          difTime = Math.floor(difTime1 / 7) + '周前'
        } else if (difTime1 >= 30 && difTime1 <= 360) {
          difTime = Math.floor(difTime1 / 30) + '月前'
        } else if (difTime1 <= 1) {
          difTime = '今天'
        } else {
          difTime = Math.floor(difTime1 / 360) + '年前'
        }
        this.commentsList[i].difTime = difTime
      }
      console.log(this.commentsList)
    })
  },
  methods: {
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    compare1 (property) {
      return function (a, b) {
        var value1 = new Date(a[property]).getTime()
        var value2 = new Date(b[property]).getTime()
        return value2 - value1
      }
    },
    timeChange (t) {
      var d = new Date(t)
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return d
    },
    handleSelect (item) {
      console.log(item)
    },
    inputFunc () {
      if (this.input1 !== '') {
        var input1 = this.input1
        this.tooltipBoolean = true
        this.$http.post('/api/headerTitle/pageContent/input', {input1: input1}).then((res) => {
          this.tooltipData = res.data
        })
      } else {
        this.tooltipBoolean = false
      }
    },
    changeTooltipBoolean () {
      this.tooltipBoolean = false
    },
    showSearch () {
      this.$router.push({name: 'search', params: {formData: this.input1}})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.sectionRight
  width: 320px
  margin-top: 10px
  padding-left: 10px
  div
    .sectionRight-top
      width: 100px
      height: 35px
      line-height: 35px
      border-radius: 35px 0px 35px 0
      background: rgb(82, 137, 184)
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        height: 20px
        color: #fff
        text-align: center
    .sectionRight-search
      margin-top: 15px
      position: relative
      cursor: pointer
      .tooltip
        width: 290px
        background: #D8DCE5
        border-radius: 5px
        position: absolute
        left: 0
        top: 40px
        z-index: 999
        li
          width: 280px
          height: 40px
          padding-left: 5px
          line-height: 40px
          font-size: 14px
          margin-top: 1px
          opacity: 0.7
          border-top: 1px solid #E6EBF5
          text-overflow:ellipsis
          overflow: hidden
          white-space: nowrap
          cursor: pointer
          &:hover
            color: red
            opacity: 1
            text-decoration: underline
    .sectionRight-user
      width: 100px
      height: 35px
      line-height: 35px
      margin-top: 35px
      margin-bottom: 25px
      border-radius: 35px 0 35px 0
      background: rgb(255, 129, 81)
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        height: 35px
        font-size: 18px
        line-height: 35px
        color: #fff
        text-align: center
        @keyframes twinkling 
          0%
            transform: scale(1.2,1.2)
            margin-left: 0px
          50%
            transform: scale(1.5,1.5)
            margin-left: 100px
          100%
            transform: scale(1,1)
            margin-left: 0px
    .sectionRight-user-main
      li
        display: inline-block
        width: 160px
        height: 50px
        margin-bottom: 15px
        color: blue
        font-family: '微软雅黑'
        opacity: 0.8
        &:hover
          color: red
          opacity: 1
        span
          display: inline-block
          font-size: 14px
          margin-left: 10px
        img
          display: inline-block
          width: 45px
          height: 45px
          margin-top: -8px
          vertical-align: middle
          border-radius: 45px
    .sectionRight-newPage
      width: 100px
      height: 35px
      line-height: 35px
      margin-top: 20px
      margin-bottom: 20px
      border-radius: 35px 0px 35px 0
      background: #008080
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        color: #fff
        text-align: center
    .sectionRight-newPage-main
      height: 40px
      line-height: 40px
      font-family: '微软雅黑'
      border-bottom: 1px solid #DDD
      opacity: 0.7
      cursor: pointer
      &:hover
        opacity: 1
        color: red
      li
        display: inline-block
        width: 250px
        font-size: 14px
        text-overflow:ellipsis
        overflow: hidden
        white-space: nowrap
      span
        display: inline-block
        font-size: 12px
        font-weight: bold
        margin-left: 10px
        vertical-align: top
    .sectionRight-newComments
      width: 100px
      height: 35px
      line-height: 35px
      margin-top: 25px
      border-radius: 35px 0px 35px 0
      background: #228B22
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        color: #fff
        text-align: center
    .sectionRight-newMessages
      width: 100px
      height: 35px
      line-height: 35px
      margin-top: 25px
      border-radius: 35px 0px 35px 0
      background: #8A2BE2
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        color: #fff
        text-align: center
    .sectionRight-newMessage-main
      font-family: '微软雅黑'
      background: #E6E6FA
      padding: 2px 5px
      margin-top: 15px
      border-radius: 8px
      opacity: 0.8
      &:hover
        color: #fff
        background: #5555FF
        opacity: 1
      p
        height: 50px
        img
          width: 45px
          height: 45px
          border-radius: 45px
          vertical-align: middle
        span
          display: inline-block
          font-size: 14px
          &:last-child
            float: right
            font-size: 12px
            opacity: 0.7
            margin-top: 15px
      li
        height: 20px
        font-size: 14px
        margin-left: 48px
        margin-top: -10px
        text-overflow: ellipsis
        overflow: hidden
        white-space: pre-wrap
    .sectionRight-newComments-main
      font-family: '微软雅黑'
      background: #8FBC8F
      padding: 2px 5px
      margin-top: 15px
      border-radius: 8px
      &:hover
        color: red
        animation: move ease-in 0.5s
        animation-fill-mode: forwards
      @keyframes move 
        0%
          margin-left: 0px
          opacity: 0.6
        25%
          margin-left: 40px
          opacity: 0.7
        50%
          margin-left: 80px
          opacity: 0.8
        75%
          margin-left: 40px
          opacity: 0.9
        100%
          margin-left: 0px
          opacity: 1
      p
        img
          width: 45px
          height: 45px
          border-radius: 45px
          vertical-align: middle
        span
          margin-left: 5px
          font-size: 14px
      li
        height: 20px
        font-size: 16px
        margin-left: 45px
        text-overflow:ellipsis
        overflow: hidden
        white-space: nowrap

    .sectionRight-link
      width: 100px
      height: 35px
      line-height: 35px
      margin-top: 45px
      border-radius: 35px 0px 35px 0
      background: #008080
      &:hover
        animation: twinkling 1s ease-in
      h2
        display: inline-block
        width: 100px
        color: #fff
        text-align: center
    .sectionRight-link-main
      margin-left: -20px
      margin-top: 20px
      font-family: '微软雅黑'
      li
        display: inline-block
        width: 80px
        height: 40px
        line-height: 40px
        margin-left: 25px
        margin-bottom: 15px
        border-radius: 5px
        text-align: center
        opacity: 0.6
        background: rgb(57, 57, 57)
        &:hover
          opacity: 1
          background: #FF3EFF
          border-radius: 30px 0px 30px 0px
          text-decoration: underline
        a
          font-size: 14px
          color: #fff
</style>
