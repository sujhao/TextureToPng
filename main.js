console.log("把texturepacker导出的图重新分离出一堆Png碎图工具")

const fs = require("fs");
const parseString = require('xml2js').parseString;


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
        console.log("dict ii=", i,dict[i]);
    }
});