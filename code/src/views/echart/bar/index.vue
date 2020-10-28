<template>
  <div class="app-container bar-container">
    <el-card class="filter-container" shadow="never">
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
          <el-form-item label="组件名称">
            <el-input
              v-model="listQuery.name"
              class="input-width"
              placeholder="请输入组件名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>柱图</span>
    </el-card>
    <el-card class="table-container">
      <el-row :gutter="12">
        <el-col
          :span="4"
          v-for="item in list"
          :key="item.code"
          class="bar-card"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div  @click="handleCardPage(item)">
              <img :src="item.url" class="bar-image" />
              <div style="padding: 14px; text-align: center">
                <span>{{ item.name }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList } from "@/api/bar";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: "",
  code: "",
};

export default {
  name: "home",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      total: null,
    };
  },

  created() {
    this.handleGetList();
  },
  methods: {
    // 查询
    handleSearchList() {
      this.handleGetList();
    },

    // 重置查询
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    // 获取List
    handleGetList() {
      fetchList(this.listQuery).then((response) => {
        this.total = response.data.total;
        this.list = response.data.list;
        this.list.map((item, index) => {
          item.url = require("@/assets/images/bar/" + item.pic + ".png");
        });
      });
    },
    // 分页
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.handleGetList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.handleGetList();
    },

    // 进入界面
    handleCardPage(val) {
      this.$router.push({
        name:"editor",
        params:{code:val.code}
      })
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.bar-container {
  .bar-card {
    margin-top: 10px;
    cursor: pointer;
    .bar-image {
      width: 100%;
      height: 120px;
    }
  }
}
</style>