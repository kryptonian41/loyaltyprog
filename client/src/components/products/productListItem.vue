<template>
  <v-card>
    <v-card-title primary-title>
      {{product.title}}
    </v-card-title>
    <v-card-text>
       <v-img
          :src="product.photoURL"
          aspect-ratio="1"
          class="grey lighten-2"
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="buyNow">Buy</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['product', 'buyNow']
}
</script>

<style>
</style>
