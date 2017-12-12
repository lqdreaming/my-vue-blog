<template>
  <div class="leaveMessage">
    <headerTitle></headerTitle>
    <p class="crumbs-main">
      <i class="el-icon-location"></i>
      <span>您当前的位置:</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>留言板</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <div style="float: left" class="leaveMessage-left">
      <div class="leaveMessage-bck">
        <p>在这人生的旅途，还有多少风景来不及回顾，驻足停留片刻，留下您的足迹，蓦然回首，既无风雨也无晴！ -题记</p>
      </div>

      <div class="pageMessages">
        <h3>留言板</h3>
        <div v-if="this.userInf" class="MessagesInput">
          <el-input
            contenteditable="true"
            type="textarea"
            :rows="4"
            placeholder="来说两句吧"
            v-model="value">
          </el-input>
            <!--表情-->
            <div class="icon clearfix">
              <span class="iconfont" @click="showEmoji = !showEmoji"><img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698803-icon-6-smiling-face-128.png"> 添加表情</span>
              <transition name="fade" mode="">
                <div class="emoji-box" v-if="showEmoji" >
                  <el-button 
                    class="pop-close" 
                    :plain="true" 
                    type="danger" 
                    size="mini" 
                    icon="close"
                    @click="showEmoji = false"></el-button>
                    <vue-emoji
                      @select="selectEmoji">
                    </vue-emoji>
                  <span class="pop-arrow arrow"></span>
                </div>       
              </transition>
            </div>
              <button node-type="issue" class="btn-fw" @click="subComments"></button>
            </div>
            <p v-if="!this.userInf" class="isMessages">
              <span>留下您的足迹，</span>
              请先<span @click="isdialogFormVisible" class="signIn">登陆!</span>
            </p>
            <div class="leaveMessage-title">
              <p class="leaveMessage-title-one">
                <span>留言</span>
                <span>{{this.leaveContentsSec.length}} 条留言</span>
              </p>
              <p class="leaveMessage-title-sec">最新留言</p>
            </div>
            <div class="comment">
              <div v-for="(item,index) in this.leaveContentsSec" :key="index" class="item">
                <div class="messagesListcontent">
                  <span><img :src="item.filePath"></span>
                  <span>
                    <p>
                      <span class="item-username">{{item.username}}</span>
                      <span class="item-time">{{item.time}}</span>
                    </p>
                    <p v-html="emoji(item.content)" class="item-content"></p>
                  </span>
                  <div class="item-footer-operation">
                    <span class="item-footer-warning" @click="inform(item)"><i class="el-icon-warning"></i>举报</span>
                    <span class="item-reply" @click="isReply(item, index)">回复</span>
                    <span @click="approval(item)" :class="item.thumbBoolean? 'thumb-active' : ''"><img src="./../assets/images/thumb-up.png">{{item.likeName.length}}</span>
                    <span @click="reject(item)" :class="item.thumbBoolean1? 'thumb-active' : ''"><img src="./../assets/images/thumb-down.png">{{item.rejectName.length}}</span>
                  </div>
                  <leaveMessageReply v-if="index == leaveMessageIndex" :leaveMessageIndex="leaveMessageIndex" :replyInfIndex='item.index' :replyInfRow='item' v-on:showReplyState="changeReplyState" v-on:showReplydata="changeReplydata"></leaveMessageReply>
                </div>

                  <div class="messagesListReply" v-for="(item, index1) in item.reply" :key="index1" v-show="item">
                    <div class="messagesList-reply-up">
                      <div class="messagesList-reply-up-side">
                        <img :src="item.replyUserPath">
                      </div>
                      <div class="messagesList-reply-up-side">
                        <p>
                          <span class="messagesList-reply-up-uname">{{item.replyUserName}}</span><span>回复</span><span class="messagesList-reply-up-uname">{{item.commentUserName}}：</span>
                          <span v-html="emoji(item.replyContent.toString())"></span>
                        </p>
                        <p>{{item.replyTime}}</p>
                      </div>
                    </div>
                    <p class="messagesList-footer-reply-operation">
                      <span class="messagesList-footer-warning" @click="inform(item, index1)"><i class="el-icon-warning"></i>举报</span>
                      <span class="messagesList-reply" @click="isReply1(item, index1)">回复</span>
                    </p>
                    <leaveMessageReply v-if="index1 == leaveMessageIndex1 && number == item.index" :leaveMessageIndex='leaveMessageIndex1' :replyInfIndex='item.index' :replyInfRow='item' v-on:showReplyState="changeReplyState1"></leaveMessageReply>
                  </div>

              </div>
              <el-button type="primary" :loading="false" class="load-messages-more" @click="loadMessageMore()" v-if="this.leaveContents.length != 0">加载更多评论</el-button>
              <el-button type="primary" :loading="false" class="load-messages-more" v-if="this.leaveContents.length == 0">没有更多评论</el-button>
            </div>
      </div>

    </div>
    <regLog v-on:showState="changeState" :dialogFormVisible='this.dialogFormVisible' :visible.sync="this.dialogFormVisible"></regLog>
    <sectionRight style="float: left"></sectionRight>
    <div style="clear: both"></div>
    <FooterPart></FooterPart>
  </div>
</template>

<script type="text/ecmascript-6">
import headerTitle from './headerTitle'
import sectionRight from './section_right'
import FooterPart from './FooterPart'
import regLog from './regLog'
import vueEmoji from './emoji.vue'
import leaveMessageReply from './leaveMessageReply'

export default {
  components: {
    headerTitle,
    sectionRight,
    FooterPart,
    regLog,
    vueEmoji,
    leaveMessageReply
  },
  data () {
    return {
      leaveContents: [],
      userInf: '',
      dialogFormVisible: false,
      value: '',
      showEmoji: false,
      data: [],
      replyData: '',
      leaveMessageIndex: -1,
      leaveMessageIndex1: -1,
      number: -1,
      leaveContentsOne: [],
      leaveContentsSec: []
    }
  },
  created () {
    if (sessionStorage.getItem('userInf')) {
      this.userInf = sessionStorage.getItem('userInf')
    }
    this.getStatus()
  },
  watch: {
    leaveMessageIndex: 'getStatus',
    leaveMessageIndex1: 'getStatus',
    number: 'getStatus'
  },
  methods: {
    getStatus () {
      this.$http.get('/api/headerTitle/leaveMessage').then((res) => {
        this.leaveContents = []
        this.leaveContents = res.data
        this.leaveContentsOne = this.leaveContents.sort(this.compare('time'))
        this.leaveContentsSec = this.leaveContentsOne.splice(0, 4)
        console.log(this.leaveContentsSec)
        var name1 = sessionStorage.getItem('userInf')
        if (!name1) {
          for (var j = 0; j < this.leaveContentsSec.length; j++) {
            this.leaveContentsSec[j].thumbBoolean = false
            this.leaveContentsSec[j].thumbBoolean1 = false
          }
        } else {
          var name = JSON.parse(name1).username
          for (var i = 0; i < this.leaveContentsSec.length; i++) {
            if (this.leaveContentsSec[i].likeName.indexOf(name) !== -1) {
              this.leaveContentsSec[i].thumbBoolean = true
            } else {
              this.leaveContentsSec[i].thumbBoolean = false
            }
            if (this.leaveContentsSec[i].rejectName.indexOf(name) !== -1) {
              this.leaveContentsSec[i].thumbBoolean1 = true
            } else {
              this.leaveContentsSec[i].thumbBoolean1 = false
            }
          }
        }
      })
    },
    isdialogFormVisible () {
      this.dialogFormVisible = true
    },
    changeState (val) {
      this.dialogFormVisible = val
    },
    changeReplyState (val) {
      this.leaveMessageIndex = val
    },
    changeReplydata (replyData) {
      this.replyData = replyData
      console.log(this.replyData)
    },
    changeReplyState1 (val) {
      this.leaveMessageIndex1 = val
    },
    compare (property) {
      return function (a, b) {
        var value1 = new Date(a[property]).getTime()
        var value2 = new Date(b[property]).getTime()
        return value2 - value1
      }
    },
    subComments () {
      var name1 = sessionStorage.getItem('userInf')
      var name = JSON.parse(name1).username
      var filePath = JSON.parse(name1).filePath
      var date = new Date()
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      this.data.push(this.value)
      var leaveCon = this.data
      var index = this.leaveContentsSec.length + 1
      var reply = []
      if (leaveCon.toString() === '') {
        alert('留言不能为空')
      } else if ((leaveCon.toString()).length < 6) {
        alert('留言至少输入6个字')
      } else {
        this.messageData = {username: name, time: time, content: leaveCon.toString(), reply: reply, index: index, filePath: filePath, likeName: [], rejectName: []}
        this.$http.post('/api/headerTitle/leaveMessage', {messageData: this.messageData}).then((res) => {
          if (res.status === 200) {
            alert('留言成功')
            this.getStatus()
          } else {
            alert('留言失败')
          }
        })
      }
      this.data = []
      this.leaveCon = ''
    },
    selectEmoji (code) {
      this.showEmoji = false
      this.value += code
      // this.data.push(this.value)
    },
    isReply (item, index) {
      this.leaveMessageIndex = index
      if (this.replyData) {
        item.reply.push(this.replyData)
      }
    },
    isReply1 (item, index1) {
      this.leaveMessageIndex1 = index1
      this.number = item.index
    },
    approval (item) {
      var name1 = sessionStorage.getItem('userInf')
      console.log(!name1)
      if (!name1) {
        alert('请您先登录')
      } else {
        var name = JSON.parse(name1).username
        var messageData = {itemData: item, approveName: name}
        this.$http.post('/api/headerTitle/leaveMessage/reply/approve', {messageData: messageData}).then((res) => {
          if (res.data === '取消点赞成功') {
            item.thumbBoolean = false
            var position = item.likeName.indexOf(name)
            item.likeName.splice(position, 1)
          } else if (res.data === '点赞成功') {
            item.thumbBoolean = true
            item.likeName.push(name)
          } else {
            alert('点赞失败')
          }
        })
      }
    },
    reject (item) {
      var name1 = sessionStorage.getItem('userInf')
      if (!name1) {
        alert('请您先登录')
      } else {
        var name = JSON.parse(name1).username
        var messageData = {itemData: item, refuseName: name}
        this.$http.post('/api/headerTitle/leaveMessage/reply/reject', {messageData: messageData}).then((res) => {
          if (res.data === '取消点拒成功') {
            item.thumbBoolean1 = false
            var position = item.rejectName.indexOf(name)
            item.rejectName.splice(position, 1)
          } else if (res.data === '点拒成功') {
            item.thumbBoolean1 = true
            item.rejectName.push(name)
          } else {
            alert('点拒失败')
          }
        })
      }
    },
    inform (item) {
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
        this.$http.post('/api/headerTitle/leaveMessage/reply/inform', {informData: item}).then((res) => {
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
    },
    loadMessageMore () {
      if (this.leaveContentsOne.length !== 0) {
        var leaveContentsMore = this.leaveContentsOne.splice(0, 4)
        for (var i = 0; i < leaveContentsMore.length; i++) {
          this.leaveContentsSec.push(leaveContentsMore[i])
        }
      }
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

.leaveMessage
  width: 1000px
  margin: 0 auto
  h2
    font-size: 16px
    margin-top: 0px
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
  .leaveMessage-left
    width: 650px
    .leaveMessage-bck
      width: 650px
      height: 400px
      background-image: url(./../assets/images/leaveMessage.jpg)
      background-size: 650px 400px
      p
        width: 350px
        font-size: 20px
        line-height: 40px
        font-family: '微软雅黑'
        font-weight: bold
        margin-left: 160px
        padding-top: 130px
        color:  #0000CD
        filter: Alpha(Opacity = 60)
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)
    .pageMessages
      padding: 20px 4px
      h3
        width: 120px
        height: 40px
        line-height: 40px
        text-align: center
        border-radius: 10px
        font-size: 20px
        margin-bottom: 10px
        color: #fff
        background: #EE7700
        &:hover
          color: red
      .MessagesInput
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
        .icon
          display: inline-block
          position: relative
          margin-top: 10px
          .iconfont
            height: 25px
            cursor: pointer
            color: blue
            img
              width: 25px
              height: 25px
              vertical-align: middle
          .emoji-box
            position: absolute
            z-index: 10
            left: -10px
            top: 24px
            box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2)
            background: white
            .el-button
              position: absolute
              border: none
              color: #FF4949
              right: 12px
              top: 12px
              z-index: 10
            .arrow
              left: 10px
          .submit
            float: right
      .comment
        margin-top: 20px
        .item
          margin-top: 20px
          padding: 10px
          margin: 0
          border-bottom: 1px solid #DCDCDC
          .messagesListcontent
            span
              display: inline-block
              &:nth-child(1)
                opacity: 0.7
                img
                  width: 50px
                  height: 50px
                  border-radius: 50px
              &:nth-child(2)
                p
                  font-size: 13px
                  .item-time
                    margin-left: 330px
                    opacity: 0.6
                  .item-username
                    color: #FF4500
                .item-content
                  font-size: 12x
                  padding-top: 10px
            .item-footer-operation
              height: 25px
              line-height: 25px
              margin-left: 410px
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
              .thumb-active
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
          .messagesList-reply
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
          .messagesListReply
            margin-bottom: 35px
            .messagesList-reply-up
              height: 40px
              margin-left: 50px
              margin-top: 10px
              img
                display: inline-block
                width: 40px
                height: 40px
                border-radius: 40px
              .messagesList-reply-up-side
                display: inline-block
                height: 40px
                vertical-align: middle
                p
                  height: 25px
                  margin-left: 10px
                  .messagesList-reply-up-uname
                    font-size: 12px
                    font-weight: bold
                    color: rgb(21, 120, 124)
                  span
                    display: inline-block
                    margin-left: -4px
                    img
                      width: 18px
                      height: 18px
            .messagesList-footer-reply-operation
              float: right
              margin-right: 20px
              margin-bottom: 5px
              .messagesList-footer-warning
                margin-right: 30px
                opacity: 0.5
                cursor: pointer
                &:hover
                  opacity: 1
                  color: red
                .el-icon-warning
                  margin-right: 5px
              .messagesList-reply
                margin-right: 20px
                cursor: pointer
                &:hover
                  color: blue
                  text-decoration: underline
        .load-messages-more
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
      .fade-enter-active, .fade-leave-active 
        transition: opacity .5s
      .fade-enter, .fade-leave-active
        opacity: 0
      .fade-move
        transition: transform .4s
      .list-enter-active, .list-leave-active
        transition: all .5s
      .list-enter, .list-leave-active
        opacity: 0
        transform: translateX(30px)
      .list-leave-active
        position: absolute !important
      .list-move
        transition: all .5s
      .isMessages
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
      .leaveMessage-title
        margin-top: 20px
        font-family: '微软雅黑'
        .leaveMessage-title-one
          height: 30px
          font-size: 16px
          line-height: 30px
          span
            display: inline-block
            height: 30px
            color: rgb(67, 152, 237)
            &:nth-child(1)
              width: 80px
              border: 1px solid rgb(67, 152, 237)
              border-bottom: none
              border-radius: 10px 10px 0 0
              text-align: center
            &:nth-child(2)
              padding-left: 480px
              margin-left: -5px
              border-bottom: 1px solid rgb(67, 152, 237)
        .leaveMessage-title-sec
          height: 30px
          line-height: 30px
          font-size: 16px
          margin: 10px 0
          padding-left: 5px
          color: rgb(67, 152, 237)
          border-left: 5px solid rgb(67, 152, 237)
          border-radius: 5px
</style>
