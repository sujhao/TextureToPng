console.log("把texturepacker导出的图重新分离出一堆Png碎图工具")
"use strict"

const fs = require("fs");
const path = require("path");
const parseString = require('xml2js').parseString;
const { createCanvas, loadImage } = require('canvas')


let plistStr = fs.readFileSync("./textures.plist", "utf-8")
let inputTexturePath = "./textures.png"

let outputPath = "./output"

if (!fs.existsSync(outputPath)) {
    console.log('文件夹不存在', outputPath);
    fs.mkdirSync(outputPath)
}

console.log("plistStr==", plistStr)
parseString(plistStr, async (err, result) => {
    if (err) {
        console.error("格式化xml失败", err)
        return;
    }
    let obj = result["plist"]["dict"][0]["dict"][0]
    console.log("obj=", obj);
    let key = obj["key"]
    let dict = obj["dict"]
    const myimg = await loadImage(inputTexturePath)
    for (let i = 0; i < key.length; i++) {
        let filePath = path.join(outputPath, key[i])
        // console.log("dict[i]=", dict[i]);
        let keyArr = dict[i]["key"]
        // console.log("keyArr=",keyArr);
        let stringArr = dict[i]["string"]
        let stringReplace = stringArr[3].replace(/{/g, "")
        stringReplace = stringReplace.replace(/}/g, "")
        let location = stringReplace.split(",")
        let startX = parseInt(location[0])
        let startY = parseInt(location[1])
        let pngWidth = parseInt(location[2])
        let pngHeight = parseInt(location[3]);
        let isRotate = false;
        let tempValue = 0;
        if (dict[i]["true"] && dict[i]["true"].length == 1) {
            isRotate = true;
            tempValue = pngWidth;
            pngWidth = pngHeight
            pngHeight = tempValue;
        }
        console.log("filePath=", filePath, isRotate);
        // console.log("startX==", startX);
        // console.log("startY==", startY);
        // console.log("pngWidth==", pngWidth);
        // console.log("pngHeight==", pngHeight);
        let canvas = createCanvas(pngWidth, pngHeight)
        let ctx = canvas.getContext('2d')
        ctx.drawImage(myimg, startX, startY, pngWidth, pngHeight, 0, 0, pngWidth, pngHeight)
        let buf2 = canvas.toBuffer('image/png', { compressionLevel:6, filters: canvas.PNG_FILTER_NONE })
        fs.writeFileSync(filePath, buf2)
        // if(isRotate){ //本来想把由于合图旋转的图片旋转回来，发现写的不对，注释掉
        //     let rotatePic = await loadImage(filePath)
        //     canvas = createCanvas(pngHeight, pngWidth)
        //     ctx = canvas.getContext('2d')
        //     ctx.drawImage(rotatePic, 0, 0, pngWidth, pngHeight, 0, 0, pngHeight, pngWidth)
        //     buf2 = canvas.toBuffer('image/png', { compressionLevel: 6, filters: canvas.PNG_FILTER_NONE })
        //     fs.writeFileSync(filePath, buf2)
        // }
    }
});
