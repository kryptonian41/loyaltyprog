<template>
    <v-dialog
      v-model="loyaltyPromptVisible"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">Oops!</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          Sorry! This section is available to only Gold and Platinum customers.
          <p class="bold">
            Current Level: {{ loyaltyLevel }}
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="hideLoyaltyPrompt"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['loyaltyLevel', 'loyaltyPromptVisible'])
  },
  methods: {
    ...mapMutations(['hideLoyaltyPrompt'])
  }
}
</script>

<style>
</style>
