import { test } from 'vitest'
import { baseTest } from './common/base'

test('react dev', async () => {
  await baseTest('react', 'dev')
})

test('react preview', async () => {
  await baseTest('react', 'preview')
})

test('vue dev', async () => {
  await baseTest('vue', 'dev')
})

test('vue preview', async () => {
  await baseTest('vue', 'preview')
})

test('svelte dev', async () => {
  await baseTest('svelte', 'dev')
})

test('svelte preview', async () => {
  await baseTest('svelte', 'preview')
})

test('solid dev', async () => {
  await baseTest('solid', 'dev')
}, 60000)

test('solid preview', async () => {
  await baseTest('solid', 'preview')
})

test('qwik dev', async () => {
  await baseTest('qwik', 'dev')
})

test('qwik preview', async () => {
  await baseTest('qwik', 'preview')
})
