<template>
  <v-card>
    <v-card-title primary-title class="headline blue darken-4 white--text mt-4">
      Loyalty Status
    </v-card-title>
    <v-card-text v-if="!noLevel">
      Your current loyalty level
      <v-img
          :src="badge"
          aspect-ratio="1"
          class="white lighten-2"
          contain
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
    </v-card-text>
    <v-card-text v-else>
      Your have not achieved a loyalty level till now.
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { levels, getBadge } from '@/helpers'

export default {
  computed: {
    ...mapState(['user', 'userData', 'loyaltyLevel']),
    noLevel() {
      return this.loyaltyLevel === levels.NONE ? true : false
    },
    badge() {
      if (!this.noLevel) {
        return getBadge(this.loyaltyLevel)
      }
    }
  }
}
</script>

<style>
</style>
