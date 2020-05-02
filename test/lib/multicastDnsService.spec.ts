// @ts-ignore TS7016: Could not find a declaration file for module 'mdns-js'
import mdns from 'mdns-js'
import { EventEmitter } from 'events'

import {
  getMulticastDnsDataAll,
  queryMulticastDnsDataByDeviceNames,
  getMulticastDnsDataByDeviceName
} from '~/lib/multicastDnsService'

import multicastDnsResponseHome from 'test/fixtures/multicastDnsResponseHome'
import multicastDnsResponseNestHub from 'test/fixtures/multicastDnsResponseNestHub'

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
        expect(dataArray[1].deviceName).toBe('Joi')
      })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponseHome)
      browser.emit('update', multicastDnsResponseNestHub)

      jest.runOnlyPendingTimers()

      return result
    })
  })

  describe('queryMulticastDnsDataByDeviceNames()', () => {
    test('returns multicastDnsData[]', () => {
      const deviceNames = ['Rachael', 'Joi']
      const result = queryMulticastDnsDataByDeviceNames(deviceNames).then(
        dataArray => {
          expect(dataArray.map(data => data.deviceName)).toEqual(deviceNames)
        }
      )

      browser.emit('ready')
      browser.emit('update', multicastDnsResponseHome)
      browser.emit('update', multicastDnsResponseNestHub)

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
      browser.emit('update', multicastDnsResponseHome)
      browser.emit('update', multicastDnsResponseNestHub)

      jest.runOnlyPendingTimers()

      return result
    })
  })
})
