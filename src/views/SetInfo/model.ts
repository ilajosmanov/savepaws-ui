import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  merge,
  sample,
} from 'effector-logger';
import { condition } from 'patronum/condition';
import { create } from 'vue-modal-dialogs';
import { router } from '../../router';
import SuccessModal from '../../modals/SuccessModal.vue';
import { http } from '../../api/request';
import { $location, $address } from '../../features/map';
import { OrderPayload } from './types';

const successBox = create(SuccessModal);

const model = createDomain();

const resetModel = createEvent();
const photosUpdated = createEvent<string[]>();
const submitForm = createEvent();
const requestCompleted = createEvent();
const toDriverMoved = createEvent();

const fxSendRequest = createEffect<OrderPayload, void>({
  handler: async (body) => {
    await http.post('/order', body);
  },
});

const $fullName = model.store('');
const $phoneNumber = model.store('');
const $numberOfAnimals = model.store('');
const $description = model.store('');
const $isWait = model.store(true);
const $photos = model.store<string[]>([]); // base64 string

const $$fullModel = combine({
  $fullName,
  $phoneNumber,
  $numberOfAnimals,
  $description,
  $isWait,
  $photos,
  $location,
  $address,
});

model.onCreateStore((store) => {
  store.reset(resetModel);
});

$photos.on(photosUpdated, (_, photos) => photos);

condition({
  source: sample($isWait, submitForm, (flag) => flag),
  if: Boolean,
  // then: toDriverMoved,
  then: requestCompleted,
  else: requestCompleted,
});

const pageRedirected = sample({
  source: requestCompleted,
  target: createEffect({
    async handler() {
      await router.push({
        name: 'FindLocationPage',
      });

      successBox();
    },
  }),
});

sample({
  source: toDriverMoved,
  target: createEffect({
    async handler() {
      await router.push({
        name: 'WaitingPage',
      });
    },
  }),
});

sample({
  source: $$fullModel,
  clock: merge([toDriverMoved, requestCompleted]),
  fn: (payload) => ({
    documents: payload.$photos,
    name: payload.$fullName,
    phone: payload.$phoneNumber,
    quantity: +payload.$numberOfAnimals,
    canWait: payload.$isWait,
    injury: payload.$description,
    location: [payload.$location.lat, payload.$location.lng],
  }),
  target: fxSendRequest,
});

sample({
  source: pageRedirected,
  target: resetModel,
});

export {
  $fullName,
  $phoneNumber,
  $numberOfAnimals,
  $description,
  $isWait,
  $photos,
  photosUpdated,
  submitForm,
};
