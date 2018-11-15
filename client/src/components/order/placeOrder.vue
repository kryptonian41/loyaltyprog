<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Place Order</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="checkout">Checkout</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md6 lg4>
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
            </v-flex>
            <v-flex xs12 md6 lg8 d-flex>
              <v-card>
                <v-card-title primary-title class="title grey lighten-2">
                  {{product.name}}
                </v-card-title>
                <v-card-text>
                  <p class="subheading">Specifications</p>
                  <v-divider></v-divider>
                  <p class="mt-2">
                    {{ product.desc }}
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-list three-line subheader>
            <v-subheader class="headline">Amount</v-subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Discounts</v-list-tile-title>
                <v-list-tile-sub-title>
                  Rs. {{ discount }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Delivery</v-list-tile-title>
                <v-list-tile-sub-title>
                  Rs. {{ delivery }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Total</v-list-tile-title>
                <v-list-tile-sub-title>
                  Rs. {{ amount }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-card>
      <payment :open="openCheckout" :close="closeCheckout" :product="product" :amount="amount" :successCb="success"></payment>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { levels } from '@/helpers'
import Payment from '@/components/order/payment'
export default {
  props: ['open', 'product', 'close'],
  components: {
    Payment
  },
  data() {
    return {
      openCheckout: false
    }
  },
  computed: {
    ...mapState(['loyaltyLevel', 'userData']),
    discount() {
      switch (this.loyaltyLevel) {
        case levels.GOLD:
          return this.product.price * 0.05
          break
        case levels.PLATINUM:
          return this.product.price * 0.1
          break
        default:
          return 0
          break
      }
    },
    delivery() {
      switch (this.loyaltyLevel) {
        case levels.GOLD:
          return 0
          break
        case levels.PLATINUM:
          return 0
          break
        default:
          if (this.product.price >= 1000) {
            return 0
          } else {
            return 200
          }
          break
      }
    },
    amount() {
      return this.product.price - this.discount + this.delivery
    }
  },
  methods: {
    checkout() {
      this.openCheckout = true
    },
    closeCheckout() {
      this.openCheckout = false
    },
    success() {
      this.close()
    }
  }
}
</script>

<style>
</style>
