<template>
  <div>
    <!-- search products by category -->
    <div class="flex items-center justify-center mb-4">
      <div>
        <field-for
          type="Text"
          display-mode="EDIT"
          :value.sync="search"
          placeholder="Search By Category..."
          class="w-full"
        >
        </field-for>
      </div>
    </div>

    <!-- loading spinner -->
    <div class="flex justify-center items-center mt-10" v-if="isLoading">
      <div
        class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"
      ></div>
    </div>

    <!-- all products -->
    <div class="grid grid-cols-12 gap-5">
      <Product
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
        v-for="item in searchResult"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
<script>
import Product from "./Product.vue";
import { Button } from "@e9ine/vue_components";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: null,
      isLoading: true,
      cartMessage: false,
    };
  },
  components: {
    Button,
    Product,
  },

  computed: {
    // getting products state
    ...mapState({
      getProducts: (state) => {
        return state.products;
      },
    }),

    // search by category
    searchResult() {
      if (this.search) {
        return this.getProducts.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .find((category) => item.category.toLowerCase().includes(category));
        });
      } else {
        return this.getProducts;
      }
    },
  },

  methods: {
    ...mapActions(["fetchProducts"]),
  },
  async mounted() {
    await this.fetchProducts();
    this.isLoading = false;
  },
};
</script>
