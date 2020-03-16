console.log("把texturepacker导出的图重新分离出一堆Png碎图工具")

const fs = require("fs");
const path = require("path");
const parseString = require('xml2js').parseString;
const gm = require('gm').subClass({imageMagick: true});

// let plistStr = fs.readFileSync("./textures.plist").toString();
let plistStr = fs.readFileSync("./textures.plist", "utf-8")

console.log("plistStr==", plistStr)
parseString(plistStr, (err, result) => {
    if (err) {
        console.error("格式化xml失败", err)
        return;
    }
    let obj = result["plist"]["dict"][0]["dict"][0]
    console.log("obj=", obj);
    let key = obj["key"]
    let dict = obj["dict"]
    console.log("key=", key.length, dict.length);
    for (let i = 0; i < key.length; i++) {
        console.log("key=", i, key[i]);
        console.log("dict ii=", i, dict[i]);
    }

    // let texture = images("./textures.png", 1, 1, 765,72);
    let realPath = path.join(__dirname, "/resize.png")
    console.log("realPath=", realPath)
    gm('./textures.png').resize(240, 240).noProfile().write(realPath, function (err) {
        if(err){
            console.log("save failed", err)
            return;
        }
        console.log('done');
      });
    // let texture = gm('./textures.png')
    // console.log("texture", texture)
    // let texture2 = texture.crop(765, 72, 1, 1)
    // console.log("texture2", texture2)
    // texture.write('./test.png',  (err) =>{
    //     if(err){
    //         console.error('save fail', err);
    //         return;
    //     }
    //     console.log('save suc');
    //   })
    // texture.save("./test.png", {quality:100})
    // images("input.jpg")                     //Load image from file 
    //     //加载图像文件
    //     .size(400)                          //Geometric scaling the image to 400 pixels width
    //     //等比缩放图像到400像素宽
    //     .draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
    //     //在(10,10)处绘制Logo
    //     .save("output.jpg", {               //Save the image to a file, with the quality of 50
    //         quality: 50                    //保存图片到文件,图片质量为50
    //     });

});