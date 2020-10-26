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
            <el-form-item label="奖惩对象：">
              <el-input style="width: 203px" v-model="listQuery.name" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="奖惩领域：">
              <el-input style="width: 203px" v-model="listQuery.field" placeholder="奖惩领域"></el-input>
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
      
      
<!-- <el-upload
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :limit=1
        accept="application/vnd.openxmlformats-    
        officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->


      <el-button
        class="btn-add"
        @click="handleShowAddDialog()"
        size="mini">
        添加
      </el-button>
    </div>
   
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column label="奖惩对象代码" width="110" align="center">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        
        <el-table-column label="奖惩对象名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="奖惩对象领域" align="center">
          <template slot-scope="scope">{{scope.row.field}}</template>
        </el-table-column>
        <el-table-column label="状态" width="70" align="center">
          <template slot-scope="scope"  >
            <p :style='{ color: getColorFilter(scope.row.verifyStatus)}'>
              {{scope.row.verifyStatus | verifyStatusFilter}}
            </p>
            <!-- <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVerifyDetail(scope.$index, scope.row)">惩戒详情
              </el-button>
            </p> -->
          </template>
        </el-table-column>
        <el-table-column label="主体类别" width="90" align="center">
          <template slot-scope="scope">{{scope.row.position}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="220" align="center">
          <template slot-scope="scope">{{scope.row.time}}</template>
        </el-table-column>
        <!-- <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
          </template>
        </el-table-column> -->
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
  </div>
</template>
<script>
  import {
    fetchPeoList,
    addPeoList
  } from '@/api/rule'


  const defaultListQuery = {
    name: null,
    field:null,
    pageNum: 1,
    pageSize: 5
  };
  export default {
    name: "productList",
    data() {
      return {
        dialogVisible:false,
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
    
     
     fileTemp:null,
     fileList:[]
      }
      

      
    },

    created() {
      this.getList();
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
        fetchPeoList(this.listQuery).then(response => {
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
          addPeoList(this.editInfo).then(response=>{
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
 



//上传文件时处理方法  
        handleChange(file, fileList){
            this.fileTemp = file.raw;
            if(this.fileTemp){
                if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') 
                    || (this.fileTemp.type == 'application/vnd.ms-excel')){
                     this.list=this.importfxx(this.fileTemp);
                } else {
                    this.$message({
                        type:'warning',
                        message:'附件格式错误，请删除后重新上传！'
                    })
                }
            } else {
                this.$message({
                    type:'warning',
                    message:'请上传附件！'
                })
            }
        },
        //超出最大上传文件数量时的处理方法
        handleExceed(){
            this.$message({
                type:'warning',
                message:'超出最大上传文件数量的限制！'
            })
            return;
        },
        //移除文件的操作方法
        handleRemove(file,fileList){
            this.fileTemp = null
        },


        importfxx(obj) {
            let arr=[];
            let _this = this;
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
 
            this.file = event.currentTarget.files[0];
 
            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;
 
            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //此处引入，用于解析excel
                    var XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), {
                        //手动转化
                        type: "base64"
                        });
                    } else {
                        wb = XLSX.read(binary, {
                        type: "binary"
                        });
                    }
                    
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); 
                    console.log(outdata)
                    //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
                    //此处可对数据进行处理
                    // let arr = [];
                    outdata.map(v => {
                        let obj = {}
                        // obj.code = v['Code']
                        obj.name = v['奖惩对象名称']
                        obj.verifyStatus = v['状态']
                        obj.field = v['奖惩对象领域']
                        // obj.dis = v['district']
                        arr.push(obj)
                    });
                    _this.da=arr;
                    _this.dalen=arr.length;
                    return arr;
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
            return arr;
        }

   
    }
  }
</script>
<style></style>


