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
            <el-form-item label="公司名称：">
              <el-input style="width: 250px" v-model="listQuery.name" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="惩戒状态：">
              <el-select style="width: 250px" v-model="listQuery.verifyStatus" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="录入状态：">
              <el-select style="width: 150px" v-model="listQuery.nameStatus" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in nameOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
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
        <el-table-column label="公司名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="公司标识" align="center">
          <template slot-scope="scope">{{scope.row.field}}</template>
        </el-table-column>
        <el-table-column label="奖惩状态" width="80" align="center">
          <template slot-scope="scope"  >
            <p :style='{ color: getColorFilter(scope.row.verifyStatus)}'>
              {{scope.row.verifyStatus | verifyStatusFilter}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="录入状态" width="80" align="center">
          <template slot-scope="scope"  >
            <p :style='{ color: getColorFilter(scope.row.nameStatus)}'>
              {{scope.row.nameStatus | nameStatusFilter}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="主体类别" width="80" align="center">
          <template slot-scope="scope">{{scope.row.position}}</template>
        </el-table-column>
        <el-table-column label="建立时间" width="90" align="center">
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
        <el-form-item label="公司名称">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="奖惩对象领域">
          <el-input v-model="editInfo.field"></el-input>
        </el-form-item>
        <el-form-item label="惩戒状态：">
            <el-select style="width: 260px" v-model="editInfo.verifyStatus" class="input-width" placeholder="全部" clearable>
            <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入状态：">
            <el-select style="width: 260px" v-model="editInfo.nameStatus" class="input-width" placeholder="全部" clearable>
            <el-option v-for="item in nameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
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
        <el-form-item label="企业名称">
          <el-input v-model="examList.name"></el-input>
        </el-form-item>
        <el-form-item label="企业标识">
          <el-input v-model="examList.field"></el-input>
        </el-form-item>
        <el-form-item label="奖惩状态">
          <el-input v-model="examList.verifyStatus"></el-input>
        </el-form-item>
        <el-form-item label="录入状态">
          <el-input v-model="examList.nameStatus"></el-input>
        </el-form-item>
        <el-form-item label="法人类别">
          <el-input v-model="examList.position"></el-input>
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
    fetchSubList,
    addSubList
  } from '@/api/subjet'


  const defaultListQuery = {
    name: null,
    verifyStatus:null,
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
          nameStatus:"",
          position:""
        },
       
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
    
        statusOptions: [
          {
            label: '惩戒',
            value: 1
          },
          {
            label: '未惩戒',
            value: 0
          }
        ],
        nameOptions: [
          {
            label: '录入',
            value: 1
          },
          {
            label: '未录入',
            value: 0
          }
        ]
     
      
    
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

      nameStatusFilter(value){
        if (value === 1) {
          return '录入';
        } else {
          return '未录入';
        }
      }
      
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
        fetchSubList(this.listQuery).then(response => {
          // this.$message({
          //     message: '查询成功',
          //     type: 'success',
          //     duration: 1000
          // });
          this.listLoading = false;
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
          addSubList(this.editInfo).then(response=>{
            console.log(response)
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1000
            });
            this.dialogVisible=false;
          });
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
        this.examList.verifyStatus=this.examList.verifyStatus==1?"惩戒":"未惩戒";
        this.examList.nameStatus=this.examList.nameStatus==1?"录入":"未录入";
      }



   
    }
  }
</script>
<style></style>


