# 梗体中文 · 在线打包

这里是网页部署部分，若要更新内容请前往 [基岩版仓库](https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/) 或 [Java版仓库](https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/), 由 [WebBuilderUpdateBot](https://github.com/apps/webbuilderupdatebot) 自动更新引用。

## 本地搭建

clone本仓库时请注意子模块，使用 ```git clone --recursive https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/``` 确保子模块内容一并拉取。

运行网页构建环境要求Python版本最低为3.9，推荐使用最新的稳定版，并安装依赖：

``` bash
pip install -r requirements.txt
```

## 自定义内容

如果你需要在网页Material标题栏下方、AppBar下方或网页脚部自定义内容，请在 `views/custom/` 目录下创建 `header.html`, `notice.html` 或 `footer.html` 。

文件内可使用 `Vuetify` 框架内容。

## 法律

我们根据 Apache 2.0 协议，在 2020 年 10 月 2 日规定以下附加协议：

Based on Apache 2.0 License, we added the following additional license on Oct.2, 2020:

使用本仓库搭建的公开网站，除非拥有 Teahouse Studios 的书面授权，均应声明其与 Teahouse Studios 无关，并链接到官方下载链接 <https://dl.meme.teahou.se/>.

Any public website built on this repository should clarify that the website is not affiliated with Teahouse Studios and should provide a link to the official link <https://dl.meme.teahou.se>, except with written permission from Teahouse Studios.

本附加协议具有追溯性，即在 2020 年 10 月 2 日之前本仓库的版本也同样受本附加协议的限制。

This additional license is retrospective, that is versions of this repository before Oct.2, 2020, are also restricted by this license.
