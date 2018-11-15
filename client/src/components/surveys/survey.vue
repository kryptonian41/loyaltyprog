<template>
<v-container grid-list-lg>
  <v-layout row wrap justify-center>
    <v-flex xs12 md10 lg8 xl6>
      <v-card
      >
        <v-card-title class="title font-weight-regular justify-space-between grey lighten-2">
          <span class="headline">User Experience Survey</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>
        <v-divider></v-divider>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <p class="title">Are you going to recommend our services to your friends and family ?</p>
              <v-radio-group v-model="recommend" column>
                <v-radio label="Not Likely" value="1" class="mt-3"></v-radio>
                <v-radio label="Likely" value="2" class="mt-3"></v-radio>
                <v-radio label="Definately" value="3" class="mt-3"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <p class="title">Which services do you like the most?</p>
              <v-checkbox v-model="services" label="Free POD" value="1"></v-checkbox>
              <v-checkbox v-model="services" label="Exclusive Access to product launch" value="2"></v-checkbox>
              <v-checkbox v-model="services" label="Premium Customer Support" value="3"></v-checkbox>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <p class="title">Please rate your experience</p>
              <div class="text-xs-center">
                <v-rating v-model="rating"></v-rating>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="step === 1"
            flat
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="step++"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    recommend: null,
    services: [],
    rating: 3
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up'
        case 2:
          return 'Create a password'
        default:
          return 'Account created'
      }
    }
  }
}
</script>

<style>
</style>
