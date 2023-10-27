import {afterEach, test} from 'vitest'
import {baseTest, viteServer} from './common/base'

const testDev = process.env.MODE === "dev"
const timeout = 10000

afterEach(async ()=>{
  await viteServer.close()
})

test('react dev', async () => {
  await baseTest('react', 'dev', testDev)
}, timeout)

test('react preview', async () => {
  await baseTest('react', 'preview', testDev)
}, timeout)

test('vue dev', async () => {
  await baseTest('vue', 'dev', testDev)
}, timeout)

test('vue preview', async () => {
  await baseTest('vue', 'preview', testDev)
}, timeout)

test('svelte dev', async () => {
  await baseTest('svelte', 'dev', testDev)
}, timeout)

test('svelte preview', async () => {
  await baseTest('svelte', 'preview', testDev)
}, timeout)

test('solid dev', async () => {
  await baseTest('solid', 'dev', testDev)
}, timeout)

test('solid preview', async () => {
  await baseTest('solid', 'preview', testDev)
}, timeout)

test('qwik dev', async () => {
  await baseTest('qwik', 'dev', testDev, true)
}, timeout)

test('qwik preview', async () => {
  await baseTest('qwik', 'preview', testDev, true)
}, timeout)
