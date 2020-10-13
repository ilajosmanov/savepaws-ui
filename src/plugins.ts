/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Vue from 'vue';
import * as ModalDialogs from 'vue-modal-dialogs';
import * as VueGoogleMaps from 'vue2-google-maps';
import { VueEffector } from 'effector-vue';
import { required, numeric, length } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

Vue.use(ModalDialogs);
Vue.use(VueEffector);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY_API,
    language: 'uk',
    region: 'UA',
    libraries: 'places',
  },
  installComponents: false,
});

Vue.component('google-autocomplete', VueGoogleMaps.Autocomplete);
Vue.component('google-map-marker', VueGoogleMaps.Marker);
Vue.component('google-map', VueGoogleMaps.Map);

extend('required', {
  ...required,
  message: 'Це поле є обов\'язковим',
});

extend('numeric', {
  ...numeric,
  computesRequired: false,
  message: 'Введіть, будь ласка, тільки числа',
});

extend('phoneNumber', {
  ...length,
  message: 'Неправильний формат телефону',
});
