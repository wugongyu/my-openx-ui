import { createApp } from 'vue';
import { Theme } from '@openxui/ui';
import App from './App.vue';
import 'virtual:uno.css';

const app = createApp(App);
app.use(Theme);
app.mount('#app');
