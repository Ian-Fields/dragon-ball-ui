import React from 'react'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { shallow } from 'enzyme'
import Characters from '../../components/Characters'

describe('Components - Characters', () => {
  it('displays the character\'s name as a link', () => {
    const wrapper = shallow(<Characters id={1} name="Goku" />)
    const NavLink = wrapper.find('NavLink')
    expect(NavLink.prop('to')).to.equal('/characters/Goku')
    expect(NavLink.text()).to.equal('Goku')
  })
})
