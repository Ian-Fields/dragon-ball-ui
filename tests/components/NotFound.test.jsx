import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import NotFound from '../../components/NotFound'

describe('Components - NotFound', () => {
  it('displays the children within the Page styled element', () => {
    const wrapper = shallow(<NotFound
      message="No Dragon Balls here silly."
    />)

    expect(wrapper.text()).to.equal('¯\\_(ツ)_/¯No Dragon Balls here silly.')
  })
})
