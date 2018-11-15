<template>
  <v-dialog
    v-model="levelUpPromptVisible"
  >
    <v-card>
      <v-card-title class="headline">Congratulations</v-card-title>

      <v-card-text>
        You have unlocked {{ loyaltyLevel }}
        <v-img
          :src="badgeSource"
          aspect-ratio="1"
          class="white lighten-2"
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

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="hideLevelupDialog"
        >
          Ok!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import GoldBadge from '@/assets/badges/gold.jpg'
import SilverBadge from '@/assets/badges/silver.png'
import PlatinumBadge from '@/assets/badges/platinum.jpg'
import { levels } from '@/helpers'
export default {
  computed: {
    ...mapState(['loyaltyLevel', 'levelUpPromptVisible']),
    badgeSource() {
      switch (this.loyaltyLevel) {
        case levels.SILVER:
          return SilverBadge
          break
        case levels.GOLD:
          return GoldBadge
          break
        case levels.PLATINUM:
          return PlatinumBadge
          break
        default:
          break
      }
    }
  },
  methods: {
    ...mapMutations(['hideLevelupDialog'])
  }
}
</script>

<style>
</style>
