<template>
  <div>
    <div
      v-if="cartProducts.length"
      class="flex justify-around items-center mb-6 pt-6"
    >
      <!-- cart total -->
      <div class="text-xl">
        Cart Total:
        <span class="text-gray-500 font-bold">₹{{ cartTotal }}</span>
      </div>

      <!-- Empty Cart -->
      <div>
        <Button
          size="md"
          type="dark"
          text="Empty Cart"
          :action="emptyCart"
          class="addToCartBtn"
        ></Button>
      </div>
    </div>

    <!-- cart product -->
    <div
      class="flex justify-center mt-40 text-2xl text-gray-600 font-bold"
      v-show="!cartProducts.length"
    >
      Your Cart is Empty...
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div
        class="border flex flex-col justify-center rounded col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
        v-for="item in cartProducts"
        :key="item.product.id"
      >
        <!-- image -->
        <img class="w-32 h-4/5 mx-auto pt-5" :src="item.product.image" />
        <div class="text-center pt-2 px-1">
          <!-- title -->
          <p class="text-gray-600 font-bold">{{ item.product.title }}</p>
          <!-- price -->
          <p class="text-center pt-2 font-bold text-gray-500">
            {{ item.quantity }}×{{ item.product.price }}
          </p>
          <!-- buttons -->
          <div class="flex justify-center my-2">
            <button
              class="my-2 px-4 py-2 mr-2 bg-red-500 text-white text-xs font-bold uppercase rounded"
              @click="removeCart(item.product.id)"
            >
              <i class="fas fa-trash pr-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Button } from "@e9ine/vue_components";

export default {
  components: {
    Button,
  },
  
  methods: {
    async removeCart(productId) {
      await this.$confirm("Are you sure you want to remove this product?");
      this.$store.dispatch("removeCartProduct", productId);
    },
    // emptyCart
    async emptyCart() {
      await this.$confirm("Are you sure you want to empty your cart?");
      this.$store.dispatch("emptyCart");
    },
  },
  computed: {
    // cartState
    ...mapState({
      cartProducts: (state) => {
        return state.cart;
      },
    }),
    // cartTotal
    cartTotal() {
      let total = 0;
      const data = this.cartProducts;
      data.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return Math.round(total);
    },
  },
};
</script>
