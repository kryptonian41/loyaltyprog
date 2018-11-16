<template>
  <v-container grid-list-lg >
    <v-slide-y-reverse-transition mode="out-in">
      <div v-if="productsAvailable" key="products">
        <v-layout row wrap>
          <v-flex xs12 v-if="all">
            <p class="headline">
              All Products
            </p>
          </v-flex>
          <v-flex xs6 md4 lg3 xl3 v-for="(product, index) in visibleProducts" :key="index">
            <product-list-item :product="product" :buy="() => buyNow(product)"></product-list-item>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
          ></v-pagination>
          <place-order :product="selectedProduct" :open="open" :close="() => {open = false}" v-if="selectedProduct"></place-order>
        </v-layout>
      </div>
      <v-layout row wrap v-else key="loader">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-layout>
    </v-slide-y-reverse-transition>
  </v-container>
</template>

<script>
import axios from 'axios'
import ProductListItem from './productListItem'
import PlaceOrder from '../order/placeOrder'

export default {
  props: {
    all: {
      type: Boolean,
      default: true
    },
    productList: Array
  },
  data() {
    return {
      products: null,
      currentPage: 1,
      itemsPerPage: 12,
      selectedProduct: null,
      open: false,
      visibleProducts: []
    }
  },
  async mounted() {
    if (this.all) {
      this.products = await axios.get('/api/products/all').then(res => res.data)
      return
    }
  },
  components: {
    ProductListItem,
    PlaceOrder
  },
  computed: {
    productsAvailable() {
      return this.products ? true : false
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
    },
    productList: function() {
      if (!this.all) {
        this.products = this.productList
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
