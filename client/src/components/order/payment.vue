<template>
  <v-dialog
    v-model="open"
    width="500"
  >
    <v-card>
    <v-card-title class="title font-weight-regular justify-space-between grey lighten-2">
          <span class="headline">Payment</span>
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
              <p class="title">Select Address</p>
              <v-radio-group v-model="address" column>
                <v-radio label="New Door Hostels, Manipal University Jaipur, Jaipur ,Rajasthan" value="1" class="mt-3"></v-radio>
                <v-radio label="Flat No. - 107, Ganpati Apartments, Kashipur ,Uttarakhand" value="2" class="mt-3"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <p class="title">Payment Method</p>
              <v-radio-group v-model="mode" column>
                <v-radio label="Netbanking" value="1" class="mt-3"></v-radio>
                <v-radio label="Credit/Debit Card" value="2" class="mt-3"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text justify-center>
              <p class="title center">Amount</p>
              <div class="text-xs-center">
                Rs. {{ amount }}
              </div>
              <v-btn block color="success" @click="payNow" :loading="loading">Pay Now</v-btn>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text justify-center>
              <p class="title center">Order Placed</p>
              <div class="text-xs-center">
                ID: {{ id }}
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
            v-if="step < 3"
          >
            Next
          </v-btn>
          <v-btn
            :disabled="loading"
            color="primary"
            depressed
            @click="close"
            v-if="step === 3"
          >
            Cancel
          </v-btn>
          <v-btn color="success" v-if="step == 4" @click="() => {
              close()
              step = 1
              successCb()
              this.$router.push({name: 'recommended', params: {title: product.name}})
            }">Close</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { getLevel } from '@/helpers'
export default {
  props: ['open', 'product', 'amount', 'close', 'successCb'],
  data() {
    return {
      address: null,
      mode: null,
      loading: false,
      step: 1,
      id: null
    }
  },
  methods: {
    async payNow() {
      const self = this
      this.loading = true
      const data = await axios
        .post('/api/order/place', {
          product: self.product,
          userid: self.$store.state.user.uid,
          amount: self.amount
        })
        .then(res => res.data)
      this.loading = false
      if (data.success) {
        this.$store.dispatch('checkLevelUpgrade', data)
        this.step = 4
        this.id = data.id
      }
    }
  }
}
</script>

<style>
</style>
