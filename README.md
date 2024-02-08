# allMock

## mock我的前端项目  

项目源自我的[砖块项目](https://github.com/zack-xy/o-bricks/tree/main/mockServer)

特点：
1. 使用ts
2. 增加接口简单
3. 支持配置多个项目
4. 支持函数配置，可根据参数mock(假服务)
5. 支持扩展Mock
6. 支持自定义mock图片(原mockjs的图片占位符不可使用，包引用方式问题，暂时不考虑解决)
7. ts-node直接启动ts
8. nodemon自动重启
9. 提供调试

### 启动
`pnpm start`


### 调试
使用vscode的Debug功能

如下配置
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "allMock",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/nodemon/bin/nodemon.js",
      "runtimeArgs": [
        "--inspect=9229",
        "-r",
        "ts-node/register",
        "--require",
        "${workspaceFolder}/tsconfig-paths.js",
        "${workspaceFolder}/src/index.ts"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "openOnSessionStart",
      "cwd": "${workspaceFolder}",
      "restart": true,
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}


```

### 技术点

+ typescript
+ ts-node
+ nodemon
+ koa2
+ canvas
+ mockjs




```javascript
// 常见的mock写法
export default {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
      /************************************************************************************/
      // 数字类
      'id|+1': 1, // 属性 id 是一个自增数，起始值为 1，每次增 1
      'number|1-10': 1, // 属性 number 是一个数字值，大小在[1-10]之间
      'number1|1-10.2': 1, // 属性 number2 是一个小数字值，大小在1-10之间，保留2位小数
      'number2|1-10.2-4': 1, // 属性 number2 是一个小数字值，大小在1-10之间，保留2-4位小数
      'number3':'@natural(60, 100)', // 属性 number3 是一个自然数，60到100
      /**
       * 同@natural类似的
       * 
       * @integer(min?,max?)  // 正负整数
       * 
       * @float( min?, max?, dmin?, dmax? ) // 小数
       * 
       */
      /************************************************************************************/
      // 字符串类
      'repeatStr|1-3': 'hello',  // 属性 repeatStr 是一个字符串，重复hello，1-3次
      'paragraph': '@paragraph', // 属性 paragraph 是一个英文段落文本，@paragraph(1, 3),1-3个段落
      'sentence':'@sentence',    // 属性 sentence 是一个英文句子，@sentence(3, 5),3-5个单词
      /**
       * @character( pool? ) // 随机单词
       * @character( 'lower/upper/number/symbol' )  // 小写/大写/数字/特殊字符
       * @character("aeiou")  // aeiou中的一个随机字符
       * 
       * 
       * @string( pool?, min?, max? )  //随机字符串
       * @string(5)   // 长度5
       * @string('lower', 5)  // lower/upper/number/symbol 小写/大写/数字/特殊字符 长度5
       * @string("lower", 1, 3)' // lower/upper/number/symbol 小写/大写/数字/特殊字符 长度1-3
       * 
       * @word // 字母
       * @title // 标题，类似@sentence
       * 
       * @cparagraph //中文段落
       * @csentence  //中文句子
       * @cword //中文字
       * @ctitle // 中文标题
       * 
       * 
       * @first // 英文名
       * @last  // 英文姓
       * @name(true) // 英文名含（中间名
       * @cfirst // 中文姓
       * @clast // 中文名
       * @cname // 中文名
       * 
       * @url // 链接
       * @domain // domain  形如：wequgj.gov
       * @protocol
       * @tld
       * @email  // 邮件地址
       * @ip // ip地址
       * @id  // 随机id
       * @guid // id：1e17F035-27fD-eDEd-b545-4DC7E6f7551c
       * @increment // 自增整数 @increment(1) // 步进1
       * @pick(['a','b']) // 从数组中随机取一个
       * 
       * 
       * 地址：
       * @region 区域，例：华南
       * @province 省
       * @city 市
       * @county 省市区
       */
       /************************************************************************************/
      // 布尔类
      'checked|1': true, // 属性 checked 是一个boolean值，true和false的概率为50%
      'checked2|1-3': true, // 属性 checked2 是一个boolean值，true的概率为1/1+3(1/4),false的概率为3/1+3(3/4)
      /************************************************************************************/
      // 日期类
      'date': '@date',  // 属性date是一个随机日期，默认是yyyy-mm-dd格式
      'time': '@time',  // 属性time是一个随机时间，默认是24小时制，HH:mm:ss
      'dateTime': '@datetime', // 随机时间，yyyy-mm-dd HH:mm:ss
      /**
       * @date("yyyy-MM-dd")  // 格式：yyyy-MM-dd、yy-MM-dd、y-MM-dd、y-M-d
       * @time("A HH:mm:ss")  // 格式：A HH:mm:ss（大写AM 07:34:34）、a HH:mm:ss（小写am 07:34:34）、H:m:s
       * @datetime("yyyy-MM-dd A HH:mm:ss") // 格式：@date和@time的组合
       * @now( unit?, format? ) //现在的时间
       */
       /************************************************************************************/
       // 图片类
       'image': '@image',  // 属性image是一个随机图片，地址是：http://dummyimage.com/xxx
       /**
        * Random.image( size?, background?, foreground?, format?, text? )
        * // 大小、背景色、文字颜色、格式、图片文字
        * @image('200x100', '#894FC4', '#FFF', 'png', 'Hello！')
        * @dataImage // mockjs包引用问题，暂不能直接使用，可以用@imageBase64
        * // @imageBase64只提供了一个最简实现，待后续完成
        * @dataImage('200x100', 'Hello Mock.js!')
        */
        @imageUrl 链接图片
       /************************************************************************************/
       // 颜色类
       'color': '@color',
       /**
        * 随机颜色值
        * @color   // #f2d879
        * @hex     // #f2d879
        * @rgb     // rgb(242, 121, 237)
        * @@rgba   // rgba(140, 121, 242, 0.84)
        * @hsl     // hsl(197, 82, 71)
        */
      /************************************************************************************/
      // 对象类
      'obAttr|3': {   // 属性 obAttr 是一个对象，属性随机取3个，如果写1-3，则随机取1-3个属性
          'name': 'Jack',
          'age': 18,
          'sex': 'male',
          'job': 'coder',
          'country': 'China'
      },
      'obAttr1': {  // 属性 obAttr1 是一个对象,对象属性固定，值随机
          'nowName|1-2': 'Coco',
          'nowAge|18-99': 20,
          'nowJob|1': ['coder','noJob']
      },
      /************************************************************************************/
      // 数组类
      'arrayAttr|1': [1, 2, 4, 5],  // 属性arrayAttr是一个值，随机从后数组内取1个值，写做arrayAttr|+1，则从第1个顺序取
      'arrayAttr1|1-3': [1, 2, 4, 5], // 属性arrayAttr1是一个数组，重复[1,2,4,5]数组，1-3次
      'arrayAttr2|1-10': [{  // 属性arrayAttr2是一个数组,有1-10个对象
          'name|+1': ['Coco','Bob','Jack']  // 对象属性是name，值按['Coco','Bob','Jack']顺序重复
      }],
      /**
       * @range(5)  // 范围5，[0,1,2,3,4]
       * @range(3, 7)  // 范围3-7,[3,4,5,6]
       * @range(1, 10, 2)  // 范围1-10,步进2, [1,3,5,7,9]
       */
       /************************************************************************************/
      // 函数生成
      'fnAttr': function () {  // 属性fnAttr的值是函数的返回，这里是[2,4,8,16]
          let arr = []
          for (let i = 1; i < 5; i++) {
              arr.push(Math.pow(2, i))
          }
          return arr
      },
      /************************************************************************************/
      // 正则生成
      'regexp3': /\d{5,10}/, // 属性regexp3的值匹配后面的正则，这里是数字5-10个
      // 自定义占位符 
      'constellation': '@constellation',  // 十二星座之一
  }]
}
```
