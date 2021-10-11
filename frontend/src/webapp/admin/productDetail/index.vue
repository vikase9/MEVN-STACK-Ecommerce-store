<template>
  <div>
    <div v-for="product in productDeatil" :key="product.id">
      <div class="detail-wrapper absolute top-36 xl:left-28" v-if="proId == product.id">
        <div
          class="flex max-w-5xl shadow-2xl rounded-lg overflow-hidden items-center p-8"
        >
          <!-- image -->
          <div class="w-1/4">
            <img :src="product.image" />
          </div>
          <div class="w-2/3 pl-10">
            <div>
              <!-- category -->
              <p class="text-gray-500 font-semibold float-left">
                {{ product.category }}
              </p>
              <span
                class="ml-4 bg-yellow-400 px-2 py-1 rounded-full text-black text-sm"
                ><span class="font-bold">{{ product.rating.count }}</span> items
                left</span
              >
              <!-- title -->
              <p class="text-3xl font-semibold pt-2">{{ product.title }}</p>
              <!-- price -->
              <p class="text-lg font-semibold">₹{{ product.price }}</p>
              <!-- description -->
              <p class="text-justify font-extralight pt-2">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      proId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState({
      productDeatil: (state) => state.products,
    }),
  },
};
</script>
