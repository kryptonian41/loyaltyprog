<template>
  <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs12>
          <p class="headline">
            Exclusive Products
          </p>
        </v-flex>
        <v-divider></v-divider>
        <product-list :all="false" :productList="products"></product-list>
      </v-layout>
  </v-container>
</template>

<script>
import ProductList from '@/components/products/productList'
import axios from 'axios'

export default {
  components: {
    ProductList
  },
  data() {
    return {
      products: null
    }
  },
  async created() {
    this.products = await axios
      .get('/api/products/getPremiumProduct')
      .then(res => res.data)
  }
}
</script>

<style>
</style>
