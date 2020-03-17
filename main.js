console.log("把texturepacker导出的图重新分离出一堆Png碎图工具")

const fs = require("fs");
const path = require("path");
const parseString = require('xml2js').parseString;
// const gm = require('gm').subClass({imageMagick: true});
const gm = require('gm')
const { createCanvas, loadImage } = require('canvas')


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

    const canvas = createCanvas(765, 72)
    const ctx = canvas.getContext('2d')
    // Draw cat with lime helmet
    loadImage('./textures.png').then((image) => {
        ctx.drawImage(image, 1, 1, 765, 72, 0, 0, 765, 72)
        // ctx.drawImage(image, 1, 1, 765, 72)
        const buf2 = canvas.toBuffer('image/png', { compressionLevel: 1, filters: canvas.PNG_FILTER_NONE })
        console.log('buf===', buf2)
        fs.writeFileSync("./test.png", buf2)
    })
});