<template>
  <div id="leaveMessageReply">
    <el-input
      contenteditable="true"
      type="textarea"
      :rows="2"
      placeholder="请回复留言"
      v-model="value" class="reply-content">
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
    <p class="reply-btns">
      <el-button size="small" type="primary" class="reply-btn"  @click="subReply()">提交<i class="el-icon-success el-icon--right"></i></el-button>
      <el-button size="small" type="primary" class="reply-btn" @click="deleteReply()">取消<i class="el-icon-error el-icon--right"></i></el-button>
    </p>
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
      value: '',
      myleaveMessageIndex: this.leaveMessageIndex,
      showEmoji: false,
      data: []
    }
  },
  props: [
    'leaveMessageIndex',
    'replyInfIndex',
    'replyInfRow'
  ],
  watch: {
    leaveMessageIndex (val) {
      this.myleaveMessageIndex = val
    },
    myleaveMessageIndex (val) {
      this.$emit('showReplyState', val)
    }
  },
  created () {
    console.log(this.replyInfIndex)
    console.log(this.replyInfRow)
  },
  methods: {
    deleteReply () {
      this.myleaveMessageIndex = -1
    },
    selectEmoji (code) {
      this.showEmoji = false
      this.value += code
    },
    subReply () {
      var userInf = sessionStorage.getItem('userInf')
      if (userInf) {
        userInf = JSON.parse(userInf)
        this.sysUserName = userInf.username || ''
        this.sysFilePath = userInf.filePath || ''
        var date = new Date()
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        this.data.push(this.value)
        var leaveReplyCon = this.data
        var replyData = {replyUserName: this.sysUserName, replyUserPath: this.sysFilePath, replyIndex: this.replyInfIndex, commentfilePath: this.replyInfRow.filePath || this.replyInfRow.replyUserPath, commentUserName: this.replyInfRow.username || this.replyInfRow.replyUserName, commentContent: leaveReplyCon.toString(), replyTime: time}
        if (leaveReplyCon.toString() === '') {
          alert('回复留言不能为空')
        } else if ((leaveReplyCon.toString()).length < 3) {
          alert('回复留言至少输入3个字')
        } else {
          this.$http.post('/api/headerTitle/leaveMessage/reply', {replyData: replyData}).then((res) => {
            alert('回复成功')
            this.$emit('showReplydata', replyData)
          })
          this.myleaveMessageIndex = -1
        }
      } else {
        alert('请先您登录')
      }
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
#leaveMessageReply
  width: 600px
  height: 100px
  margin: 0 auto
  .reply-content
    width: 550px
    margin-left: 50px
  .reply-btns
    display: inline-block
    float: right
    margin-top: 8px
    .reply-btn
      display: inline-block
      width: 55px
      height: 30px
      float: right
      &:last-child
        margin-right: 10px
      span
        display: inline-block
        margin-left: -5px
  .icon
    display: inline-block
    position: relative
    margin-top: 10px
    margin-left: 45px
    .iconfont
      height: 25px
      cursor: pointer
      color: blue
      img
        width: 20px
        height: 20px
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
</style>
