import { nextTick } from '@vue/runtime-core';
import { mount } from '@vue/test-utils';
import InlineInput from '../InlineInput.vue';

describe('InlineInput', () => {
  it('should render correctly', () => {
    const expectedButtonText = 'Submit';

    const wrapper = mount(InlineInput, {});

    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.find('button').text()).toBe(expectedButtonText);
  });

  it('should emit a change-event event when the input value is changed', async () => {
    const expectedOutput = 'test';
    const wrapper = mount(InlineInput, {});
    const input = wrapper.find('input');

    input.setValue(expectedOutput);

    await nextTick();

    expect(wrapper.emitted('change-event')).toBeTruthy();
    expect(wrapper.emitted('change-event')?.length).toBe(1);
    expect(wrapper.emitted('change-event')?.[0]).toEqual([expectedOutput]);
  });

  it('should show the correct button text when disabled', async () => {
    const expectedOutput = 'Saving..';
    const wrapper = mount(InlineInput, { props: { disabled: true } });

    expect(wrapper.find('button').text()).toBe(expectedOutput);
  });
});
