<template>
  <div class="app">
    <LayoutVariation1 :show-back-btn="true">
      <template v-slot:sidebar>
        <SideBar :menu="menus.menu">
          <template v-slot:sidebarTop>
            <div class="logo-wrapper">
              <img
                class="w-33" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0opQ4Y1OYDGU5LcW9YUYV51b9QI5pv4SqQ&usqp=CAU"
                alt="Brand Logo"
              />
            </div>
          </template>
        </SideBar>
      </template>
      <template v-slot:topbar>
        <TopBar
          :avatar-options="menus.avatarOptions"
          :page-title="menus.pageTitle"
        ></TopBar>
      </template>
    </LayoutVariation1>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  LayoutVariation1,
  SideBar,
  TopBar,
  TabBar,
} from "@e9ine/vue_components";

export default {
  name: "Admin",
  components: {
    LayoutVariation1,
    SideBar,
    TopBar,
    TabBar,
  },
  computed: {
    ...mapState({
      menus: (state) => state.sideBarModule,
    }),
  },
};
</script>
