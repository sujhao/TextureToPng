

# 把texturepacker导出的图重新分离出一堆Png碎图工具

## nodejs实现

```
npm install xml2js   //xml文件读取

npm install canvas  //图片剪切
```

## main.js做了啥
```
读取分析textures.plist文件，然后根据描述裁剪切textures.png文件输出到output目录
```


