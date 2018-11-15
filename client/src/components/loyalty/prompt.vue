<template>
    <v-dialog
      v-model="loyaltyPromptVisible"
    >
      <v-card>
        <v-card-title class="headline">Oops!</v-card-title>

        <v-card-text>
          Sorry! This section is available to only Gold and Platinum customers.
          Current Level: {{ loyaltyLevel }}
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
