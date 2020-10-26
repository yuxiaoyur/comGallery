<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <!-- <div class="xitong-title con-fhei">广西联合惩戒系统</div> -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img class="user-avatar" :src="user_bg"> -->
        <div class="user-avatar"></div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
 import user_bg from '@/assets/images/uer.jpg'
 import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      removeToken()
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
    cursor: pointer;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: url('../../../assets/images/uer.jpg')no-repeat 100% 100%;
        background-size: cover;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.xitong-title{
  color: #409eff;
  font-weight: 700;
  letter-spacing: 3px;
  float: left;
  font-size: 26px;
}

// .navbar {
//   background:#456d44;
//   height: 50px;
//   line-height: 50px;
//   border-radius: 0px !important;
   
//   .hamburger-container {
//     line-height: 58px;
//     height: 50px;
//     float: left;
//     padding: 0 10px;
//   }
//   .screenfull {
//     position: absolute;
//     right: 90px;
//     top: 16px;
//     color: red;
//   }
//   .avatar-container {
//     height: 50px;
//     display: inline-block;
//     position: absolute;
//     right: 35px;
   
//     .avatar-wrapper {
//       cursor: pointer;
//       margin-top: 5px;
//       position: relative;
      
//       .user-avatar {
//         width: 40px;
//         height: 40px;
//         border-radius: 10px;
//         background: url('../../../assets/images/uer.jpg')no-repeat 100% 100%;
//         background-size: cover;
//       }
//       .el-icon-caret-bottom {
//         position: absolute;
//         right: -20px;
//         top: 25px;
//         font-size: 12px;
//       }
//     }
//   }
// }
</style>

