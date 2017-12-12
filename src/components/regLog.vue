<template>
  <div class="regLog">
    <el-dialog title="账号登陆" :visible.sync="mydialogFormVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="mydialogFormVisible = false">取 消</el-button>
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
      ruleForm1: '',
      sysUserName: '',
      sysFilePath: '',
      mydialogFormVisible: this.dialogFormVisible
    }
  },
  props: [
    'dialogFormVisible'
  ],
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
      this.sysUserName = curVal || ''
    },
    dialogFormVisible (val) {
      this.mydialogFormVisible = val
    },
    mydialogFormVisible (val) {
      this.$emit('showState', val)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formData = this.ruleForm2
          this.$http.post('/api/headerTitle', formData)
          .then(res => {
            alert(res)
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
            this.mydialogFormVisible = false
          })
          .catch(err => {
            console.log(err)
            alert('用户名或者密码错误')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginExit () {
      window.sessionStorage.clear()
      location.reload()
    },
    login () {
      this.registerBoolean = false
      this.mydialogFormVisible = true
    },
    register () {
      this.registerBoolean = true
      this.mydialogFormVisible = false
    },
    userSignIn (userName) {
      sessionStorage.userName = userName
      this.userName = sessionStorage.userName
      console.log(this.userName)
    },
    onfilechange (e) {  // 获取到图片文件
      var files = e.target.files || e.dataTransfer.files
      console.log(files)
      if (!files.length) return
      this.ruleForm2.photo = files[0]
    },
    submitRegisterForm (ruleForm2) {
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
        this.mydialogFormVisible = true
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

</style>
