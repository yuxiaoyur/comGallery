<template>
  <div class="app-container jsonEditor-container">
    <el-card class="filter-container" shadow="never" >
      <div 
        @click="handleLink()"
        class="json-link-box"
      >
        <i class="el-icon-info"></i>
        <span>查询接口名称</span>
        <span class="json-link">(点击进入api系统，获取接口名称，账号XXX,密码XXXXX)</span>
      </div>
    </el-card>
    <el-card class="filter-container" shadow="never" style="margin-top: 20px">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 30px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="接口环境" prop="env">
            <el-select
              v-model="listQuery.env"
              placeholder="请选择接口环境"
            >
              <el-option
                v-for="item in env"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口模块" prop="db">
            <el-select
              v-model="listQuery.db"
              placeholder="请选择接口模块"
            >
              <el-option
                v-for="item in db"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入搜索">
            <el-input
              v-model="listQuery.path"
              class="input-width"
              placeholder="请输入接口"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>JSON数据</span>
    </el-card>
    <div class="table-container">
      <vue-json-editor
        v-model="json"
        :show-btns="true"
        :mode="'code'"
        lang="zh"
        @json-change="onJsonChange"
        @json-save="onJsonSave"
        @has-error="onError"
      ></vue-json-editor>
    </div>
  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
import { fetchList, editList } from "@/api/jsonEdit";

const defaultListQuery = {
  path: "",
  env: "pro",
  db: "cd_jjtj",
};

export default {
  name: "home",
  data() {
    return {
      json: {
        msg: "demo of jsoneditor",
      },

      listQuery: Object.assign({}, defaultListQuery),

      env: [
        { label: "正式环境", value: "pro" },
        { label: "测试环境", value: "test" },
      ],

      db: [
        { label: "社会诉求", value: "cd_mssq" },
        { label: "经济运行", value: "cd_jjtj" },
        { label: "社会管理", value: "cd_shgl" },
        { label: "环境保护", value: "cd_hjbh" },
        { label: "市场监管", value: "cd_scjg" },
        { label: "公共服务", value: "cd_ggfw" },
      ],

      editList:{}
    };
  },

  components: {
    vueJsonEditor,
  },
  methods: {
    onJsonChange(value) {
      // console.log("value:", value);
    },
    onJsonSave(value) {
      console.log("value:", value);
      this.handleEditList();
    },
    onError(value) {
      console.log("value:", value);
    },

    // 查询
    handleSearchList() {
      this.handleGetList();
    },

    // 重置查询
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    // 获取jSON
    handleGetList() {
      fetchList(this.listQuery).then((response) => {
        console.log(response)
        this.editList=response.data;
        this.json = response.data.config;
      });
    },

    // 修改jSON
    handleEditList() {
      this.$confirm("是否要进行修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        
        this.editList.config=this.json
        editList(this.editList).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.json = response;
        });
      });
    },

    // 进入API
    handleLink(){
      window.open("https://api.lishengmao.com");
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.jsonEditor-container {
  .json-link-box{
    cursor: pointer;
    .json-link {
      font-size: 10px;
      color:#6b6b6b;
    }
  }

  .json-link-box:hover{
    color: #66b1ff;
  }
  
}
</style>