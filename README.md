# 梗体中文 · 在线打包

这里是网页部署部分，若要更新内容请前往 [基岩版仓库](https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/) 或 [Java版仓库](https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/), 由 [WebBuilderUpdateBot](https://github.com/apps/webbuilderupdatebot) 自动更新submodule

## 本地搭建
clone本仓库时请注意submodule，您应使用 ```git clone --recurse-submodules https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/```

运行网页构建环境推荐使用Python 3.7, 并安装依赖

```
pip install -r requirements.txt
```

## 自定义内容

如果你需要在网页Material标题栏下方, AppBar下方或网页脚部自定义内容，请在 `views/custom/` 目录下创建 `header.html`, `notice.html` 或 `footer.html` 。

文件内可使用 `Vuetify` 框架内容。