<template>
  <div class="product_wrapper border rounded flex flex-col justify-center">
    <!-- product image -->
    <img
      @click="detailPage(item.id)"
      class="w-32 h-3/5 mx-auto pt-3 cursor-pointer"
      :src="item.image"
    />
    <div class="text-center py-4 px-1">
      <!-- product title -->
      <p class="text-gray-600 font-bold">{{ item.title }}</p>

      <!-- product price -->
      <p class="text-center py-2 font-bold text-gray-500">
        ₹{{ priceRounded }}
      </p>

      <!-- add to cart button -->
      <Button
        size="md"
        type="secondary"
        text="Add to Cart"
        :action="addToCart"
        ><i class="fas fa-shopping-cart text-sm"></i
      ></Button>
    </div>
  </div>
</template>
<script>
import { Button } from "@e9ine/vue_components";

export default {
  components: {
    Button,
  },
  props: ["item"],
  methods: {
    // add to cart click handler
    addToCart() {
      this.$store.dispatch("addToCart", {
        product: this.item,
        quantity: 1,
      });
    },

    // push to product detail page
    detailPage(id) {
      this.$router.push({ name: "ProductDetail", params: { id: id } });
    },
  },
  computed: {
    // product price rounded
    priceRounded() {
      return Math.round(this.item.price);
    },
  },
};
</script>
