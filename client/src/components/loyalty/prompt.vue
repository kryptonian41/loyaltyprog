<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Not a Loyal Customer</v-card-title>

        <v-card-text>
          Sorry! This section is available to only Gold customers.
          Current Level: {{ loyaltyLevel }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loyaltyLevel'])
  }
}
</script>

<style>
</style>
