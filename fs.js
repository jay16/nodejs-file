
var fs = require('fs')
var path = require('path')
var relative = require('relative')
var rm = require('rimraf')
var mkdirp = require("mkdirp")
var chalk = require('chalk')

console.error(chalk.green('chalk is great!'))

let funCopyFile = (fromFile, toFile) => {
  var source = fs.createReadStream(fromFile);
  var dest = fs.createWriteStream(toFile);

  source.pipe(dest);
  source.on('end', function() { console.log(chalk.gray('拷贝: ' + fromFile + '=>' + toFile)); });
  source.on('error', function(err) { console.log(err); });
};

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let debuggerPath = 'debugger-fs'
fs.exists(debuggerPath, isExist => {
  if(isExist) return false

  console.log(chalk.gray('创建: ' + debuggerPath))
  mkdirp(debuggerPath, err => {
    if (err) {
      console.error(chalk.red('创建失败: ' + err))
      return false
    }
    console.log(chalk.green('创建成功'))

    debuggerPath = `${debuggerPath}/index.js`
    console.log(chalk.gray('写入: ' + debuggerPath))
    fs.writeFile(debuggerPath, "export default {};", err => {
      if (err) {
        console.error(console.log(chalk.red('写入失败: ' + err)))
        return false
      }
      console.log(chalk.green('写入成功'))

      funCopyFile(debuggerPath, `${debuggerPath}.one`)
      funCopyFile(debuggerPath, `${debuggerPath}.two`)
      funCopyFile(debuggerPath, `${debuggerPath}.three`)
      
      console.log(chalk.gray('删除: ' + `${debuggerPath}.two`))
      rm(`${debuggerPath}.two`, rmErr => {
        if(rmErr) {
          console.error(chalk.red('删除失败: ' + err))
        } else {
          console.error(chalk.green('删除成功'))
        }
      })
    });
  });
})


