<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg3 xl3 v-for="(product, index) in products" :key="index">
        <product-list-item :product="product" :buyNow="buyNow(product)"></product-list-item>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-pagination
        v-model="currentPage"
        :length="paginationLength"
      ></v-pagination>
    </v-layout>
    <place-order :product="selectedProduct" :open="open" :close="open = false"></place-order>
  </v-container>
</template>

<script>
import axios from 'axios'
import ProductListItem from './productListItem'
import PlaceOrder from '../order/placeOrder'

export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      itemsPerPage: 12,
      selectedProduct: null,
      open: false
    }
  },
  created: async () => {
    this.products = await axios.get('/api/products/all').then(res => res.data)
  },
  components: {
    ProductListItem,
    PlaceOrder
  },
  computed: {
    visibleProducts: () => {
      const visibleProducts = []
      const self = this
      const lowerLimit = self.currentPage - 1 * self.itemsPerPage
      const upperLimit =
        this.currentPage === this.paginationLength
          ? this.products.length
          : self.currentPage * self.itemsPerPage
      // Selecting a range of products for pagination
      for (let i = lowerLimit; i < upperLimit; i++) {
        const element = array[i]
        visibleProducts.push(this.products[i])
      }
      return visibleProducts
    },
    paginationLength: () => {
      return Math.ceil(this.products.length / this.itemsPerPage)
    }
  },
  methods: {
    buyNow: product => {
      this.open = true
      this.selectedProduct = product
    }
  }
}
</script>

<style>
</style>
