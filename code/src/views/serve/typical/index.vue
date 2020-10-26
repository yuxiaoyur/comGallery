<template> 
  <div class="app-container">
    <div class="con-title-box">
      <div>
        <i class="el-icon-search"></i>
        <span>高级搜索</span>
      </div>
    </div>
    <el-card class="filter-container con-mar20" shadow="never" >
      <div>
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="对象名称:">
              <el-input style="width: 203px" v-model="listQuery.name" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="操作人员:">
              <el-input style="width: 203px" v-model="listQuery.people" placeholder="人员名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearchList()">查询</el-button>
              <el-button @click="handleResetSearch()">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
    </el-card>
    <div class="con-title-box con-mar20">
      <div>
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </div>
      
      <!-- <el-button
        class="btn-add"
        @click="handleShowAddDialog()"
        size="mini">
        添加
      </el-button> -->
    </div>
   
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column label="code" width="110" align="center">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="惩戒原因" align="center">
          <template slot-scope="scope">{{scope.row.reson}}</template>
        </el-table-column>
   
        <el-table-column label="惩戒依据" width="150" align="center">
          <template slot-scope="scope">{{scope.row.gist}}</template>
        </el-table-column>
         <el-table-column label="惩戒内容" width="90" align="center">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
        <el-table-column label="操作人" width="90" align="center">
          <template slot-scope="scope">{{scope.row.people}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="220" align="center">
          <template slot-scope="scope">{{scope.row.time}}</template>
        </el-table-column>
        <el-table-column label="操作" width="90"  align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="添加奖惩对象"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form label-width="150px">
        <el-form-item label="奖惩对象名称">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="奖惩对象领域">
          <el-input v-model="editInfo.field"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="editInfo.verifyStatus"></el-input>
        </el-form-item>
        <el-form-item label="主体类别">
          <el-input v-model="editInfo.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogxiang"
      width="40%">
      <el-form label-width="150px">
        <el-form-item label="企业CODE">
          <el-input v-model="examList.code"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="examList.name"></el-input>
        </el-form-item>
        <el-form-item label="惩戒原因">
          <el-input v-model="examList.reson"></el-input>
        </el-form-item>
        <el-form-item label="惩戒依据">
          <el-input v-model="examList.gist"></el-input>
        </el-form-item>
        <el-form-item label="惩戒内容">
          <el-input v-model="examList.content"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="examList.people"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="examList.time"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogxiang = false">取 消</el-button>
        <el-button type="primary"  @click="dialogxiang = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    fetchTpyList
  } from '@/api/serve'


  const defaultListQuery = {
    name: null,
    people:null,
    pageNum: 1,
    pageSize: 5
  };
  export default {
    name: "productList",
    data() {
      return {
        dialogVisible:false,
        dialogxiang:false,
        examList:{},
        editInfo:{
          name:'',
          field:"",
          verifyStatus:"",
          position:""
        },
       
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
    
     
     
      
    
      }
    },
    created() {
      this.getList();
      console.log(this.listQuery)
    },

    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '惩戒';
        } else {
          return '未惩戒';
        }
      },
      
    },
    methods: {
      // 获取列表状态
      getColorFilter(value){
        if (value === 1) {
          return '#ff0000';
        } else {
          return '#67c23a';
        }
      },
      // 获取list
      getList() {
        this.listLoading = true;
        fetchTpyList(this.listQuery).then(response => {
          this.listLoading = false;
          // this.$message({
          //     message: '查询成功',
          //     type: 'success',
          //     duration: 1000
          // });
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      // 打开添加弹窗
      handleShowAddDialog(index,row){
        this.dialogVisible=true;
      },

      // 添加
      handleAdd(){
        this.$confirm('是否要进行添加', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          // addPeoList(this.editInfo).then(response=>{
          //   console.log(response)
          //   this.$message({
          //     message: '添加成功',
          //     type: 'success',
          //     duration: 1000
          //   });
          //   this.dialogVisible=false;
          // });
        });
      },
      

      // 分页
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      // 重置查询
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      // 查询
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
 
      handleShowProduct(index,list){
        console.log(list)
        this.dialogxiang=true;
        this.examList=list;
      }


   
    }
  }
</script>
<style></style>


