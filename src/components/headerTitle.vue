<template>
  <div class="headerTitle">
    <div class="line"></div>
    <div class="title-logo">
        <p>
          <a href="/">
            <span>LIU</span>
            <span></span>
            <span>琦</span>
            <span>- -</span>
            <span>个人博客</span>
          </a>
        </p>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title"><router-link :to="{name:'webStudy', params:{ formData: '前端学习' } }">前端学习</router-link></template>
        <div style="width: 200px; font-size: 16px">
          <el-menu-item index="2-1"><router-link :to="{name:'webStudy', params:{ formData: 'html+CSS' } }">html+CSS</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link :to="{name:'webStudy', params:{ formData: 'JavaScript' }}">javascript</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link :to="{name:'webStudy', params:{ formData: '图像处理' }}">图像处理</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link :to="{name:'webStudy', params:{ formData: '其它' }}">其它</router-link></el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item index="3"><router-link :to="{name:'webStudy', params:{ formData: '寄情言语' } }">寄情言语</router-link></el-menu-item>
      <el-menu-item index="4"><router-link :to="{name:'aboutMe'}">关于我</router-link></el-menu-item>
      <el-menu-item index="5"><router-link :to="{name:'leaveMessage'}">留言板</router-link></el-menu-item>
    </el-menu>
    <div class="title-login">
      <img src="./../assets/images/user-login.png" v-if="!this.sysFilePath">
      <img :src="this.sysFilePath" @click="dialogFormVisible = true" v-if="this.sysFilePath">
      <span @click="dialogFormVisible = true" v-if="!this.sysFilePath" class="signIn">登陆</span>
      <span class="sysUserName">{{this.sysUserName}}</span>
      <span @click="loginExit" v-if="this.sysFilePath" class="signIn">退出</span>
    </div>
    <el-dialog title="账号登陆" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
          <el-input type="username" ref="username" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" ref="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
          <el-button @click="register()">还没有账号,请注册</el-button>
        </el-form-item>
        <el-form-item>
          <span id="qqLoginBtn"></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="账号注册" :visible.sync="registerBoolean">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="* 用户名" prop="username">
          <el-input type="username" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="* 密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="headerImage">
          <div>
            <label for="photo">头像</label>
            <input type="file" name="photo" id="photo" @change="onfilechange">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegisterForm('ruleForm2')">注册</el-button>
          <el-button @click="login()">已有账号,请登陆</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerBoolean = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="管理员登陆" :visible.sync="ruleForm2.isAdmin">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm demo-manager">
        <el-form-item>
          <h2>你好，管理员！</h2>
          <el-button>
            <router-link :to="{name:'admin',params:{ruleForm1:this.ruleForm1, isAdmin: this.ruleForm1.isAdmin}}" tag="li">
              进入管理系统
            </router-link>
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleForm2.isAdmin = false">取 消</el-button>
        <el-button type="primary" @click="ruleForm2.isAdmin = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        username: '',
        password: '',
        photo: '',
        isAdmin: false
      },
      rules2: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      registerBoolean: false,
      dialogFormVisible: false,
      ruleForm1: '',
      sysUserName: '',
      sysFilePath: '',
      activeIndex: '1'
    }
  },
  created () {
    var userInf = sessionStorage.getItem('userInf')
    if (userInf) {
      userInf = JSON.parse(userInf)
      this.sysUserName = userInf.username || ''
      this.sysFilePath = userInf.filePath || ''
    }
  },
  watch: {
    sysUserName (curVal, oldVal) {
      console.log(1)
      console.log(curVal, oldVal)
      this.sysUserName = curVal || ''
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formData = this.ruleForm2
          this.$http.post('/api/headerTitle', formData)
          .then(res => {
            console.log(res)
            this.Imagepath = ''
            this.ruleForm1 = res.body
            this.ruleForm2.isAdmin = res.body.isAdmin
            if (!this.ruleForm2.isAdmin) {
              // window.sessionStorage.removeItem('userInf')
              window.sessionStorage.setItem('userInf', JSON.stringify(this.ruleForm1))
              location.reload()
            } else {
              this.registerBoolean = false
            }
            this.dialogFormVisible = false
          })
          .catch(err => {
            console.log(err)
            alert('用户名或者密码错误')
          })
        } else {
          alert('登录错误')
        }
      })
    },
    loginExit () {
      window.sessionStorage.clear()
      location.reload()
    },
    login () {
      this.registerBoolean = false
      this.dialogFormVisible = true
    },
    register () {
      this.registerBoolean = true
      this.dialogFormVisible = false
    },
    userSignIn (userName) {
      sessionStorage.userName = userName
      this.userName = sessionStorage.userName
    },
    onfilechange (e) {  // 获取到图片文件
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.ruleForm2.photo = files[0]
    },
    submitRegisterForm (ruleForm2) {
      console.log(this.ruleForm2)
      var formdata = new FormData()
      for (var key in this.ruleForm2) {   // 读取data中所要上传的内容循环append到fordata中
        if (key) {
          formdata.append(key, this.ruleForm2[key])
        }
      }
      this.$http.post('/api/headerTitle/register', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        alert('注册成功')
        this.registerBoolean = false
        this.dialogFormVisible = true
        console.log(res)
      })
      .catch(err => {
        if (err.status === 500) {
          alert('该用户已存在')
        } else {
          alert('注册失败')
        }
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.headerTitle
  width: 1000px
  height: 60px
  line-height: 60px
  background: rgb(84, 92, 100)
  margin: 0 auto;
  display: flex
  .title-logo
    flex: 5
    p
      margin-left: 5px
      font-size: 28px
      display: inline-block
      text-align: center
      font-family:'Fruktur',cursive
      text-shadow: 0 0 20px #fdec84,
              10px -10px 30px #ffae35,
              20px -20px 40px #ec760c,
              -20px -60px 50px #cd4607,
              0px -80px 60px #973717,
              10px -40px 70px #451b0e
      transform-style: preserve-3d
      animation: run  ease-in 4s
      a
        color: #fff
    @keyframes run
      0%
        transform: rotateX(-5deg) rotateY(0)
      50%
        transform: rotateX(0) rotateY(180deg)
        text-shadow:1px 1px 1px #ccc, 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #3EFF3E, 0 0 70px #3EFFff, 0 0 80px #3EFFff, 0 0 100px #3EFFee, 0 0 150px #3EFFee
      100%
        transform: rotateX(5deg) rotateY(360deg)
  .el-menu
    li
      font-size: 18px
      .el-submenu__title
        font-size: 16px;
      a
        text-decoration: none
        font-size: 18px
        color: #fff
      .el-submenu__title
        font-size: 16px
  .title-login
    flex: 2
    img
      width: 40px
      height: 40px
      border-radius: 40px
      vertical-align: middle
      cursor: pointer
    .signIn
      color: red
      font-size: 14px
      &:hover
        color: #fff
        cursor: pointer
        text-decoration:underline
    span
      display: inline-block
      font-size: 18px
      margin-left: 2px
      vertical-align: middle
      color: #fff
    .sysUserName
      width: 50px
      height: 40px
      font-size: 14px
      line-height: 40px
      text-overflow:ellipsis
      overflow: hidden
      white-space: nowrap
  ul
    flex: 8
    display: flex
    li
      flex: 1
      font-size: 20px
      color: rgb(255,251,252)
</style>
