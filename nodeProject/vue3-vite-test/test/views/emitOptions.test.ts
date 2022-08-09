import { expect, test, it } from 'vitest'
import {
  randomVal,
  getRandomValue,
  clickChild,
} from '../../src/views/newAttrs/emitOptions/config/index'
import { Window } from 'happy-dom'

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2)
})

test('测试点击后的值', () => {
  const val = 'str'
  getRandomValue(val)
  expect(randomVal.value).toBe(val)
})

test('测试点击后的值', () => {
  // todo waldon 这个并发的测试用例有点问题
  it.concurrent('concurrent test 1', async () => {
    expect(randomVal.value).toBe('str12')
  })
  it.concurrent('concurrent test 2', async () => {
    expect(randomVal.value).toBe('str')
  })
})

test('测试', () => {
  const window = new Window()
  const document = window.document
  window.location.href = 'http://localhost:3000/'

  console.log(document)
})
