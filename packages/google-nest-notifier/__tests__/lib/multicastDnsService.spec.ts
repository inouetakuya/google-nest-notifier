// @ts-ignore TS7016: Could not find a declaration file for module 'mdns-js'
import mdns from 'mdns-js'
import { EventEmitter } from 'events'

import {
  getMulticastDnsDataAll,
  queryMulticastDnsDataByDeviceNames,
  getMulticastDnsDataByDeviceName,
} from '../../src/lib/multicastDnsService'

import { multicastDnsResponseHome } from '../fixtures/multicastDnsResponseHome'
import { multicastDnsResponseNestHub } from '../fixtures/multicastDnsResponseNestHub'
import { multicastDnsResponseRpc } from '../fixtures/multicastDnsResponseRpc'

jest.useFakeTimers()

describe('multicastDnsService', () => {
  let browser: any

  beforeEach(() => {
    browser = new EventEmitter()
    browser.discover = jest.fn()
    browser.stop = jest.fn()
    mdns.createBrowser = () => browser
  })

  describe('getMulticastDnsDataAll()', () => {
    test('returns multicastDnsData[]', () => {
      const result = getMulticastDnsDataAll().then((dataArray) => {
        expect(browser.discover).toHaveBeenCalled()
        expect(browser.stop).toHaveBeenCalled()
        expect(dataArray.every((data) => data.isValid())).toBe(true)
        expect(dataArray[0].deviceName).toBe('Rachael')
        expect(dataArray[1].deviceName).toBe('Joi')
      })

      browser.emit('ready')
      browser.emit('update', multicastDnsResponseHome)
      browser.emit('update', multicastDnsResponseNestHub)
      browser.emit('update', multicastDnsResponseRpc)

      jest.runOnlyPendingTimers()

      return result
    })
  })

  describe('queryMulticastDnsDataByDeviceNames()', () => {
    describe('when deviceNames are camel cases', () => {
      test('returns multicastDnsData[]', () => {
        const deviceNames = ['Rachael', 'Joi']
        const result = queryMulticastDnsDataByDeviceNames(deviceNames).then(
          (dataArray) => {
            expect(dataArray.map((data) => data.deviceName)).toEqual(
              deviceNames,
            )
          },
        )

        browser.emit('ready')
        browser.emit('update', multicastDnsResponseHome)
        browser.emit('update', multicastDnsResponseNestHub)
        browser.emit('update', multicastDnsResponseRpc)

        jest.runOnlyPendingTimers()

        return result
      })
    })

    describe('when deviceNames are lower cases', () => {
      test('returns multicastDnsData[]', () => {
        const deviceNames = ['rachael', 'joi']
        const result = queryMulticastDnsDataByDeviceNames(deviceNames).then(
          (dataArray) => {
            expect(
              dataArray.map((data) => data.deviceName.toLowerCase()),
            ).toEqual(deviceNames)
          },
        )

        browser.emit('ready')
        browser.emit('update', multicastDnsResponseHome)
        browser.emit('update', multicastDnsResponseNestHub)
        browser.emit('update', multicastDnsResponseRpc)

        jest.runOnlyPendingTimers()

        return result
      })
    })
  })

  describe('getMulticastDnsDataByDeviceName()', () => {
    test('returns multicastDnsData', () => {
      const deviceName = 'Rachael'
      const result = getMulticastDnsDataByDeviceName(deviceName).then(
        (data) => {
          expect(data?.deviceName).toBe(deviceName)
        },
      )

      browser.emit('ready')
      browser.emit('update', multicastDnsResponseHome)
      browser.emit('update', multicastDnsResponseNestHub)
      browser.emit('update', multicastDnsResponseRpc)

      jest.runOnlyPendingTimers()

      return result
    })
  })
})
