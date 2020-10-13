<script lang="ts">
import Vue from 'vue';
import { Route } from 'vue-router';

export default Vue.extend({
  name: 'App',

  data: () => ({
    transitionName: '',
  }),

  watch: {
    $route(to: Route) {
      this.transitionName = to.params?.direction ?? '';
    },
  },
});
</script>

<template>
  <div id="app">
    <main class="maincontent">
      <!-- <transition :name="transitionName"> -->
      <keep-alive :exclude="['SetInfoPage']">
        <router-view />
      </keep-alive>
      <!-- </transition> -->
    </main>

    <dialogs-wrapper transition-name="fade" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/transitions.scss";
@import "./assets/scss/mixins.scss";
@import "./assets/scss/vars.scss";

[v-cloak] {
  display: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  height: -webkit-fill-available;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;

  width: 100%;

  display: flex;
  overflow: hidden;
}

#app {
  flex: 1 0;
  display: grid;
  grid-template-rows: 1fr;
}

.maincontent {
  display: grid;
  grid-template: "main";

  background: var(--light);

  position: relative;
  z-index: 0;
  overflow-x: hidden;

  > .page {
    background: var(--light);
    grid-area: main;
    position: relative;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  > :first-child {
    z-index: 1;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

.visually-hidden {
  @include visually-hidden;
}

.vue-map-container {
  width: 100%;
  height: 100%;
}

.pac-container {
  transform: translateY(calc(-100% - 70px));
}

.clearable .pac-target-input {
  padding-right: 45px;
}

.pac-target-input {
  appearance: none;
  width: 100%;
  border: 1px solid rgba(51, 51, 51, .1);
  outline: none;

  padding: 14px 18px;
  color: var(--secondary);
  font-size: 16px;
  line-height: 20px;
  border-radius: 30px;
}
</style>
