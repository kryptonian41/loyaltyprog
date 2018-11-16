<template>
  <v-dialog
    v-model="open"
    width="500"
  >
    <v-card>
      <v-card-title class="headline blue lighten-1 white--text">Congratulations!</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        You earned {{ points }} loyaltypoints
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['open', 'close', 'points']
}
</script>

<style>
</style>
