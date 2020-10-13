<script lang="ts">
import Vue from 'vue';
import SButton from '../../ui/SButton.vue';
import SMapLayout from '../../ui/SMapLayout.vue';
import SInput from '../../ui/SInput.vue';
import {
  LocationMap,
  $address,
  $isCoordsEntered,
  resetAddress,
  addressUpdated,
} from '../../features/map';
import './model';

export default Vue.extend({
  name: 'FindLocationPage',

  effector: {
    $address,
    $isCoordsEntered,
  },

  components: {
    SMapLayout,
    LocationMap,
    SButton,
    SInput,
  },

  methods: {
    resetAddress,
    addressUpdated,
  },
});
</script>

<template>
  <s-map-layout>
    <location-map
      slot="map"
      redirect-from="SetInfoPage"
    />
    <s-input
      label="Місце розташування"
      type="search"
      :clearable="$isCoordsEntered"
      @clear="resetAddress"
    >
      <google-autocomplete
        :value="$address"
        placeholder=""
        @place_changed="addressUpdated"
      />
    </s-input>

    <s-button
      slot="submit"
      class="find-location-page__submit"
      :disabled="!$isCoordsEntered"
      :to="{
        name: 'SetInfoPage',
        params: {
          direction: 'next'
        }
      }"
    >
      Знайшов тварину
    </s-button>
  </s-map-layout>
</template>
