const fs = require('fs');

let data = {};
function handleDir(dir){

    const mdFile = dir+"/index.md";
    let title = getFileName(dir),
        op = dir.replace(/tensorflow-docs\//,'');

    console.log("--------: "+op+"  "+op.indexOf("."))
    if(op.indexOf(".")==0)
        return;

    if(op.charAt("./")==0){
        op = op.substr(2);
        console.log("jklkl")
    }

    const k = op.replace(/\//g,'.');
    const obj={};

    const exis = fs.existsSync(mdFile);
    if(exis){
        title = getMdTitle(mdFile);
        let link =  mdFile.replace(/tensorflow-docs\//,'');
        if(link.charAt("./")==0){
            link = link.substr(2);
        }
        obj.link=link;
    }else {
        obj.link="#";
    }
    obj.title = title;
    setData(k, obj, data)
}
function handleFile(file){
    const mdFile = file;
    let title = getFileName(file),
        op = file.replace(/tensorflow-docs\//,'');
    if(title ==="index" || op === "README.md" || op ==="SUMMARY.md")
        return;

    if(op.charAt("./")==0){
        op = op.substr(2);
        console.log("jklkl")
    }

    const kArr = op.split('/');
    kArr[kArr.length-1]=title;
    const k = kArr.join('.');
    const obj = {};

    const exis = fs.existsSync(mdFile);
    if(exis){
        title = getMdTitle(mdFile);
        let link =  mdFile.replace(/tensorflow-docs\//,'');
        if(link.charAt("./")==0){
            link = link.substr(2);
        }
        obj.link=link;
    }else {
        obj.link="#";
    }
    obj.title = title;

    setData(k, obj, data);
}

function getMdTitle(path) {
    const lines = require('fs').readFileSync(path, 'utf-8')
        .split('\n')
        .filter(Boolean);
    for (const line of lines){
        const arr = line.split(" ");
        if(arr[0]=="#")
            return arr[1]
    }
    return getFileName(path)
}

function getFileName(path) {
    if(path){
        const arr = path.split("/")
        const fullName = arr[arr.length-1]
        return fullName.split(".")[0];
    }
    return "";
}

function setData(k, v, obj) {
    const kArr = k.split('.');
    if(kArr.length>1){
        const nkArr = kArr.slice(1);
        if(!obj[kArr[0]])
            obj[kArr[0]]={};
        setData(nkArr.join('.'), v, obj[kArr[0]]);
    }else {
        obj[kArr[0]] = v;
    }
}

function recursion(path, dirHandler, fileHandler) {
    const exist = fs.existsSync(path);
    if(!exist) return;
    const files = fs.readdirSync(path, {withFileTypes:true});

    if(files){
        for (const f of files){
            const filePath = path+"/"+f.name;
            if(f.isDirectory()){
                if(f.name.indexOf(".")!=0){

                    dirHandler(filePath);
                    recursion(filePath, dirHandler, fileHandler);
                }
            }
            else{
                fileHandler(filePath);
            }
        }
    }
}



recursion("tensorflow-docs", handleDir, handleFile)
console.log(data);
let json = JSON.stringify(data, null, 4);
fs.writeFile('bookIndex.json', json, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
//console.log(getMdTitle('./tensorflow-docs/README.md'))

//const tt = [0,1,2,3];
//console.log(tt.slice(1));