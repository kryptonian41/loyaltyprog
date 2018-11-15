<template>
  <v-card>
    <v-card-title primary-title class="title grey lighten-2">
      {{product.name}}
    </v-card-title>
    <v-card-text>
       <v-img
          :src="product.photo_url"
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
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="buy">Buy</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['product', 'buy']
}
</script>

<style>
</style>
