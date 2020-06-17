import React from 'react'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { shallow } from 'enzyme'

import Sagas from '../../components/Sagas'

describe('Components - Sagas', () => {
  it('displays the saga\'s name.', () => {
    const wrapper = shallow(<Sagas id="1" name="Action" />)


    expect(wrapper.text()).to.equal('Action')
  })
})
