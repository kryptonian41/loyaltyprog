<template>
  <v-container grid-list-lg v-if="productsAvailable">
    <v-layout row wrap>
      <v-flex xs6 md4 lg3 xl3 v-for="(product, index) in visibleProducts" :key="index">
        <product-list-item :product="product" :buy="() => buyNow(product)"></product-list-item>
      </v-flex>
    </v-layout>
    <v-layout row align-center>
      <v-pagination
        v-model="currentPage"
        :length="paginationLength"
      ></v-pagination>
    </v-layout>
    <place-order :product="selectedProduct" :open="open" :close="() => {open = false}" v-if="selectedProduct"></place-order>
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
      open: false,
      visibleProducts: []
    }
  },
  async created() {
    this.products = await axios.get('/api/products/all').then(res => res.data)
  },
  components: {
    ProductListItem,
    PlaceOrder
  },
  computed: {
    productsAvailable() {
      return this.products.length > 0 ? true : false
    },
    paginationLength() {
      if (this.productsAvailable) {
        return Math.ceil(this.products.length / this.itemsPerPage)
      }
      return 0
    }
  },
  watch: {
    products: function() {
      if (this.productsAvailable) {
        this.setVisbileProducts()
      }
    },
    currentPage: function() {
      if (this.productsAvailable) {
        this.setVisbileProducts()
      }
    }
  },
  methods: {
    buyNow(product) {
      this.open = true
      this.selectedProduct = product
    },
    setVisbileProducts() {
      const m = []
      if (this.productsAvailable) {
        const lowerLimit = (this.currentPage - 1) * this.itemsPerPage
        const upperLimit =
          this.currentPage === this.paginationLength
            ? this.products.length
            : this.currentPage * this.itemsPerPage
        // Selecting a range of products for pagination
        for (let i = lowerLimit; i < upperLimit; i++) {
          m.push(this.products[i])
        }
      }
      this.visibleProducts = m
    }
  }
}
</script>

<style>
</style>
