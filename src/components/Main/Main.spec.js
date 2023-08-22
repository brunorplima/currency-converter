import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Main from '../Main/Main.vue'

describe('Main component', () => {
  it('renders properly', () => {
    const wrapper = mount(Main)
    expect(wrapper.text()).toContain('Choose Currencies')
    expect(wrapper.text()).toContain('Currency 1:')
    expect(wrapper.text()).toContain('Currency 2:')
  })
})
