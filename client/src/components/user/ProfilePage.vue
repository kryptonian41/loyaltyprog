<template>
  <v-container grid-list-sm>
    <v-slide-y-reverse-transition mode="out-in">
      <div v-if="user">
        <v-layout row wrap justify-center>
          <v-flex xs12 lg6>
            <v-card>
              <v-card-title primary-title class="headline">
                <v-avatar color="teal" class="mr-4">
                  <span class="white--text headline">{{ user.displayName[0] }}</span>
                </v-avatar>
                {{ user.displayName }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md8 lg6>
            <loyalty-status></loyalty-status>
        </v-flex>
      </v-layout>
    </div>
      <v-layout row wrap v-else>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-layout>
    </v-slide-y-reverse-transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import LoyaltyStatus from '@/components/user/userLoyaltyStatus'

export default {
  computed: {
    ...mapState(['user', 'userData'])
  },
  components: {
    LoyaltyStatus
  }
}
</script>

<style scoped>
</style>
