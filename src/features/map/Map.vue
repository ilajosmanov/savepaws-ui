<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import SIcon from '../../ui/SIcon.vue';
import {
  $isCoordsEntered,
  $location,
  $zoom,
  fxGetCurrentLocation,
  zoomUpdated,
} from './model';

const options = {
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

export default Vue.extend({
  name: 'Map',

  effector: {
    $zoom,
    $location,
    $isCoordsEntered,
  },

  components: {
    SIcon,
  },

  props: {
    zoom: {
      type: Number,
      default: 10,
    },
    options: {
      type: Object,
      default: () => options,
    },
    redirectFrom: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    map: null as any,
  }),

  watch: {
    zoom: {
      immediate: true,
      handler(value: number) {
        if (this.map) {
          this.map.$mapObject.setZoom(value);
        }

        this.zoomUpdated(value);
      },
    },
  },

  mounted() {
    this.map = this.$refs.map;

    this.map.$mapPromise.then(() => {
      if (!this.$isCoordsEntered) {
        fxGetCurrentLocation();
      }
    });
  },

  methods: {
    zoomUpdated,
    resetToMarkerPosition() {
      if (this.$isCoordsEntered) {
        this.map.panTo(this.$location);
        this.map.$mapObject.setZoom(this.zoom);
      }
    },
  },
});
</script>

<template>
  <div class="map">
    <router-link
      v-if="redirectFrom"
      :to="{name: 'HomePage', params: {
        direction: 'prev'
      }, query: { redirectFrom }}"
      class="map__backward"
    >
      <s-icon :icon-path="require('../../assets/vector/paw.svg')" />
    </router-link>

    <google-map
      ref="map"
      :center="$location"
      :options="options"
      :zoom="$zoom"
      @zoom_changed="zoomUpdated"
    >
      <google-map-marker
        v-if="$isCoordsEntered"
        :position="$location"
        :icon="{
          url: require('../../assets/vector/placeholder.svg')
        }"
      />
    </google-map>

    <button
      v-if="$isCoordsEntered"
      class="map__location-btn"
      @click="resetToMarkerPosition"
    >
      <s-icon :icon-path="require('../../assets/vector/location.svg')" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.map {
  position: relative;
  width: 100%;
  height: 100%;
}

.map__location-btn {
  @include reset-btn();

  position: absolute;
  bottom: 30px;
  left: 14px;

  background: var(--light);

  width: 35px;
  height: 35px;

  border-radius: 50%;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.map__backward {
  position: absolute;
  right: 16px;
  top: 18px;
  z-index: 99;

  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  background: var(--primary);
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.1);
}
</style>
