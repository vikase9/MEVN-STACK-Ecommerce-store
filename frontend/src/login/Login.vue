<template>
  <div>
    <LoginVariation1
      brand-primary="#d21d1d"
      brand-logo-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNFNDMElrZ3mCX7JtiB7yRiwGKZsH85rvcw&usqp=CAU"
      title-text="Welcome To The Biggest World of Purchase"
      sub-title-text="MyStore Online Shopping App - Download app for a delightful shopping experience. Online shopping with MyStore is very easy as you get to shop from the."
      text-dark="#e90000"
      text-light="#9e9e9e"
      :errorMessage="errorMessage"
      background-image="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      :on-click-fn="loginButtonClicked"
    >
    </LoginVariation1>
  </div>
</template>

<script>
import { LoginVariation1 } from "@e9ine/vue_components";

export default {
  name: "Login",
  components: {
    LoginVariation1,
  },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    loginButtonClicked(username, password) {
      if (!username || !password) {
        return (this.errorMessage = "Please Enter Username & Password");
      } else {
        const email = username;
        this.$store.dispatch("doLogin", { email, password });
        // window.location = "./admin/index.html#/dashboard";
      }
    },
  },
};
</script>
