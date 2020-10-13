import Vue from 'vue';
import {
  RouteConfigSingleView,
  Route,
  NavigationGuardNext,
  // eslint-disable-next-line import/extensions, import/no-unresolved
} from 'vue-router/types/router';

declare module 'vue-router' {
  interface R extends RouteConfigSingleView {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: Record<string, any> & {
      autRequired?: boolean;
      beforeResolve?: (to: Route, from: Route, next: NavigationGuardNext<Vue>) => void;
    };
  }
}
