import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Title from '../../components/Title'

describe('Components - Title', () => {
  it('displays the "Dragon Ball" title', () => {
    const wrapper = shallow(<Title />)

    expect(wrapper.text()).to.equal('Dragon Ball')
  })
})
