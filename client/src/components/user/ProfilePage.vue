<template>
  <v-container grid-list-sm>
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'userData'])
  }
}
</script>

<style scoped>
.qrcode {
  min-width: 200px;
  height: auto;
}
</style>
