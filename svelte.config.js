import { sveltekit } from '@sveltejs/kit/vite';

export default {
  kit: {
    adapter: '@sveltejs/adapter-static', // or another adapter if needed
  },
  preprocess: sveltekit()
};
