<img src="https://github.com/lwxisastudent/48calls-core/blob/376ca80c74a4576b44ee146ef461cc8d59439ab1/source/images/logo.png" alt="Logo" width="100" height="100" align="right" />

# delay48

## 仓库说明

- 坐标BEJ聚聚一枚~，本人个人维护了一个河曲歌词&call本分享静态站。本仓库为该平台的开源仓库
- 【歌词】愿意收集所有河曲，包括公演曲+EP曲+早期生诞祭中产生的河曲中译
- 【Call本】参考网络零散call本，还在线的公演会参考现场，另外还有一些个人偏好的考虑
- 提供call词或意见请联系[此Organization](https://github.com/lwxisastudent)主页公开的邮箱，交友也可~

## 利用源码建立一个自己的分享平台

- 此平台由hexo+cactus(theme)魔改而成
- 【JS-hexo】公演分类功能利用hexo的tag，新增了获取对应tag首演日期和队伍颜色的方法，生成表格归纳的方法
- 【HTML-cactus】用表格方式显示歌词和call本，优化了表格显示样式

**1. 安装hexo**

``` bash
$ npm install hexo-cli -g
```

**2. 安装本仓库**

``` bash
$ git clone https://github.com/lwxisastudent/48calls.git
$ cd 48calls
$ npm install
```

**3. 安装魔改版hexo核心**

``` bash
$ cd node_modules
$ rm -rf hexo
$ git clone -b hexo https://github.com/lwxisastudent/48calls-core
$ cd hexo
$ npm install
```

**4. 安装魔改版cactus theme**

``` bash
$ cd ../../themes
$ git clone -b cactus https://github.com/lwxisastudent/48calls-core
```

**5. 运行**

``` bash
$ cd ..
$ hexo server
```

默认在4000端口下运行，在其他端口下运行请将第二句换成

``` bash
$ hexo s -p <port>
```
