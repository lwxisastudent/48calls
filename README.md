<img src="themes/cactus/source/images/logo.png" alt="Logo" width="100" height="100" align="right" />

# delay48

## 仓库说明

- 坐标BEJ聚聚一枚~，本人个人维护了一个河曲歌词&call本分享静态站。本仓库为该平台的开源仓库
- 【歌词】愿意收集所有河曲，包括公演曲+EP曲+早期生诞祭中产生的河曲中译
- 【Call本】参考网络零散call本，还在线的公演会参考现场，另外还有一些个人偏好的考虑
- 提供call词或意见请联系[此Organization](https://github.com/lwxisastudent)主页公开的邮箱，交友也可~

## 利用源码建立一个自己的分享平台

- 此平台基于hexo搭建
- 此平台基于魔改的cactus主题搭建，原主题：[probberechts/hexo-theme-cactus](https://github.com/probberechts/hexo-theme-cactus)

**1. 安装hexo**

``` bash
$ npm install hexo-cli -g
```

**2. 安装本仓库(hexo及插件)**

``` bash
$ git clone https://github.com/lwxisastudent/48calls.git
$ cd 48calls
$ npm install
$ npm install --save hexo-abbrlink
$ npm install --save hexo-generator-search
```

**3. 评论功能**

评论功能由Valine（基于LeanCloud）实现

1. 按照[快速开始 - Valine](https://valine.js.org/quickstart.html)中方式获得app_id & app_key
2. 在`themes/cactus/layout/_partial`下建立comments.ejs

``` ejs
<% if(theme.leancloud.enable){ %>
    <div id="vcomments"></div>
    <script>
        new Valine({
            el: '#vcomments',
            appId: '', //填入你的app_id
            appKey: '', //填入你的app_key
            avatar:'hide',
            meta: ['nick'],
            highlight: false
        })
    </script>
<% } %>
```

注意：不需要评论功能请在`themes/cactus/_config.yml`中将leadcloud.enable设置为false（默认true）

**4. 运行**

``` bash
$ cd ..
$ hexo server
```

默认在4000端口下运行，在其他端口下运行请将第二句换成

``` bash
$ hexo s -p <port>
```
