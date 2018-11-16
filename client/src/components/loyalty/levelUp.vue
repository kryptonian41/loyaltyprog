<template>
  <v-dialog
    v-model="levelUpPromptVisible"
    width="500"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">Congratulations</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        You have unlocked {{ loyaltyLevel }}
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-img
              :src="badgeSource"
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
          </v-flex>
        </v-layout>
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
import { levels, getBadge } from '@/helpers'

export default {
  computed: {
    ...mapState(['loyaltyLevel', 'levelUpPromptVisible']),
    badgeSource() {
      return getBadge(this.loyaltyLevel)
    }
  },
  methods: {
    ...mapMutations(['hideLevelupDialog'])
  }
}
</script>

<style>
</style>
