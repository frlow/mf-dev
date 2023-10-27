import { test } from 'vitest'
import { baseTest } from './common/base'

test('react dev', async () => {
  await baseTest('react', 'dev')
}, 15000)

test('react preview', async () => {
  await baseTest('react', 'preview')
}, 15000)

test('vue dev', async () => {
  await baseTest('vue', 'dev')
}, 15000)

test('vue preview', async () => {
  await baseTest('vue', 'preview')
}, 15000)

test('svelte dev', async () => {
  await baseTest('svelte', 'dev')
}, 15000)

test('svelte preview', async () => {
  await baseTest('svelte', 'preview')
}, 15000)

test('solid dev', async () => {
  await baseTest('solid', 'dev')
}, 15000)

test('solid preview', async () => {
  await baseTest('solid', 'preview')
}, 15000)

test('qwik dev', async () => {
  await baseTest('qwik', 'dev')
}, 15000)

test('qwik preview', async () => {
  await baseTest('qwik', 'preview')
}, 15000)
