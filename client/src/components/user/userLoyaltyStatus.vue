<template>
  <v-card>
    <v-card-title primary-title class="headline blue darken-4 white--text mt-4">
      Loyalty Status
    </v-card-title>
    <v-card-text>
      Loyalty Info Here
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'userData'])
  }
}
</script>

<style>
</style>
