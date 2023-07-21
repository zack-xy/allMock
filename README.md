# allMock

## mock我的前端项目  

项目源自我的[砖块项目](https://github.com/zack-xy/o-bricks/tree/main/mockServer)


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
+ koa2
+ mockjs
