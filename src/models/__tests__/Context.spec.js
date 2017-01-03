/* eslint-disable max-nested-callbacks */
import { List } from 'immutable'
import expect, { spyOn, restoreSpies } from 'expect'

import { Context, __internals__ } from '../Context'
import ParameterContainer from '../ParameterContainer'

describe('models/Context.js', () => {
  afterEach(() => restoreSpies())
  describe('{ Context }', () => {
    describe('#fields', () => {
      it('should have a `constraints` field', () => {
        const constraints = 'test'
        const data = { constraints }

        const instance = new Context(data)

        expect(instance.get('constraints')).toEqual(constraints)
      })

      it('should have a `type` field', () => {
        const type = 'test'
        const data = { type }

        const instance = new Context(data)

        expect(instance.get('type')).toEqual(type)
      })
    })

    describe('-methods', () => {
      describe('@filter', () => {
        it('should call __internals__.filter', () => {
          const expected = 123141
          spyOn(__internals__, 'filter').andReturn(expected)

          const context = new Context()
          const actual = context.filter()

          expect(actual).toEqual(expected)
          expect(__internals__.filter).toHaveBeenCalled()
        })

        it('should call __internals__.filter with correct arguments', () => {
          const expected = 123141
          spyOn(__internals__, 'filter').andReturn(expected)

          const context = new Context({
            constraints: new List([ 1, 2, 3 ])
          })
          const container = new ParameterContainer({ headers: List([ 1, 2, 3 ]) })
          const actual = context.filter(container)

          expect(actual).toEqual(expected)
          expect(__internals__.filter).toHaveBeenCalled(context, container)
        })
      })
    })
  })

  describe('@filter', () => {
    it('should return null if no ParameterContainer', () => {
      const container = null
      const context = new Context()

      const expected = null
      const actual = __internals__.filter(context, container)

      expect(actual).toEqual(expected)
    })

    it('should return null if paramContainer is not ParameterContainer', () => {
      const container = { type: 'string' }
      const context = new Context()

      const expected = null
      const actual = __internals__.filter(context, container)

      expect(actual).toEqual(expected)
    })

    it('should call paramContainer.filter', () => {
      const container = new ParameterContainer({
        headers: List([ 1, 2, 3 ])
      })
      spyOn(container, 'filter').andReturn('test')

      const context = new Context()

      const expected = 'test'
      const actual = __internals__.filter(context, container)

      expect(actual).toEqual(expected)
    })
  })
})
