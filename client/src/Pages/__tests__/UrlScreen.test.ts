import { mount } from '@vue/test-utils';
import UrlScreen from '../UrlScreen.vue';
import { nextTick } from 'vue';
import { fetchUrls } from '../../sdk/urls/fetch';
import { postUrl } from '../../sdk/urls/post';

jest.mock('../../sdk/urls/fetch', () => ({
  ...jest.requireActual('../../sdk/urls/fetch'),
  fetchUrls: jest.fn(() =>
    Promise.resolve({
      items: [{ _id: 'test', shortUrl: 'test', longUrl: 'test' }],
    }),
  ),
}));

jest.mock('../../sdk/urls/post', () => ({
  ...jest.requireActual('../../sdk/urls/post'),
  postUrl: jest.fn(() =>
    Promise.resolve({
      exists: false,
      _id: 'test',
      shortUrl: 'test',
      longUrl: 'test',
    }),
  ),
}));

describe('UrlScreen', () => {
  let wrapper: any;

  const expectedText = 'test';
  const expectedUrl = 'https://example.com/';

  beforeEach(() => {
    wrapper = mount(UrlScreen, {
      props: {
        msg: expectedText,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(wrapper.find('header').html()).toContain(expectedText);
  });

  it('should correctly load a list of url items and display them on the page', async () => {
    await nextTick();

    expect(fetchUrls).toHaveBeenCalled();
    expect(fetchUrls).toHaveBeenCalledTimes(1);

    expect(wrapper.find('.url-list-item').html()).toContain('test');
  });

  it('should correctly submit a request with a new url when the user submits the form and reload the items list', async () => {
    await nextTick();

    expect(fetchUrls).toHaveBeenCalled();
    expect(fetchUrls).toHaveBeenCalledTimes(1);

    expect(wrapper.find('.url-list-item').html()).toContain('test');

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    input.setValue(expectedUrl);

    wrapper.find('form').trigger('submit.prevent');

    expect(postUrl).toHaveBeenCalled();
    expect(postUrl).toHaveBeenCalledTimes(1);
    expect(postUrl).toHaveBeenCalledWith(expectedUrl);

    await nextTick();

    expect(fetchUrls).toHaveBeenCalled();
    expect(fetchUrls).toHaveBeenCalledTimes(2);
  });

  it('should show a result box with the latest url once a submission is successful', async () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    input.setValue(expectedUrl);

    wrapper.find('form').trigger('submit.prevent');

    await nextTick();
    expect(wrapper.find('.js-submit-button').text()).toContain('Saving..');
    await nextTick();

    expect(wrapper.find('.result-block').html()).toContain(
      `Result: ${expectedText}`,
    );
  });
});
