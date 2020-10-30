<template>
  <div class="js-container" ref="editorBox">
      <div class="js-left" :style="{width:lwidth}">
          <div class="js-title">Javascript</div>
          <div class="js-area">
            <textarea ref="jsArea"></textarea>
          </div>
          <div class="js-title">Javascript-utils</div>
          <div class="js-area">
            <textarea ref="jsAreaUtils"></textarea>
          </div>
      </div>
      <div class="js-bar" :style="{left:bar_width}" @mousedown="handleMousedown" ref="bar"></div>
      <div class="js-right" :style="{left:lwidth}">

      </div>
  </div>

</template>
<!--格式化-->
 <script src="codemirror-5.31.0/lib/formatting.js"></script>
<script type="text/ecmascript-6">
  import { fetchJsCode,fetchJsCodeUtils} from "@/api/bar";


  // 引入全局实例
  import _CodeMirror from 'codemirror'
  // 核心样式
  import 'codemirror/lib/codemirror.css'
  // 引入主题后还需要在 options 中指定主题才会生效
  // import 'codemirror/theme/cobalt.css'
  import 'codemirror/theme/abcdef.css'

  // 需要引入具体的语法高亮库才会有对应的语法高亮效果
  // codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
  // 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/r/r.js'
  import 'codemirror/mode/shell/shell.js'
  import 'codemirror/mode/sql/sql.js'
  import 'codemirror/mode/swift/swift.js'
  import 'codemirror/mode/vue/vue.js'



  // 格式化json的依赖包
  // import 'codemirror/addon/lint/lint.css'
  // import 'codemirror/theme/rubyblue.css'
  // require('script-loader!jsonlint')
  // import 'codemirror/addon/lint/lint'
  // import 'codemirror/addon/lint/json-lint'
  // 尝试获取全局实例
  const CodeMirror = window.CodeMirror || _CodeMirror


  

  export default {
    name: 'in-jsCoder',
    data () {
      return {
        // codeMirror的编辑起的配置项
        // 上部分的
        jsCode: '',// 内部真实的内容
        jsMode: 'javascript',// 默认的语法类型
        jsCoder: null,// 编辑器实例
        jsOptions: {// 默认配置
          tabSize: 2,// 缩进格式
          // theme: 'cobalt',
          theme:'abcdef',// 主题，对应主题库 JS 需要提前引入
          lineNumbers: true,// 显示行号
          line: true,
          lineWrapping: true,  // 自动换行
          lint: true,// 代码出错提示
          styleActiveLine: true,// 选中行高亮
          //快捷键
          extraKeys:{
              "F7": function autoFormat(jsCoder) {
                console.log(this.jsCoder)
                  var totalLines = jsCoder.lineCount();
                        jsCoder.autoFormatRange({line:0, ch:0}, {line:totalLines});
              }//代码格式化
          },
        },
        // 下部分的
        jsCodeUtils: '',// 内部真实的内容
        jsModeUtils: 'javascript',// 默认的语法类型
        jsCoderUtils: null,// 编辑器实例
        jsOptionsUtils: {// 默认配置
          tabSize: 2,// 缩进格式
          // theme: 'cobalt',
          theme:'abcdef',// 主题，对应主题库 JS 需要提前引入
          lineNumbers: true,// 显示行号
          line: true,
          lineWrapping: true,  // 自动换行
          lint: true,// 代码出错提示
          styleActiveLine: true,// 选中行高亮
          // mode: 'application/json',
          // gutters: ['CodeMirror-lint-markers'],
        },
        // 左右拖拽屏宽度的配置
        left_width:0.5,//左部分宽度
        isMousemouse:false,//记录鼠标是否按下
        initWidth:0//鼠标距离bar容器左侧的距离


      }
    },

    // watch: {
    //   value(value) {
    //     const editorValue = this.jsonEditor.getValue()
    //     if (value !== editorValue) {
    //       this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    //     }
    //   }
    // },
    mounted () {
      // 初始化codeMirror
      this._initialize();
      // 获取jsCode的js代码
      this.getJsCode();
      // 初始化公共方法部分
      this.initCodeMirror();
    },
    computed: {
      lwidth(){
        return (this.left_width * 100) + '%'
      },
      bar_width(){
        // 5 是bar的一半宽度
        return `calc(${this.left_width *100 }% - 5px)`
      }
    },
    methods: {
      // 初始化codeMirror
      _initialize () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        // this.jsCoder = CodeMirror.fromTextArea(this.$refs.jsArea, this.jsOptions);
        this.jsCoder = CodeMirror.fromTextArea(this.$refs.jsArea, this.jsOptions);
        this.jsCoder.setSize('auto','260px');
        // 编辑器赋值
        this.jsCoder.setValue(this.jsCode)

        // 支持双向绑定
        this.jsCoder.on('change', (jsCoder) => {
          this.code = jsCoder.getValue()
          console.log( this.code)
          if (this.$emit) {
            this.$emit('input', this.code)
          }
        });


        

        
      },

      // 初始化codeMirror
      initCodeMirror () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.jsCoderUtils = CodeMirror.fromTextArea(this.$refs.jsAreaUtils, this.jsOptionsUtils);
        this.jsCoderUtils.setSize('auto','270px');
        // 编辑器赋值
        this.jsCoderUtils.setValue(this.jsCodeUtils)

        // 支持双向绑定
        this.jsCoderUtils.on('change', (jsCoderUtils) => {
          this.code = jsCoderUtils.getValue()
          console.log( this.code)
          if (this.$emit) {
            this.$emit('input', this.code)
          }
        })
      },
      // 获取jsCode的js代码
      getJsCode(data){
        fetchJsCode(this.listQuery).then((response) => {
          this.jsCoder.setValue(response.data.list);
        });

        fetchJsCodeUtils().then((response)=>{
          // console.log(JSON.stringify(response.data.list))
          let jsonData=JSON.stringify(response.data.list);
          // var result = JSON.stringify(JSON.parse(jsonData),null,4)//格式化后的json字符串形式
          // console.log(result)
          this.jsCoderUtils.setValue(response.data.list);
          console.log(this)
          // this.funChartLiquidFill=new Function('return '+response.data.list);
          let a=response.data.list
          let funcStr = "function test(value){alert(value)}";
 this.funChartLiquidFill = eval("(false || "+funcStr+")");
console.log(this)
        })
      },


      

      // 屏幕左右拖拽变化
      handleMousedown(event){
        this.isMousemouse = true
        console.log(event.srcElement)
        this.initWidth = event.pageX - event.srcElement.getBoundingClientRect().left
        // console.log(this.initWidth);
        
        // 移动的时候给document绑定事件，在容器外也能移动
        document.addEventListener('mousemove',this.handelMousemove)
        // 在框外停下鼠标不能移动，也给document绑定事件
        document.addEventListener('mouseup',this.handelMouseup)
      },

      handelMousemove(event){
        if(this.isMousemouse){
          // event.pageX:鼠标指针相对于该网页的水平位置；getBoundingClientRect().left: 容器距离页面左侧距离
          // MBoffset: 鼠标距离盒子左侧的位置
          // initWidth：鼠标距离bar容器左侧的距离
          let MBoffsetPrec = (event.pageX - this.$refs.editorBox.getBoundingClientRect().left - this.initWidth + this.$refs.bar.offsetWidth / 2)/this.$refs.editorBox.getBoundingClientRect().width

          const min = (this.$refs.bar.offsetWidth / 2) /this.$refs.editorBox.getBoundingClientRect().width
          const max = (this.$refs.editorBox.getBoundingClientRect().width - (this.$refs.bar.offsetWidth / 2)) / this.$refs.editorBox.getBoundingClientRect().width
          if(MBoffsetPrec <  min){
            MBoffsetPrec = min
            return this.left_width = MBoffsetPrec

          }else if(MBoffsetPrec > max){
            return MBoffsetPrec = max
          }
          this.left_width = MBoffsetPrec
        }else{
          return
        }
      },

      handelMouseup(){
        this.isMousemouse = false
      }

    },

    
  }
</script>



<style rel="stylesheet/scss" lang="scss"  scoped>
  .js-container{
    width: 100%;
    position: relative;
    min-height: 600px;
    .js-left{
      position: absolute;
      top: 0;
      overflow: hidden;
      .js-title{
        margin: 10px 20px;
      }
    }

    .js-bar{
      position: absolute;
      height: calc(100% - 32px);
      margin-top: 38px;
      width: 5px;
      z-index: 2;
      user-select: none;
      background: #409eff;
      cursor: pointer;
    }

    .js-right{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }

    
  }
</style>