const fs = require('fs');
const idx = require('./bookIndex');
let mdArr = ['# Summary'];
//"git clone https://github.com/xitu/tensorflow-docs.git"
function makeLine(indent, obj){
    let t="",l="";
    if(obj.title){
        t = obj.title;
        l = obj.link;
        if(l && l.indexOf(".md")>0)
            mdArr.push(`${indent}* [${t}](${l})`)
    }
    for(const k in obj){

        if(k !== "title" && k !== "link"){
            makeLine((indent===undefined? "":indent+"\t"), obj[k]);
        }
    }
    // indent = indent===undefined? "":indent;
    //  if(l.indexOf(".md")>0)
    //     mdArr.push(`${indent}* [${t}](${l})`)
}

makeLine(undefined, idx);
console.log(mdArr.join('\n'));
fs.writeFile('tensorflow-docs/SUMMARY.md', mdArr.join('\n'), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
