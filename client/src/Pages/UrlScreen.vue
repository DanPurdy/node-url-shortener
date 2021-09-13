<template>
  <main>
    <header>
      <h1>{{ msg }}</h1>
    </header>
    <div class="container">
      <section class="row">
        <shorten-form :is-saving="isSaving" @submit-event="handleSubmit" />
        <result-block v-if="latestResult" :item="latestResult" />
        <error-block v-if="error">{{ error }}</error-block>
      </section>
      <section class="row">
        <div class="loading-block" v-if="isLoading">Loading...</div>
        <template v-else>
          <url-list-container>
            <url-list-item
              v-for="url in urls"
              :long-url="url.longUrl"
              :short-url="url.shortUrl"
              v-bind:key="url._id"
            />
          </url-list-container>
        </template>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import errorCodes, { UrlError } from '../sdk/errors';
import { fetchUrls, IUrlItem } from '../sdk/urls/fetch';
import { postUrl } from '../sdk/urls/post';

import ErrorBlock from '../components/ErrorBlock.vue';
import ResultBlock from '../components/ResultBlock.vue';
import ShortenForm from '../components/Form/ShortenForm.vue';
import UrlListContainer from '../components/UrlListContainer.vue';
import UrlListItem from '../components/UrlListItem.vue';

export default defineComponent({
  name: 'UrlScreen',
  components: {
    'error-block': ErrorBlock,
    'result-block': ResultBlock,
    'shorten-form': ShortenForm,
    'url-list-container': UrlListContainer,
    'url-list-item': UrlListItem,
  },
  props: {
    msg: {
      type: String as PropType<string>,
    },
  },
  setup() {
    const urls = ref<IUrlItem[]>([]);
    const isLoading = ref(true);
    const isSaving = ref(false);
    const latestResult = ref<IUrlItem | null>(null);
    const error = ref<string | null>(null);

    const fetchData = () => {
      isLoading.value = true;
      error.value = null;

      fetchUrls()
        .then((data) => {
          isLoading.value = false;
          urls.value = data.items;
        })
        .catch(() => {
          error.value = 'Failed to load previous urls, please try again.';
          isLoading.value = false;
        });
    };

    const onSaved = () => {
      fetchData();
    };

    const handleSubmit = (url: string) => {
      error.value = null;
      isSaving.value = true;
      latestResult.value = null;

      postUrl(url)
        .then((data) => {
          latestResult.value = data;
          fetchData();
          isSaving.value = false;
        })
        .catch((err: UrlError) => {
          latestResult.value = null;
          if (err?.body?.code && errorCodes[err.body.code]) {
            error.value = errorCodes[err.body.code];
          } else {
            error.value = 'Something went wrong, please try again';
          }
          isSaving.value = false;
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      error,
      handleSubmit,
      isLoading,
      isSaving,
      latestResult,
      onSaved,
      urls,
    };
  },
});
</script>

<style scoped>
header {
  margin: 3rem 0 1rem;
}
h1 {
  text-align: center;
  color: var(--light-body-text-color);
}

h3 {
  margin: 40px 0 0;
}

.container {
  display: flex;
  flex-direction: column;
}

.row {
  margin: 2rem 0;
}

.loading-block {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--light-body-text-color);
}
</style>
