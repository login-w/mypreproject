<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">高校绩效工作量管理系统</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            <span class="drop-text">{{userInfo.name}}</span>
<!--            <img src="../static/1.jpg">-->
            <img :src="userInfo.img">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router
                   unique-opened
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <div v-if="achievementDisplay">
              <el-submenu :index="index+''" v-for="(item,index) in this .$router.options.routes"
                          :key="index" v-if="item.path!='/'">
                <template slot="title">
                  <i :class="item.icon" style="color: aquamarine"></i>
                  <span style="color: #f4f4f4">{{item.name}}</span>
                </template>
                <el-menu-item :index="children.path"
                              v-if="!children.hidden"
                              v-for="(children,indexj) in item.children">
                  <i :class="children.icon" style="color: aquamarine"></i>
                  <span style="color: #f4f4f4">{{children.name}}</span>

                </el-menu-item>
              </el-submenu>
            </div>
            <div v-if="achievementNoDisplay">
              <el-submenu :index="index+''" v-for="(item,index) in this .$router.options.routes"
                          :key="index" v-if="item.path!='/'&& item.path!='/3'">
                <template slot="title">
                  <i :class="item.icon" style="color: aquamarine"></i>
                  <span style="color: #f4f4f4">{{item.name}}</span>
                </template>
                <el-menu-item :index="children.path"
                              v-if="!children.hidden"
                              v-for="(children,indexj) in item.children">
                  <i :class="children.icon" style="color: aquamarine"></i>
                  <span style="color: #f4f4f4">{{children.name}}</span>

                </el-menu-item>
              </el-submenu>
            </div>

          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path!='/home'"
                         class="homeRouterView">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-if="this.$router.currentRoute.path=='/home'" class="homeWelcome">
            欢迎来到高校绩效工作量管理系统
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      user:"",
      test1:"",
      achievementDisplay:"",
      achievementNoDisplay:"",
      userInfo:{
        name:"",
        img:""
      }
    }
  },
  mounted() {
    this.test1=this.$router.currentRoute.path!='/home'
    this.initPositions();
  },
  methods: {
    initUser(){
      this.user=null;
    },
    initUserInfo(){
      this.name=null;
      this.userInfo=null;
    },
    initPositions(){
      this.initUser();
      this.initUserInfo();
      this.user=JSON.parse(window.localStorage.getItem("user"));


      if(this.user.mid!=null){
        this.userInfo=this.user.managerInfo;
        this.userInfo.img=this.user.img;
        this.achievementNoDisplay=false;
        this.achievementDisplay=true;
      }
      if(this.user.sid!=null){
        this.userInfo=this.user.student;
        this.userInfo.img=this.user.img;
        this.achievementNoDisplay=true;
        this.achievementDisplay=false;
      }
      if(this.user.tid!=null){
        this.userInfo=this.user.teacher;
        this.userInfo.img=this.user.img;
        this.userInfo.name=this.user.teacher.tname;
        this.achievementNoDisplay=false;
        this.achievementDisplay=true;
      }
    },
    menuClick(index) {
      this.$router.push(index);
    },
    commandHandler(command){
      if (command=='logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清空用户信息
          window.localStorage.removeItem("tokenStr");
          window.localStorage.removeItem("user");
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });

      }

    }
  }
}
</script>

<style scoped>
.homeRouterView{
  margin-top: 10px;
  margin-bottom: 20px;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eff;
  padding-top: 100px;
}
.homeHeader {
  background: #212225;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #989ea4;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}

.el-dropdown-link span {
  font-family: 华文新魏;
  font-size: 20px;
  align-content: center;
  text-align: center;
  color: #11ab99;
}

</style>