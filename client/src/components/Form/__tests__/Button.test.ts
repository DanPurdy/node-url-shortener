import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  it('should render the slot value correctly', () => {
    const expectedText = 'ButtonText';
    const wrapper = mount(Button, {
      slots: {
        default: expectedText,
      },
    });

    expect(wrapper.find('button').html()).toContain(expectedText);
  });

  it('should correctly call the onClick method', () => {
    const expectedText = 'ButtonText';
    const onClickMock = jest.fn();

    const wrapper = mount(Button, {
      slots: {
        default: expectedText,
      },
      props: {
        onClick: onClickMock,
      },
    });

    wrapper.find('button').trigger('click');

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
