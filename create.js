#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import prompts from 'prompts'
import { blue, cyan, green, lightBlue, red, reset } from 'kolorist'
// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()
const FRAMEWORKS = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
  },
  {
    name: 'svelte',
    display: 'Svelte',
    color: red,
  },
  {
    name: 'solid',
    display: 'Solid',
    color: blue,
  },
  {
    name: 'qwik',
    display: 'Qwik',
    color: lightBlue,
  },
]
const TEMPLATES = FRAMEWORKS.map((f) => [f.name]).reduce(
  (a, b) => a.concat(b),
  [],
)
const renameFiles = {
  _gitignore: '.gitignore',
}
const defaultTargetDir = 'mfe-project'
/**
 * @returns {Promise<void>}
 */
async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t
  let targetDir = argTargetDir || defaultTargetDir
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir
  let result
  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `,
                )
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      },
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }
  // user choice associated with prompts
  const { framework, overwrite, packageName, variant } = result
  const root = path.join(cwd, targetDir)
  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  // determine template
  let template = variant || framework?.name || argTemplate
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  console.log(`\nScaffolding project in ${root}...`)
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../templates',
    `template-${template}`,
  )
  const write = (file, content) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }
  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(
    (f) => !['package.json', 'node_modules'].includes(f),
  )) {
    write(file)
  }
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
  )
  pkg.name = packageName || getProjectName()
  fixDependencies(pkg.dependencies)
  fixDependencies(pkg.devDependencies)
  write('package.json', JSON.stringify(pkg, null, 2) + '\n')
  const cdProjectName = path.relative(cwd, root)
  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(
      `  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`,
    )
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn start')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run start`)
      break
  }
  console.log()
}
/**
 * @param {any} deps
 * @returns {void}
 */
function fixDependencies(deps) {
  if (!deps) return
  Object.keys(deps).forEach((key) => {
    deps[key] = deps[key].replace(/workspace:./, 'latest')
  })
}
/**
 * @param {string | undefined} targetDir
 * @returns {string}
 */
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}
/**
 * @param {string} src
 * @param {string} dest
 * @returns {void}
 */
function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}
/**
 * @param {string} projectName
 * @returns {boolean}
 */
function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}
/**
 * @param {string} projectName
 * @returns {string}
 */
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}
/**
 * @param {string} srcDir
 * @param {string} destDir
 * @returns {void}
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
/**
 * @param {string} path
 * @returns {boolean}
 */
function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}
/**
 * @param {string} dir
 * @returns {void}
 */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}
/**
 * @param {string | undefined} userAgent
 * @returns {{ name: string; version: string; }}
 */
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}
init().catch((e) => {
  console.error(e)
})
/** @typedef {(str: string | number) => string} ColorFunc */
/**
 * @typedef {Object} Framework
 * @property {string} name
 * @property {string} display
 * @property {ColorFunc} color
 */
/**
 * @typedef {Object} FrameworkVariant
 * @property {string} name
 * @property {string} display
 * @property {ColorFunc} color
 * @property {string} [customCommand]
 */
