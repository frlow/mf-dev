import {test} from 'vitest'
import {baseTest} from './common/base'

const testDev = process.env.MODE === "dev"

test('react dev', async () => {
  await baseTest('react', 'dev', testDev)
}, 15000)

test('react preview', async () => {
  await baseTest('react', 'preview', testDev)
}, 15000)

test('vue dev', async () => {
  await baseTest('vue', 'dev', testDev)
}, 15000)

test('vue preview', async () => {
  await baseTest('vue', 'preview', testDev)
}, 15000)

test('svelte dev', async () => {
  await baseTest('svelte', 'dev', testDev)
}, 15000)

test('svelte preview', async () => {
  await baseTest('svelte', 'preview', testDev)
}, 15000)

test('solid dev', async () => {
  await baseTest('solid', 'dev', testDev)
}, 15000)

test('solid preview', async () => {
  await baseTest('solid', 'preview', testDev)
}, 15000)

test('qwik dev', async () => {
  await baseTest('qwik', 'dev', testDev)
}, 15000)

test('qwik preview', async () => {
  await baseTest('qwik', 'preview', testDev)
}, 15000)
