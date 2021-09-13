import { mount } from '@vue/test-utils';
import UrlListItem from '../UrlListItem.vue';

describe('UrlListItem', () => {
  it('should render correctly', () => {
    const expectedShortUrl = 'https://pbid.io/2KQjKX03';
    const expectedLongUrl = 'https://example.com';

    const wrapper = mount(UrlListItem, {
      props: {
        shortUrl: expectedShortUrl,
        longUrl: expectedLongUrl,
      },
    });
    const item = wrapper.find('.url-list-item');
    expect(item.exists()).toBeTruthy();
    expect(item.html()).toContain(expectedShortUrl);
  });

  it('should correctly strip the protocol from the long Url', () => {
    const expectedShortUrl = 'https://pbid.io/2KQjKX03';
    const longUrl = 'https://example.com';
    const expectedLongUrl = 'example.com';

    const wrapper = mount(UrlListItem, {
      props: {
        shortUrl: expectedShortUrl,
        longUrl: longUrl,
      },
    });

    const item = wrapper.find('.url-list-item');
    expect(item.html()).toContain(expectedLongUrl);
  });
});
