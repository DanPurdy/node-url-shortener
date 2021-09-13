import { mount } from '@vue/test-utils';
import BlockControls from '../BlockControls.vue';

const windowOpenMock = jest.fn();
Object.defineProperty(window, 'open', { value: windowOpenMock });
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('BlockControls', () => {
  const expectedShortUrl = 'https://pbid.io/2KQjKX03';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = mount(BlockControls, {
      props: {
        shortUrl: expectedShortUrl,
      },
    });

    const item = wrapper.findAll('button');
    expect(item.length).toBe(2);
  });

  it('should try to open a new window when clicking on the visit button', () => {
    const wrapper = mount(BlockControls, {
      props: {
        shortUrl: expectedShortUrl,
      },
    });

    const item = wrapper.findAll('button');
    expect(item[0].exists).toBeTruthy();
    item[0].trigger('click');

    expect(windowOpenMock).toHaveBeenCalledTimes(1);
    expect(windowOpenMock).toHaveBeenCalledWith(expectedShortUrl);
  });

  it('should try to open a new window when clicking on the visit button', () => {
    jest.spyOn(navigator.clipboard, 'writeText');

    const wrapper = mount(BlockControls, {
      props: {
        shortUrl: expectedShortUrl,
      },
    });

    const item = wrapper.findAll('button');
    expect(item[1].exists).toBeTruthy();
    item[1].trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expectedShortUrl,
    );
  });
});
