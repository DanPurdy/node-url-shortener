import { nextTick } from '@vue/runtime-core';
import { mount } from '@vue/test-utils';
import ShortenForm from '../ShortenForm.vue';

describe('ShortenForm', () => {
  it('should render correctly', () => {
    const expectedButtonText = 'Submit';

    const wrapper = mount(ShortenForm, {});

    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.find('button').text()).toBe(expectedButtonText);
  });

  it('should emit a submitEvent event when the form is submitted', async () => {
    const expectedOutput = 'test';
    const wrapper = mount(ShortenForm, {});

    const input = wrapper.find('input');

    input.setValue(expectedOutput);
    wrapper.find('form').trigger('submit.prevent');

    await nextTick();

    expect(wrapper.emitted('submitEvent')).toBeTruthy();
    expect(wrapper.emitted('submitEvent')?.length).toBe(1);
    expect(wrapper.emitted('submitEvent')?.[0]).toEqual([expectedOutput]);
  });
});
