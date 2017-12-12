<template>
  <div id="pageContent">
    <headerTitle></headerTitle>
    <img :src="this.details.filePath">
    <div class="pageDetails">
        <p class="crumbs-main">
          <i class="el-icon-location"></i>
          <span>您当前的位置:</span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'webStudy', params:{ formData: this.details.name } }">{{this.details.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.details.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </p>
      <h2>{{this.details.title}}</h2>
      <p class="pageInf">
        <span>
          <img :src="this.details.filePath">
           <router-link :to="{name:'search', params:{ formData: this.details.author } }">{{this.details.author}}</router-link>
        </span>
        <span>发布时间：{{this.details.addTime}}</span>
        <span>分类：<router-link :to="{name:'webStudy', params:{ formData: this.details.name } }"> {{this.details.name}}</router-link></span>
        <span>
          <i class="el-icon-view"> {{this.details.views}}</i>
        </span>
      </p>
      <div style="border:1px dashed #D2B48C"></div>
      <div  class="pageArticle" v-html="this.details.content"></div>
      <div class="line"></div>
      <div class="pageOthers">
        <ul class="upDownPage">
        上一篇：
           <router-link :to="{name:'pageContent', params:{id: this.upPage.id}}" tag="li" v-if="this.upPage">{{this.upPage.title}}</router-link>
          <li v-else>没有了</li>
           <!--<li  @click="handleReload(item)">{{item.title}} - {{item.author}}</li>-->
        </ul>
        <ul class="upDownPage">
        下一篇：
           <router-link :to="{name:'pageContent', params:{id: this.downPage.id}}" tag="li" v-if="this.downPage">{{this.downPage.title}}</router-link>
           <li v-else>没有了</li>
           <!--<li  @click="handleReload(item)">{{item.title}} - {{item.author}}</li>-->
        </ul>
      </div>
      <div class="pageOthers">
        <h3>相关文章</h3>
        <ul v-for="item in this.othersPage" class="relativePage">
           <router-link :to="{name:'pageContent', params:{id: item.id}}" tag="li">{{item.title}} - {{item.author}}</router-link>
           <!--<li  @click="handleReload(item)">{{item.title}} - {{item.author}}</li>-->
        </ul>
      </div>
      <div class="pageComments">
        <h3>评论区</h3>
        <div v-if="this.userInf" class="commentInput">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入评论"
            v-model="textarea">
          </el-input>
          <button node-type="issue" class="btn-fw" @click="subComments"></button>
        </div>
        <p v-if="!this.userInf" class="isComment"><span>评论，</span>
          请先<span @click="isdialogFormVisible" class="signIn">登陆!</span>
        </p>
        <div class="commentContent">
          <i class="el-icon-edit-outline"> 评论</i>
          <span class="commentsListNumber">{{this.commentsList.length}}条</span>
          <p v-if="this.commentsList.length == 0" class="noComment">暂无评论，请留下您的吐槽！</p>

          <div class="commentsList" v-if="this.commentsList.length != 0">
              <div v-for="(item,index) in this.commentsList" :key="index" class="item">
                <div class="commentListcontent">
                  <div class="commentList-main">
                    <img :src="item.filePath">
                    <div class="commentList-right">
                      <p class="item-up">
                        <span class="item-username">{{item.username}}</span>
                        <span class="item-time">{{item.time}}</span>
                      </p>
                      <p v-html="emoji(item.content)" class="item-content"></p>
                    </div>
                  </div>
                  <div class="item-footer-operation">
                   <span class="commentsList-footer-warning" @click="inform(item, index)"><i class="el-icon-warning"></i>举报</span>
                    <span class="commentsList-reply" @click="isReply(index, item)">回复</span>
                    <span @click="approval(item, index)" :class="commentsList[index].pageThumbBoolean? 'pageThumb-active' : ''"><img src="./../assets/images/thumb-up.png">{{item.likeName.length}}</span>
                    <span @click="reject(item, index)" :class="item.pageThumbBoolean1? 'pageThumb-active' : ''"><img src="./../assets/images/thumb-down.png">{{item.rejectName.length}}</span>
                  </div>
                  <div style="clear: both"></div>
                  <reply v-if="index == commentsListBoolean" :commentsListBoolean='commentsListBoolean' :replyInfIndex='index' :replyInfRow='item' v-on:showReplyState="changeReplyState" v-on:showReplydata="changeReplydata"></reply>
                </div>
                  <div class="commentListReply" v-for="(item, index1) in item.reply" :key="index1" v-show="item">
                    <div class="commentList-reply-up">
                      <div class="commentList-reply-up-side">
                        <img :src="item.replyUserPath">
                      </div>
                      <div class="commentList-reply-up-side">
                        <p>
                          <span class="commentList-reply-up-uname">{{item.replyUserName}}</span><span>回复</span><span class="commentList-reply-up-uname">{{item.commentUserName}}：</span>
                          <span v-html="emoji(item.replyContent.toString())"></span>
                        </p>
                        <p>{{item.replyTime}}</p>
                      </div>
                    </div>
                    <p class="commentsList-footer-reply-operation">
                      <span class="commentsList-footer-warning" @click="inform(item, index1)"><i class="el-icon-warning"></i>举报</span>
                      <span class="commentsList-reply" @click="isReply1(item, index1, item.num)">回复</span>
                    </p>
                    <div style="clear: both"></div>
                    <reply v-if="index1 == commentsListBoolean1 && number == item.num" :commentsListBoolean='commentsListBoolean1' :replyInfIndex='item.index' :replyInfRow='item' v-on:showReplyState="changeReplyState1"></reply>
                  </div>
              </div>
              <el-button type="primary" :loading="false" class="load-comment-more" @click="loadMessageMore()" v-if="this.commentsListOne.length != 0">加载更多评论</el-button>
              <el-button type="primary" :loading="false" class="load-comment-more" v-if="this.commentsListOne.length == 0">没有更多评论</el-button>
            </div>
        </div>
      </div>
    </div>
    <regLog  v-on:showState="changeState" :dialogFormVisible='this.dialogFormVisible' :visible.sync="this.dialogFormVisible"></regLog>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import headerTitle from './headerTitle'
import regLog from './regLog'
import reply from './reply'

export default {
  components: {
    headerTitle,
    regLog,
    reply
  },
  data () {
    return {
      details: '',
      othersPage: [],
      comments: [],
      textarea: '',
      userInf: '',
      dialogFormVisible: false,
      commentData: '',
      commentsList: [],
      commentsListBoolean: -1,
      commentsListBoolean1: -1,
      number: -1,
      islike: true,
      isreject: true,
      likeName: [],
      rejectName: [],
      commentsListOne: [],
      upPage: [],
      downPage: [],
      replyData: '',
      pageThumbBoolean: false
    }
  },
  created () {
    if (sessionStorage.getItem('userInf')) {
      this.userInf = sessionStorage.getItem('userInf')
    }
    this.getStatus()
  },
  watch: {
    '$route': 'getStatus',
    commentsListBoolean: 'getStatus',
    commentsListBoolean1: 'getStatus',
    number: 'getStatus'
  },
  methods: {
    getStatus () {
      if (sessionStorage.getItem('formData') && sessionStorage.getItem('formData') === this.$route.params.id) {
        var formData = sessionStorage.getItem('formData')
        formData = JSON.parse(formData)
      } else {
        window.sessionStorage.setItem('formData', JSON.stringify(this.$route.params.id))
        formData = this.$route.params.id
      }
      this.$http.post('/api/headerTitle/pageContent/id', {formData: formData}).then((res) => {
        this.details = res.data[0]
        this.details.addTime = this.timeChange(this.details.addTime)
        var pageAuthor = this.details.author
        this.$http.post('/api/headerTitle/pageContent/author', {author: pageAuthor, views: this.details.views + 1}).then((res) => {
          for (var i = 0; i < res.body.length; i++) {
            if (res.body[i].id === formData) {
              this.upPage = res.body[i - 1]
              this.downPage = res.body[i + 1]
            }
          }
        })
        var pageName = this.details.name
        this.$http.post('/api/headerTitle/pageContent/name', {pageName: pageName}).then((res) => {
          this.othersPage = res.body
          if (this.othersPage.length > 6) {
            this.othersPage.length = 6
          }
          for (var i = 0; i < this.othersPage.length; i++) {
            var s = this.details.abstract
            var t1 = this.othersPage[i].abstract
            this.othersPage[i].Proximity = this.Levenshtein_Distance_Percent(s, t1)
          }
          this.othersPage.sort(function (a, b) {
            return b.Proximity - a.Proximity
          })
        })
      })
      this.$http.post('/api/headerTitle/pageContent/comments/id', {formData: formData}).then((res) => {
        this.commentsListOne = []
        this.commentsListOne = res.body
        this.commentsListOne.reverse()
        this.commentsList = this.commentsListOne.splice(0, 4)
        var name1 = sessionStorage.getItem('userInf')
        if (!name1) {
          for (var j = 0; j < this.commentsList.length; j++) {
            this.commentsList[j].pageThumbBoolean = false
            this.commentsList[j].pageThumbBoolean1 = false
          }
        } else {
          var name = JSON.parse(name1).username
          for (var i = 0; i < this.commentsList.length; i++) {
            if (this.commentsList[i].likeName.indexOf(name) !== -1) {
              this.commentsList[i].pageThumbBoolean = true
            } else {
              this.commentsList[i].pageThumbBoolean = false
            }
            if (this.commentsList[i].rejectName.indexOf(name) !== -1) {
              this.commentsList[i].pageThumbBoolean1 = true
            } else {
              this.commentsList[i].pageThumbBoolean1 = false
            }
          }
        }
      })
    },
    timeChange (t) {
      var d = new Date(t)
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return d
    },
    loadMore () {
      if (this.commentsListOne.length !== 0) {
        var commentsListMore = this.commentsListOne.splice(0, 4)
        for (var i = 0; i < commentsListMore.length; i++) {
          this.commentsList.push(commentsListMore[i])
        }
      }
    },
    handleReload (item) {
      this.details = item
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop
      this.scroll = 0
    },
    // 来文史特距离计算相似度
    Levenshtein_Distance (s, t) {
      var n = s.length
      var m = t.length
      var d = []
      // Step 1
      if (n === 0) return m
      if (m === 0) return n
      // Step 2
      for (var i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
      }
      for (var j = 0; j <= m; j++) {
        d[0][j] = j
      }
      // Step 3
      for (i = 1; i <= n; i++) {
        var si = s.charAt(i - 1)
      // Step 4
        for (j = 1; j <= m; j++) {
          var tj = t.charAt(j - 1)
          // Step 5
          if (si === tj) {
            var cost = 0
          } else {
            cost = 1
          }
      // Step 6
          d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
      }
    // Step 7
      return d[n][m]
    },
    Levenshtein_Distance_Percent (s, t) {
      var l = s.length > t.length ? s.length : t.length
      var d = this.Levenshtein_Distance(s, t)
      return (1 - d / l).toFixed(4)
    },
    isdialogFormVisible () {
      this.dialogFormVisible = true
    },
    changeState (val) {
      this.dialogFormVisible = val
    },
    changeReplyState (val) {
      this.commentsListBoolean = val
    },
    changeReplydata (replyData) {
      this.replyData = replyData
    },
    changeReplyState1 (val) {
      this.commentsListBoolean1 = val
    },
    subComments () {
      if (sessionStorage.getItem('formData') && sessionStorage.getItem('formData') === this.$route.params.id) {
        var formData = sessionStorage.getItem('formData')
        formData = JSON.parse(formData)
      } else {
        window.sessionStorage.setItem('formData', JSON.stringify(this.$route.params.id))
        formData = this.$route.params.id
      }
      var id1 = formData
      var name1 = sessionStorage.getItem('userInf')
      var name = JSON.parse(name1).username
      var filePath = JSON.parse(name1).filePath
      var date = new Date()
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      var conContent = this.textarea
      var num = this.commentsList.length + 1
      var reply = []
      if (conContent === '') {
        alert('评论不能为空')
      } else if ((conContent.toString()).length < 3) {
        alert('评论至少输入3个字')
      } else {
        this.commentData = {username: name, time: time, content: conContent, reply: reply, num: num, id1: id1, filePath: filePath}
        this.$http.post('/api/headerTitle/pageContent/comments', {commentData: this.commentData}).then((res) => {
          if (res.status === 200) {
            alert('评论成功')
            this.getStatus()
          } else {
            alert('评论失败')
          }
        })
      }
    },
    Format (fmt) {
      var M = fmt.getMonth() + 1
      var Y = fmt.getFullYear()
      var D = fmt.getDate()
      fmt = Y + '-' + M + '-' + D + ''
      return fmt
    },
    isReply (index, item) {
      this.commentsListBoolean = index
      if (this.replyData) {
        item.reply.push(this.replyData)
      }
    },
    isReply1 (item, index1, num) {
      this.commentsListBoolean1 = index1
      this.number = num
    },
    approval (item, index) {
      var name1 = sessionStorage.getItem('userInf')
      if (!name1) {
        alert('请您先登录')
      } else {
        var name = JSON.parse(name1).username
        var commentsData = {itemData: item, approveName: name}
        this.$http.post('/api/headerTitle/pageContent/comments/approval', {commentsData: commentsData}).then((res) => {
          if (res.data === '取消点赞成功') {
            item.pageThumbBoolean = false
            var position = item.likeName.indexOf(name)
            item.likeName.splice(position, 1)
          } else if (res.data === '点赞成功') {
            item.pageThumbBoolean = true
            item.likeName.push(name)
          } else {
            alert('点赞失败')
          }
        })
      }
    },
    reject (item, index) {
      var name1 = sessionStorage.getItem('userInf')
      if (!name1) {
        alert('请您先登录')
      } else {
        var name = JSON.parse(name1).username
        var commentsData = {itemData: item, rejectName: name}
        this.$http.post('/api/headerTitle/pageContent/comments/reject', {commentsData: commentsData}).then((res) => {
          if (res.data === '取消点拒成功') {
            item.pageThumbBoolean1 = false
            var position = item.rejectName.indexOf(name)
            item.rejectName.splice(position, 1)
          } else if (res.data === '点拒成功') {
            item.pageThumbBoolean1 = true
            item.rejectName.push(name)
          } else {
            alert('点拒失败')
          }
        })
      }
    },
    inform (item, index) {
      this.$prompt('请输入举报内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputErrorMessage: '内容不能为空'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的举报是: ' + value
        })
        item.informInf = value
        this.$http.post('/api/headerTitle/pageContent/comments/inform', {comments: item}).then((res) => {
          if (res.status === 200) {
            alert('谢谢举报')
          } else {
            alert('举报失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消举报'
        })
      })
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/styles/icon.css'
@import '../assets/styles/reset.css'

#pageContent
  width: 1000px
  margin: 0 auto
  img
    width: 100%
    height: 480px
  .pageDetails
    padding: 10px 5px
    background: rgb(230, 230, 230)
    font-family: '微软雅黑'
    .crumbs-main
      height: 20px
      line-height: 20px
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
    h2
      font-size: 26px
      text-align: center
      margin-top: 20px
    .pageInf
      font-size: 14px
      height: 50px
      line-height: 50px
      text-align: center
      span
        margin-left: 20px
        a
          color: black
          &:hover
            color: blue
        img
          width: 20px
          height: 20px
          border-radius: 20px
          margin-right: 2px
          vertical-align: middle
      .item
        margin-top: 10px
        margin-right: 40px
    .pageArticle
      font-size: 16px
      line-height: 30px
    .line
      border: 1px solid #fff
    .pageOthers
      margin-top: 20px
      h3
        width: 120px
        height: 40px
        line-height: 40px
        text-align: center
        border-radius: 10px
        font-size: 20px
        color: #fff
        background: rgb(42, 116, 151)
        &:hover
          color: red
      .upDownPage
        font-size:  16px
        font-weight: bold
        li
          display: inline-block
          height: 30px
          line-height: 30px
          font-size: 14px
          font-weight: normal
          cursor: pointer
          &:hover
            color: #FF0000
            text-decoration: underline
      .relativePage
        margin: 15px 5px
        li
          display: inline-block
          height: 20px
          line-height: 20px
          font-size: 16px
          cursor: pointer
          &:hover
            color: #FF0000
            text-decoration: underline
    .pageComments
      background: #fff
      padding: 2px 0px
      h3
        width: 120px
        height: 40px
        line-height: 40px
        text-align: center
        border-radius: 10px
        font-size: 20px
        margin-bottom: 5px
        color: #fff
        background: #EE7700
        &:hover
          color: red
      .commentInput
        display: inline-block
        width: 100%
        .btn-fw
          display: inline-block
          background-image: url(https://changyan.itc.cn/mdevp/extensions/cy-skin/028/skin-red/images/post-btn.png)
          width: 102px
          height: 30px
          overflow: hidden
          border: 0
          padding: 0px 0px
          margin: 5px 0
          float: right
          cursor: pointer
      .isComment
        height: 50px
        line-height: 50px
        font-size: 20px
        text-align: center
        font-weight: bold
        background: #B8860B
        border-bottom: 2px solid #fff
        .signIn
          color: red
          &:hover
            text-decoration: underline
            cursor: pointer
      .commentContent
        background: rgb(217, 211, 193)
        padding-top: 20px
        .el-icon-edit-outline
          height: 30px
          font-size: 20px
          font-weight: bold
          vertical-align: middle
        .commentsListNumber
          font-size: 18px
          color: red
        .noComment
          height: 30px
          font-size: 18px
          font-weight: bold
          text-align: center
          color: red
        .commentsList
          margin-top: 10px
          .item
            margin-top: 20px
            padding: 10px
            margin: 0
            border-bottom: 1px solid #DCDCDC
            .commentListcontent
              .commentList-main
                img
                  width: 50px
                  height: 50px
                  border-radius: 50px
              .commentList-right
                display: inline-block
                width: 900px
                margin-left: 10px
                .item-up
                  font-size: 13px
                  .item-time
                    opacity: 0.6
                    float: right
                  .item-username
                    color: #FF4500
                .item-content
                  display: block
                  font-size: 15px
                  padding-top: 18px
              .item-footer-operation
                cursor: pointer
                margin-top: 10px
                float: right
                .commentsList-footer-warning
                  opacity: 0.5
                  cursor: pointer
                  &:hover
                    opacity: 1
                    color: red
                .item-footer-warning
                  opacity: 0.5
                  cursor: pointer
                  &:hover
                    opacity: 1
                    color: red
                .item-reply
                  cursor: pointer
                  &:hover
                    color: blue
                    text-decoration: underline
                span
                  margin-right: 15px
                .pageThumb-active
                  opacity: 0.5
                  color: red
                  img
                    width: 20px
                    height: 20px
                    vertical-align: middle
                    margin-top: -4px
                    margin-right: 2px
                  .el-icon-warning
                    margin-right: 4px
              #reply
                height: 90px
                margin: 10px 0
            .commentsList-reply
              cursor: pointer
              &:hover
                color: blue
                text-decoration: underline
            span
              margin-right: 15px
              img
                width: 20px
                height: 20px
                vertical-align: middle
                margin-top: -5px
                margin-right: 2px
              .el-icon-warning
                margin-right: 4px
            .commentListReply
              .commentList-reply-up
                height: 40px
                margin-left: 50px
                margin-top: 10px
                img
                  display: inline-block
                  width: 40px
                  height: 40px
                  border-radius: 40px
                .commentList-reply-up-side
                  display: inline-block
                  height: 40px
                  vertical-align: middle
                  p
                    height: 25px
                    margin-left: 10px
                    .commentList-reply-up-uname
                      font-size: 12px
                      font-weight: bold
                      color: rgb(21, 120, 124)
                    span
                      display: inline-block
                      margin-left: -4px
                      img
                        width: 18px
                        height: 18px
              .commentsList-footer-reply-operation
                float: right
                .commentsList-footer-warning
                  margin-right: 30px
                  opacity: 0.5
                  cursor: pointer
                  &:hover
                    opacity: 1
                    color: red
                  .el-icon-warning
                    margin-right: 5px
                .commentList-reply
                  margin-right: 20px
                  cursor: pointer
                  &:hover
                    color: blue
                    text-decoration: underline
              #reply
                height: 90px
                margin-top: 20px
          .load-comment-more
            width: 100%
            font-weight: bold
            text-align: center
        .clearfix
          &:after
            content: ''
            display: block
            height: 0
            clear: both
            visibility: hidden

  .headerTitle
    .title-login
      img
        width: 40px
        height: 40px
        vertical-align: middle
</style>
