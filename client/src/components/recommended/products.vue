<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
          <p class="headline">
            Recommended Products
          </p>
        </v-flex>
        <v-flex xs12>
          <product-list :all="false" :productList="products"></product-list>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductList from '@/components/products/productList'
import axios from 'axios'

export default {
  props: ['title'],
  components: {
    ProductList
  },
  async created() {
    this.products = await axios
      .get(`/api/products/recommend/${this.title}`)
      .then(res => res.data)
  },
  data() {
    return {
      products: null
    }
  }
}
</script>

<style>
</style>
