# tensorbook
Generate indexes of https://github.com/xitu/tensorflow-docs.git

## 操作步骤

  1. 安装gitbook
  2. clone 本代码
  3. 在该代码目录下 git clone https://github.com/xitu/tensorflow-docs.git
  4. 如代码中没有bookIndex.json 执行命令: npm run make-json  来生成该JSON
  5. 根据文档内容需要，调整 bookIndex.json 中索引的顺序
  6. 执行命令： npm run make-md 在tensorflow-docs目录中生成 SUMMARY.md , 该文件产生的目录结构与bookIndex.json相一致
  7. 预览： npm start
  8. 生成静态HTML npm run build
