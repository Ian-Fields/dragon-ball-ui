import React from 'react'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { shallow } from 'enzyme'

import CharacterDetails from '../../components/Character'

describe('Components - CharacterDetails', () => {
  it('displays the Character and some details about it.', () => {
    const wrapper = shallow(<CharacterDetails
      id="1"
      name="Goku"
      race="Sayain"
      type="hero"
      transformation="yes"
      sagaList={[{ id: 1, name: 'Sayain' }, { id: 2, name: 'Vegeta' }]}
    />)

    const divList = wrapper.find('div')
    const defaultDivList = wrapper.find('_default')


    expect(divList.at(0).text()).to.equal('Race: Sayain')
    expect(divList.at(1).text()).to.equal('Hero or Villain: hero')
    expect(divList.at(2).text()).to.equal('Transformation: yes')
    expect(defaultDivList.at(0).prop('id')).to.equal(1)
    expect(defaultDivList.at(0).prop('name')).to.equal('Sayain')
    expect(defaultDivList.at(1).prop('id')).to.equal(2)
    expect(defaultDivList.at(1).prop('name')).to.equal('Vegeta')
  })
})
