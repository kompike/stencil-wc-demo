import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {defineCustomElements} from '@kompike/stencil-web-components/loader';

defineCustomElements(window)

createApp(App).mount('#app')
