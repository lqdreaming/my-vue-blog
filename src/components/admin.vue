<template>
  <div class="admin">
    <div class="adminHeader">
      <h5>管理员后台系统</h5>
      <div class="adminInf">
        <img src="./../assets/images/user-login.png">
        <span>{{this.$route.params.ruleForm1.username}}</span>
        <router-link :to="{name:'index'}">退出</router-link>
      </div>
    </div>
    <el-row class="tac">
      <el-col :span="6">
        <el-menu default-active="1" :default-openeds="['2','2-1','2-2','3','3-1','3-2','4','4-1','4-2']" class="el-menu-vertical-demo" background-color="#545c64" height="622px" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" @click="showIndex">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="showSetAccount">管理员列表</el-menu-item>
              <el-menu-item index="2-2" @click="showAddAccount">添加管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="showClassList">分类列表</el-menu-item>
              <el-menu-item index="3-2" @click="showAddList">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-share"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="showAticleList">文章列表</el-menu-item>
              <el-menu-item index="4-2" @click="showAddAticle">添加文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="showCommentList">评论</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="showMessageList">留言管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
  <el-col :span="18" v-if="!this.commentsListBoolean">
    <div class="showAddAccount rightContent" v-show="this.boolean[5]">
      <i class="el-icon-date"></i>
      <el-tag>设置 / 管理员列表</el-tag>
      <el-table :data="this.accoutListOne" style="width: 100%" >
        <el-table-column
          label="用户名"
          width="250">
          <template slot-scope="scope">
            <i class="el-icon-edit"></i>
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditSet(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteAccout(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page.sync="currentPage2"
          :page-size="9"
          layout="total, prev, pager, next"
          :total="this.accoutList.length">
        </el-pagination>
      </div>
    </div>

    <div class="showIndex rightContent" v-show="this.boolean[7]">
        <h2>欢迎管理博客系统</h2>
        <div class="indexClue">
          <p class="indexHint">温馨提示：</p>
          <p>该方案作为一套多功能的后台框架模板，采用了Vue + Element 框架，适用于绝大部分的后台管理系统（Web Management System）开发。</p>
        </div>
        <img src="../assets/images/admin_index.jpg">
    </div>

    <div class="showAddAccount rightContent" v-show="this.boolean[6]">
      <i class="el-icon-edit"></i>
      <el-tag>设置 / 新建管理员</el-tag>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="username" v-model="ruleForm2.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
    </div>

    <div class="classList rightContent" v-show="this.boolean[3]">
      <i class="el-icon-view"></i>
      <el-tag>分类管理 / 分类列表</el-tag>
      <el-table :data="this.classifyNameOne" style="width: 100%" >
        <el-table-column
          label="类别"
          width="250">
          <template slot-scope="scope">
            <i class="el-icon-view"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">查看所有文章</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleClassifyDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange1"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="this.classifyName.length">
        </el-pagination>
      </div>
    </div>
    <div class="addClass rightContent" v-show="this.boolean[2]">
      <i class="el-icon-sold-out"></i>
      <el-tag>分类管理 / 添加分类</el-tag>
      <div>
        <el-input v-model="input" placeholder="请添加分类" ref="classList" style="width: 350px"></el-input>
        <el-button type="primary" @click="addclassify">增加</el-button>
      </div>
    </div>

    <div class="aticleList rightContent" v-show="boolean[1]">
      <i class="el-icon-document"></i>
      <el-tag>文章管理 / 文章列表</el-tag>
      <el-table :data="this.contentListOne" style="width: 100%">
        <el-table-column
          label="日期"
          width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作者"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="阅读量"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.views }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评论"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.comments.length }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="el-button-operation" style="margin-bottom: 5px; margin-left: -10px "><el-button
              size="mini"
              @click="handleEditContent(scope.$index, scope.row)">编辑</el-button></div>
            <div style="margin-left: -10px "><el-button
              size="mini"
              type="danger"
              @click="handleArticleDelete(scope.$index, scope.row)">删除</el-button></div>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="this.contentList.length">
        </el-pagination>
      </div>

      <el-dialog title="修改文章" :visible="isContentRevise">
        <el-form :inline="true" :model="recontent" class="demo-form-inline">
          <el-form-item label="文章类别">
            <el-input :value="this.recontent.name "ref="recontentName"></el-input>
          </el-form-item>
          <el-form-item label="文章标题">
            <el-input :value="this.recontent.title" ref="recontentTitle"></el-input>
          </el-form-item>
          <el-form-item label="文章作者">
            <el-input :value="this.recontent.author" ref="recontentAuthor"></el-input>
          </el-form-item>
          <el-form-item label="文章序号">
            <el-input type="number" :value="this.recontent.id" ref="recontentNumber"></el-input>
          </el-form-item>
          <el-form-item label="阅读量">
            <el-input type="number" :value="this.recontent.views" ref="recontentViews"></el-input>
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input type="textarea" :value="this.recontent.abstract" ref="recontentAbstract"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <el-input type="textarea" :value="this.recontent.content" ref="recontentCon"></el-input>
          </el-form-item>
          <el-form-item label="发表日期">
            <el-input type="textarea" :value="this.recontent.addTime" ref="recontentAddtime"></el-input>
          </el-form-item> 
          <el-form-item label="文章配图" prop="headerImage">
            <div>
              <label for="photo">图片</label>
              <input type="file" name="photo" id="photo" @change="onfilechange">
            </div>
          </el-form-item>       
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isContentRevise = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitRevise">修 改 </el-button>
          </div>
      </el-dialog>
    </div>
    <div class="addAticle rightContent" v-show="this.boolean[0]">
      <i class="el-icon-edit-outline"></i>
      <el-tag>文章管理 / 添加文章</el-tag>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item label="文章类别">
          <el-select v-model="formInline.region" placeholder="选择类别" ref="articleName">
            <el-option v-for="item in this.classifyName" v-bind:label="item.name" v-bind:value="item.name">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="文章序号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="阅读量">
          <p><el-input type="number" v-model="form.views"></el-input></p>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input type="textarea" v-model="form.abstract"></el-input>
        </el-form-item>
        <el-form-item label="文章配图" prop="headerImage">
          <div>
            <label for="photo">图片</label>
            <input type="file" name="photo" id="photo" @change="onfilechange">
          </div>
        </el-form-item>
        <el-form-item label="文章内容" style="margin-left: 5px; height: 580px">
           <quill-editor style="margin-left: 5px; height: 450px" ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 10px;">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="commentList rightContent" v-show="this.boolean[4]">
      <i class="el-icon-bell"></i>
      <el-tag>评论</el-tag>
      <div v-for="item in this.contentListTwo" class="commentList-page">
        <p>
          <span>{{item.author}}</span>
          <span class="commentList-page-title">{{item.title}}</span>
          <span>{{item.name}}</span>
          <span><el-button
            size="mini"
            @click="handleEditConmments(item)">查看评论</el-button></span>
        </p>
      </div>
    </div>

    <div class="messageList rightContent" v-show="this.boolean[8]">
      <i class="el-icon-bell"></i>
      <el-tag>留言板</el-tag>
      <div v-for="(item, index) in this.messageListOne" class="messageList-page" :key="index">
        <div class="messageList-main">
          <div class="messageList-left">
            <img :src="item.filePath">
          </div>
          <div class="messageList-right">
            <p>
              <span>{{item.username}}</span>
              <span>{{item.time}}</span>
            </p>
            <p>
              <span v-html="emoji(item.content.toString())"></span>
            </p>
          </div>
        </div>
        <div class="item-footer-operation">
          <span class="item-footer-warning" @click="dialogTableVisible = true"><i class="el-icon-warning"></i>举报 ({{item.informBad.length}})</span>
          <span>回复 ({{item.reply.length}})</span>
          <span><img src="./../assets/images/thumb-up.png">{{item.likeName.length}}</span>
          <span><img src="./../assets/images/thumb-down.png">{{item.rejectName.length}}</span>
          <span style="margin-left: -10px "><el-button
              size="mini"
              type="danger"
              @click="handleMessageDelete(index, item)">删除</el-button></span>
        </div>

        <el-dialog title="举报内容" :visible.sync="dialogTableVisible">
          <el-table :data="item.informBad">
            <el-table-column property="informInf"></el-table-column>
          </el-table>
        </el-dialog>

        <div style="clear: both"></div>
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
            <span class="messagesList-footer-warning"><i class="el-icon-warning"></i>举报</span>
            <span style="margin-left: -10px " class="messagesList-delete"><el-button
              size="mini"
              type="primary"
              @click="handleReplyDelete(index1, item)">删除</el-button></span>
          </p>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleMessageChange"
          :current-page.sync="currentMessage"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="this.messageList.length">
        </el-pagination>
      </div>
    </div>

    </el-col>
    <el-col :span="18" v-if="this.commentsListBoolean">
      <div class="commentsList-Information">
       <div @click="goBack" class="commentListBack"><i class="el-icon-arrow-left"></i>返回</div>
        <div class="commentsListInf" v-for="(item,index) in this.commentsList">
          <p class="commentsList-up">
            <img :src="item.filePath">
            <span>{{item.username}}</span>
            <span>{{item.time}}</span>
          </p>
          <div class="commentsList-middle">{{item.content}}</div>
          <p class="commentsList-footer-operation">
            <span class="commentsList-footer-warning"><i class="el-icon-warning"></i>举报</span>
            <span @click="commentsListDelete(item, index)"><i class="el-icon-delete"></i>删除</span>
            <span><img src="./../assets/images/thumb-up.png">{{item.like}}</span>
            <span><img src="./../assets/images/thumb-down.png">{{item.reject}}</span>
          </p>
          <div class="commentsListReply" v-for="item in item.reply" v-show="item.reply != ''">
            <div id="comments-main">
              <div class="commentsList-reply-up">
                <div class="commentsList-reply-up-side">
                  <img :src="item.replyUserPath">
                </div>
                <div class="commentsList-reply-up-side">
                  <p>
                    <span class="commentsList-reply-up-uname">{{item.replyUserName}} </span><span>回复</span><span class="commentsList-reply-up-uname">{{item.commentUserName}} ：</span>
                    <span>{{item.replyContent}}</span>
                  </p>
                  <p>{{item.replyTime}}</p>
                </div>
              </div>
              <p class="commentsList-footer-reply-operation">
                <span class="commentsList-footer-warning"><i class="el-icon-warning"></i>举报</span>
                <span class="commentsList-reply">回复</span>
              </p>
            </div>
          </div>
          <div style="clear: both"> </div> 
        </div>
      </div>
    </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from 'vue-quill-editor'
import vueEmoji from './emoji.vue'

export default {
  components: {
    quillEditor,
    vueEmoji
  },
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        var exp = /^[u4E00-u9FA5uf900-ufa2dw]{4,16}$/
        if (!value.match(exp)) {
          callback(new Error('用户名必须由中文字符、数字或字母组成'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      input: '',
      formInline: {
        user: '',
        region: ''
      },
      form: {
        title: '',
        author: '',
        views: '',
        abstract: '',
        content: '',
        photo: '',
        id: ''
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
      editorOption: {
        // something config
      },
      boolean: [],
      classList: '',
      articleName: '',
      classifyName: [],
      contentList: [],
      accoutList: [],
      accoutInf: '',
      classifyList: '',
      contentListDel: '',
      recontent: Object,
      isContentRevise: false,
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      contentListOne: [],
      contentListTwo: [],
      classifyNameOne: [],
      accoutListOne: [],
      commentsList: [],
      commentsListBoolean: false,
      messageList: [],
      messageListOne: [],
      currentMessage: 1,
      informBads: [],
      dialogTableVisible: false
    }
  },
  created () {
    this.boolean[7] = true
  },
  methods: {
    onSubmit () {
      this.$nextTick(() => {
        var date = new Date()
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        this.params = {name: this.$refs.articleName.value, id: this.form.id, title: this.form.title, author: this.form.author, views: this.form.views, abstract: this.form.abstract, content: this.form.content, isAdmin: this.$route.params.ruleForm1.isAdmin, time: time}
        this.params.photo = this.form.photo
        var formdata = new FormData()
        for (var key in this.params) {   // 读取data中所要上传的内容循环append到fordata中
          if (key) {
            formdata.append(key, this.params[key])
          }
        }
        this.$http.post('/api/admin/content/add', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.status === 200) {
              alert('提交文章成功')
              console.log(res)
            }
          })
          .catch(err => {
            if (err.status === 404) {
              alert('文章各项都不能为空')
            } else if (err.status === 500) {
              alert('文章已经存在')
            }
          })
      })
    },
    onfilechange (e) {  // 获取到图片文件
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.form.photo = files[0]
    },
    /*
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
        this.dialogFormVisible = true
      })
      .catch(err => {
        if (err.status === 500) {
          alert('该用户已存在')
        } else {
          alert('注册失败')
        }
      })
    },
    */
    showIndex () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[7] = true
    },
    showSetAccount () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[5] = true
      this.params = {isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.$http.post('/api/admin/account/search', this.params)
        .then(res => {
          this.accoutList = res.body
          this.accoutListOne.length = 0
          this.accoutListOne = this.accoutList.slice(0, 9)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAddAccount () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[6] = true
    },
    showClassList () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[3] = true
      this.params = {isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.$http.post('/api/admin/category/search', this.params)
        .then(res => {
          this.classifyName = res.body
          this.classifyNameOne.length = 0
          this.classifyNameOne = this.classifyName.slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAddList () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[2] = true
    },
    showAticleList () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[1] = true
      this.params = {isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.$http.get('/api/admin/content/search')
        .then(res => {
          this.contentList = res.body
          this.contentListOne.length = 0
          this.contentListOne = this.contentList.slice(0, 5)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAddAticle () {
      this.showClassList()
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[0] = true
    },
    showCommentList () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[4] = true
      this.$http.get('/api/admin/content/search')
        .then(res => {
          this.contentList = res.body
          this.contentListTwo.length = 0
          this.contentListTwo = this.contentList.slice(0, 10)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addclassify () {
      this.params = {name: this.$refs.classList.value, isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.$http.post('/api/admin/category/add', this.params)
        .then(res => {
          if (res.status === 200) {
            alert('分类创建成功')
          }
        })
        .catch(err => {
          if (err.status === 404) {
            alert('分类不能为空')
          } else if (err.status === 500) {
            alert('分类已经存在')
          }
        })
    },
    handleEdit (index, row) {
      // console.log(index, row)
    },
    handleDelete (index, row) {
      // console.log(index, row)
    },
    handleEditConmments (item) {
      console.log(item)
      var id = item.id
      this.$http.post('/api/admin/comments/search', {id: id})
        .then(res => {
          this.commentsList = res.data
        })
        .catch(err => {
          console.log(err)
        })
      this.commentsListBoolean = true
    },
    handleClassifyDelete (index, row) {
      this.classifyList = (index, row)
      this.classifyList.isAdmin = this.$route.params.ruleForm1.isAdmin
      this.$http.post('/api/admin/category/delete', this.classifyList)
        .then(res => {
          alert('删除类别' + this.classifyList.name + '成功')
          this.showClassList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm (formName) {
      this.params = {username: this.ruleForm2.username, password: this.ruleForm2.pass, isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.$http.post('/api/admin/account/add', this.params)
        .then(res => {
          if (res.status === 200) {
            alert('管理员创建成功')
          }
        })
        .catch(err => {
          if (err.status === 404) {
            alert('用户名或密码不能为空')
          } else if (err.status === 500) {
            alert('管理员已存在')
          }
        })
    },
    handleDeleteAccout (index, row) {
      this.accoutInf = (index, row)
      this.$http.post('/api/admin/account/delete', this.accoutInf)
        .then(res => {
          alert('删除管理员' + this.accoutInf.username + '成功')
          this.showSetAccount()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleArticleDelete (index, row) {
      this.contentListDel = (index, row)
      this.$http.post('/api/admin/content/delete', this.contentListDel)
        .then(res => {
          alert('删除文章' + this.contentListDel.title + '成功')
          this.showAticleList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEditSet (index, row) {
      this.reUser = (index, row)
      this.$prompt('请修改密码', '当前用户：' + this.reUser.username, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]{6,18}$/,
        inputErrorMessage: '密码必须为6-18位数字、字母'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的密码是: ' + value
        })
        this.params = {username: this.reUser.username, password: value, isAdmin: this.$route.params.ruleForm1.isAdmin}
        this.$http.post('/api/admin/account/revise', this.params)
          .then(res => {
            if (res.status === 200) {
              alert('修改密码成功')
              this.showSetAccount()
            }
          })
          .catch(err => {
            if (err.status === 404) {
              alert('修改密码失败')
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleEditContent (index, row) {
      this.recontent = (index, row)
      this.isContentRevise = true
    },
    onSubmitOff () {
      this.isContentRevise = false
    },
    onSubmitRevise () {
      this.params = {name: this.$refs.recontentName.currentValue, title: this.$refs.recontentTitle.currentValue, author: this.$refs.recontentAuthor.currentValue, views: this.$refs.recontentViews.currentValue, id: this.$refs.recontentNumber.currentValue, abstract: this.$refs.recontentAbstract.currentValue, content: this.$refs.recontentCon.currentValue, addTime: this.$refs.recontentAddtime.currentValue, isAdmin: this.$route.params.ruleForm1.isAdmin}
      this.params.photo = this.form.photo
      var formdata = new FormData()
      for (var key in this.params) {   // 读取data中所要上传的内容循环append到fordata中
        if (key) {
          formdata.append(key, this.params[key])
        }
      }
      this.$http.post('/api/admin/content/revise', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            alert('修改成功')
            this.showAticleList()
            this.isContentRevise = false
          }
        })
        .catch(err => {
          if (err.status === 401) {
            alert('修改失败')
          }
        })
    },
    handleCurrentChange (val) {
      var startIndex = 5 * (val - 1)
      var endIndex = 5 * val - 1
      this.contentListOne.length = 0
      this.contentListOne = this.contentList.slice(startIndex, endIndex)
    },
    handleCurrentChange1 (val) {
      var startIndex1 = 10 * (val - 1)
      var endIndex1 = 10 * val - 1
      this.classifyNameOne.length = 0
      this.classifyNameOne = this.classifyName.slice(startIndex1, endIndex1)
    },
    handleCurrentChange2 (val) {
      var startIndex1 = 9 * (val - 1)
      var endIndex1 = 9 * val - 1
      this.accoutListOne.length = 0
      this.accoutListOne = this.accoutList.slice(startIndex1, endIndex1)
    },
    handleMessageChange (val) {
      var startIndex = 5 * (val - 1)
      var endIndex = 5 * val - 1
      this.messageListOne.length = 0
      this.messageListOne = this.messageList.slice(startIndex, endIndex)
    },
    goBack () {
      this.commentsListBoolean = false
    },
    commentsListDelete (item, index) {
      console.log(item)
      this.$http.post('/api/admin/comments/delete', item)
        .then(res => {
          alert('删除评论' + item.username + '成功')
          this.commentsList.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showMessageList () {
      this.boolean = [false, false, false, false, false, false, false, false, false]
      this.boolean[8] = true
      this.$http.get('/api/admin/message/search')
        .then(res => {
          this.messageList = res.body
          this.messageListOne.length = 0
          this.messageListOne = this.messageList.slice(0, 5)
          console.log(this.messageListOne)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleMessageDelete (index, item) {
      var messageListDel = item
      this.$http.post('/api/admin/message/delete', messageListDel)
        .then(res => {
          alert('删除留言' + messageListDel.username + '成功')
          this.showMessageList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleReplyDelete (index1, item) {
      var messageListDel = item
      messageListDel.index1 = index1
      this.$http.post('/api/admin/message/reply/delete', messageListDel)
        .then(res => {
          alert('删除回复' + messageListDel.replyUserName + '成功')
          this.showMessageList()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.admin
  width: 1000px
  margin: 0 auto
  background-color: rgb(225, 231, 225)
  .adminHeader
    display: flex
    width: 970px
    height: 60px
    line-height: 60px
    font-size: 22px
    color: #fff
    background-color: rgb(36, 47, 66)
    padding-left: 30px
    position: relative
    h5
      flex: 6
      font-size: 22px
    .adminInf
      flex: 1
      img
        width: 40px
        height: 40px
        vertical-align: middle
      a
        color: #fff
        &:hover
          color: red
          text-decoration: underline
  .el-row
    .el-col-6
      height: 678px
    .el-col-18
      padding-top: 20px
      .showIndex
        position: relative
      .rightContent
        padding-left: 5px
        .el-tag
          margin-bottom: 10px
          font-size: 14px
        i
          display: inline-block
          margin-left: 10px
        .commentList-page
          padding: 0px 5px
          font-size: 16px
          display: flex
          p
            flex: 4
            display: inline-block
            height: 50px
            line-height: 50px
            border-bottom: 1px solid #878D99
            span
              display: inline-block
              width: 100px
              margin-left: 40px
              vertical-align: middle
              &:last-child
                width: 70px
                font-size: 15px
                margin-left: 50px
              .el-button
                width: 80px
                span
                  display: inline-block
                  margin-left: -10px
            .commentList-page-title
              width: 250px
              height: 50px
              margin-left: -10px
              margin-right: 40px
              letter-spacing: 1px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
          .el-button-operation
            display: inline-block
            flex: 1
      .commentsList-Information
        .commentListBack
          font-size: 18px
          font-weight: bold
          margin-left: 10px
          &:hover
            color: red
            text-decoration: underline
        .commentsListInf
          margin-top: 10px
          padding-left: 8px
          border-top: 1px solid #fff
          .commentsList-up
            height: 40px
            line-height: 40px
            img
              display: inline-block
              width: 50px
              height: 50px
              margin-top: 8px
              border-radius: 50px
            span
              height: 60px
              font-size: 16px
              padding-left: 8px
              vertical-align: top
          .commentsList-middle
            font-size: 16px
            line-height: 30px
            letter-spacing: 1px
            padding-left: 60px
          .active
            display: none
          .commentsList-footer-operation
            display: block
            height: 25px
            float: right
            span
              margin-right: 15px
              cursor: pointer
              img
                width: 20px
                height: 20px
                vertical-align: middle
                margin-top: -5px
                margin-right: 2px
              .el-icon-warning
                margin-right: 4px
              .el-icon-delete
                margin-right: 4px
            .commentsList-footer-warning
              opacity: 0.5
              cursor: pointer
              &:hover
                opacity: 1
                color: red
            .commentsList-reply
              cursor: pointer
              &:hover
                color: blue
                text-decoration: underline
          .commentsListReply
            margin-top: 60px
            .commentsList-reply-up
              height: 50px
              margin-left: 50px
              margin-top: 0px
              img
                display: inline-block
                width: 45px
                height: 45px
                border-radius: 45px
              .commentsList-reply-up-side
                display: inline-block
                height: 50px
                vertical-align: middle
                p
                  height: 35px
                  .commentsList-reply-up-uname
                    font-size: 16px
                    font-weight: bold
                    color: rgb(21, 120, 124)
            .commentsList-footer-reply-operation
              float: right
              margin-right: 20px
              margin-top: 5px
              margin-bottom: 10px
              .commentsList-footer-warning
                margin-right: 30px
                opacity: 0.5
                cursor: pointer
                &:hover
                  opacity: 1
                  color: red
                .el-icon-warning
                  margin-right: 5px
              .commentsList-reply
                margin-right: 20px
                cursor: pointer
                &:hover
                  color: blue
                  text-decoration: underline
      h2
        font-size: 32px
        color: #fff
        position: absolute
        left: 10px
        top: 10px
      img
        display: inline-block
        width:750px
        height: 678px
        margin-left: -6px
        margin-top: -20px
      .indexClue
        width: 500px
        line-height: 30px
        border: 1px solid rgb(180, 200, 180)
        border-radius: 20px
        font-size: 20px
        color: #fff
        position: absolute
        left: 120px
        top: 200px
        p
          padding-left: 5px
        .indexHint
          color: red
          font-weight: bold
      .messageList
        .messageList-page
          margin-top: 25px
          margin-left: 15px
          .messageList-main
            .messageList-left
              display: inline-block
              img
                width: 45px
                height: 45px
                border-radius: 45px
                vertical-align: middle
            .messageList-right
              display: inline-block
              margin-left: 5px
              p
                font-size: 14px
                height: 20px
                line-height: 20px
                span
                  height: 20px
                  line-height: 20px
                  img
                    display: inline-block
                    width: 12px
                    height: 12px
                    padding-left: 6px
          .item-footer-operation
            height: 25px
            line-height: 25px
            float: right
            .item-footer-warning
              opacity: 0.5
              cursor: pointer
              &:hover
                opacity: 1
                color: red
            span
              margin-right: 15px
              img
                width: 20px
                height: 20px
                vertical-align: middle
                margin-top: -4px
                margin-right: 2px
              .el-icon-warning
                margin-right: 4px
              .el-button
                width: 60px
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
              .messagesList-delete
                display: inline-block
                width: 50px
                height: 28px
                opacity: 0.8
                .el-button
                  width: 40px
                  height: 28px
                  span
                    margin-left: -7px
      .block
        text-align: center
        margin: 10px 0          
</style>
