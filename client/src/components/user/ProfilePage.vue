<template>
  <v-container grid-list-sm>
    <v-slide-y-reverse-transition mode="out-in">
      <div v-if="user" key="profile">
        <v-layout row wrap justify-center>
          <v-flex xs12 md8 lg6>
            <v-card>
              <v-card-title primary-title class="headline">
                <v-avatar color="teal" class="mr-4">
                  <span class="white--text headline">{{ user.displayName[0] }}</span>
                </v-avatar>
                {{ user.displayName }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p class="title">Current Incentives</p>
                <ul>
                  <li v-for="(item, index) in incentive" :key="index">{{item}}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md8 lg6>
            <loyalty-status></loyalty-status>
        </v-flex>
      </v-layout>
      </div>
      <v-layout row wrap v-else key="loader">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-layout>
    </v-slide-y-reverse-transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import LoyaltyStatus from '@/components/user/userLoyaltyStatus'
import { incentives } from '@/helpers'
export default {
  computed: {
    ...mapState(['user', 'userData', 'loyaltyLevel']),
    incentive() {
      return incentives[this.loyaltyLevel].incentives
    }
  },
  components: {
    LoyaltyStatus
  }
}
</script>

<style scoped>
</style>
