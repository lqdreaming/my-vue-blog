<template>
  <div id="reply">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请回复评论"
      v-model="textreply" class="reply-content">
    </el-input>
    <p class="reply-btns">
      <el-button size="small" type="primary" class="reply-btn"  @click="subReply()">提交<i class="el-icon-success el-icon--right"></i></el-button>
      <el-button size="small" type="primary" class="reply-btn" @click="deleteReply()">取消<i class="el-icon-error el-icon--right"></i></el-button>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      textreply: '',
      mycommentsListBoolean: this.commentsListBoolean
    }
  },
  props: [
    'commentsListBoolean',
    'replyInfIndex',
    'replyInfRow'
  ],
  watch: {
    commentsListBoolean (val) {
      this.mycommentsListBoolean = val
    },
    mycommentsListBoolean (val) {
      this.$emit('showReplyState', val)
    }
  },
  created () {
    console.log(this.replyInfIndex)
    console.log(this.replyInfRow)
  },
  methods: {
    deleteReply () {
      this.mycommentsListBoolean = -1
    },
    subReply () {
      var userInf = sessionStorage.getItem('userInf')
      if (userInf) {
        userInf = JSON.parse(userInf)
        this.sysUserName = userInf.username || ''
        this.sysFilePath = userInf.filePath || ''
        var date = new Date()
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        var replyData = {replyUserName: this.sysUserName, replyUserPath: this.sysFilePath, id: this.replyInfRow.id, replyIndex: this.replyInfIndex, commentfilePath: this.replyInfRow.filePath || this.replyInfRow.replyUserPath, commentUserName: this.replyInfRow.username || this.replyInfRow.replyUserName, commentContent: this.textreply, num: this.replyInfRow.num, replyTime: time}
        this.$http.post('/api/headerTitle/pageContent1/reply', {replyData: replyData}).then((res) => {
          console.log(res)
          alert('评论成功')
          this.$emit('showReplydata', replyData)
        })
      } else {
        alert('请先您登录！')
        return
      }
      this.mycommentsListBoolean = -1
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
#reply
  width: 1000px
  height: 180px
  margin: 0 auto
  .reply-content
    width: 900px
    margin-left: 50px
  .reply-btns
    width: 800px
    width: 900px
    margin-left: 50px
    margin-top: 8px
    .reply-btn
      display: inline-block
      width: 60px
      height: 30px
      float: right
      &:last-child
        margin-right: 10px
      span
        display: inline-block
        margin-left: -5px
</style>
