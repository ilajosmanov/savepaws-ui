import { createDomain } from 'effector-logger';

const model = createDomain();

const $reason = model.store<'long' | 'cant' | 'dismiss'>('dismiss');

export {
  $reason,
};
