import { merge, guard } from 'effector-logger';
import {
  $isCoordsEntered,
  addressUpdated,
  zoomUpdated,
} from '../../features/map';

guard(merge([addressUpdated, $isCoordsEntered]).map((v: unknown) => v && 16), {
  filter: Boolean,
  target: zoomUpdated,
});
