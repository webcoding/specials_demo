var path = require('path')
var fs = require('fs')
// see http://vuejs-templates.github.io/webpack for documentation.

// 全相对于项目根目录，即执行命令的目录，也是package.json对应的目录
// 此文件所在目录的上级(../${__dirname})，使用


// 要求必须输入路径，如 hsq 或 zt/webpack，目前暂时使用 hsq
var appName = process.env.npm_config_path || 'hsq'
var ztDir = 'zt/'
var ztDirReg = new RegExp('^' + ztDir)
var buildDist = 'dist/'

var isSpecial = ztDirReg.test(appName)

appName = appName.replace(ztDirReg, '')

/**
 * 主项目 示例 hsq
 *
 * name: 'hsq',
 * app: 'hsq',
 * dist: 'dist/hsq',
 *
 *
 * 专题项目 示例 webpack
 *
 * name: 'webpack',
 * app: 'zt/webpack',
 * dist: 'dist/zt/webpack',
 * ztFolder: '', // 专题文件夹绝对路径，用于列出专题路径
 */

var project = {
  name: appName,
  app: appName,
  dist: buildDist + appName,
}

console.log('')
console.log('    build: ', project.app)
console.log('     dist: ', project.dist)
console.log('')

if (isSpecial) {
  project = {
    name: appName,
    app: ztDir + appName,
    dist: buildDist + ztDir + appName,
  }

  // 专题文件夹绝对路径
  // 使用 __dirname 而不是process.cwd()，好处是，运行命令根目录或子目录都可以运行，但配置前者稳定
  var ztFolder = path.join(__dirname, '../' + ztDir)
  // 比对 specials 下专题目录，检测参数是否正确
  var projectList = fs.readdirSync(ztFolder).reduce((entries, dir) => {
    const fullDir = path.join(ztFolder, dir)
    const entry = path.join(fullDir, 'src/main.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[ztDir + dir] = [entry]
    }

    return entries
  }, {})

  // 输出所有 zt 项目
  // console.log(projectList)
  // console.log('')

  if (!projectList[project.app]) {
    console.log('错误提示: ', 'dir error! please check input path! ')
    console.log('')
    console.log('')
  }
}


// 都是绝对路径
// console.log('__dirname ', __dirname)          // .../zt/config
// console.log('__filename ', __filename)        // .../zt/config/index.js
// console.log('process.cwd() ', process.cwd())  // .../zt

// console.log(project)

module.exports = project
