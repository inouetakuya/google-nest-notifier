// @ts-ignore TS7016: Could not find a declaration file for module 'mdns-js'
import mdns from 'mdns-js'
import { EventEmitter } from 'events'

import {
  getMulticastDnsDataAll,
  queryMulticastDnsDataByDeviceName,
  getMulticastDnsDataByDeviceName
} from '~/lib/multicastDnsService'

import multicastDnsResponse from 'test/fixtures/multicastDnsResponse'

jest.useFakeTimers()

describe('multicastDnsService', () => {
  // @ts-ignore TS7005: Variable 'browser' implicitly has an 'any' type.
  let browser: any

  beforeEach(() => {
    browser = new EventEmitter()
    browser.discover = jest.fn()
    browser.stop = jest.fn()
    mdns.createBrowser = () => browser
  })

  describe('getMulticastDnsDataAll()', () => {
    test('returns multicastDnsData[]', () => {
      const result = getMulticastDnsDataAll().then(dataArray => {
        expect(browser.discover).toHaveBeenCalled()
        expect(browser.stop).toHaveBeenCalled()
        expect(dataArray[0].deviceName).toBe('Rachael')
      })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponse)

      jest.runOnlyPendingTimers()

      return result
    })
  })

  describe('queryMulticastDnsDataByDeviceName()', () => {
    test('returns multicastDnsData[]', () => {
      const deviceName = 'Rachael'
      const result = queryMulticastDnsDataByDeviceName(deviceName).then(
        dataArray => {
          expect(dataArray[0].deviceName).toBe(deviceName)
        }
      )

      browser.emit('ready')
      browser.emit('update', multicastDnsResponse)

      jest.runOnlyPendingTimers()

      return result
    })
  })

  describe('getMulticastDnsDataByDeviceName()', () => {
    test('returns multicastDnsData', () => {
      const deviceName = 'Rachael'
      const result = getMulticastDnsDataByDeviceName(deviceName).then(data => {
        expect(data?.deviceName).toBe(deviceName)
      })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponse)

      jest.runOnlyPendingTimers()

      return result
    })
  })
})
