// @ts-ignore TS7016: Could not find a declaration file for module 'mdns-js'
import mdns from 'mdns-js'

import { EventEmitter } from 'events'
import * as multicastDnsService from '~/lib/multicastDnsService'
import multicastDnsResponse from 'test/fixtures/multicastDnsResponse'

describe('multicastDnsService', () => {
  describe('getMulticastDnsDataAll()', () => {
    // @ts-ignore TS7005: Variable 'browser' implicitly has an 'any' type.
    let browser: any

    beforeEach(() => {
      browser = new EventEmitter()
      browser.discover = jest.fn()
      browser.stop = jest.fn()
      mdns.createBrowser = () => browser
    })

    test('returns multicastDnsData[]', () => {
      const result = multicastDnsService
        .getMulticastDnsDataAll()
        .then(dataArray => {
          expect(browser.discover).toHaveBeenCalled()
          expect(browser.stop).toHaveBeenCalled()
          expect(dataArray[0].deviceName).toBe('Rachael')
        })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponse)

      jest.runAllTimers()

      return result
    })
  })

  describe('queryMulticastDnsDataByDeviceName()', () => {
    // @ts-ignore TS7005: Variable 'browser' implicitly has an 'any' type.
    let browser: any

    beforeEach(() => {
      browser = new EventEmitter()
      browser.discover = jest.fn()
      browser.stop = jest.fn()
      mdns.createBrowser = () => browser
    })

    test('returns multicastDnsData[]', () => {
      const deviceName = 'Rachael'

      const result = multicastDnsService
        .queryMulticastDnsDataByDeviceName(deviceName)
        .then(dataArray => {
          expect(browser.discover).toHaveBeenCalled()
          expect(browser.stop).toHaveBeenCalled()
          expect(dataArray[0].deviceName).toBe(deviceName)
        })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponse)

      jest.runAllTimers()

      return result
    })
  })
})
