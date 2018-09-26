const packager = require('electron-packager')

const options = {
  dir: './',
  // afterCopy: [],
  // afterExtract: [],
  // afterPrune: [],
  // // appCopyright,
  // // appVersion,
  arch: 'x64',
  // asar: false,
  // buildVersion,
  // derefSymlinks,
  // download,
  ignore: filePath => {
    if (filePath.startsWith('/node_modules')) return true
    if (filePath.startsWith('/src')) return true
    // if (filePath.startsWith('/release-builds')) return true
    if (filePath.startsWith('/public')) return true
    if (filePath.startsWith('/.vscode')) return true
    if (filePath.startsWith('/webpack.config')) return true
    if (filePath.startsWith('/.babelrc')) return true
    if (filePath.startsWith('/.gitignore')) return true
    if (filePath.startsWith('/yarn')) return true
    if (filePath.startsWith('/distribute')) return true
    if (filePath.startsWith('/main')) return true
    if (filePath.startsWith('/server')) return true
    if (filePath.startsWith('/defaults')) return true
    if (filePath.startsWith('/utils')) return true

    console.log(filePath)
    // if (filePath !== '') return true // will be ignored
    return false // won't be ignored
  },
  out: './release-builds',
  platform: 'win32',
  overwrite: true,
  prune: true
}

console.log('begin packaging app...')

packager(options).then(appPaths => {
  console.log('Apps created in folder:')
  appPaths.map(app => console.log(app))
})
