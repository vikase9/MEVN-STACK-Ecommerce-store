export const sideBarModule = {
  state: {
    menu: [
      {
        menuItems: [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: "home",
          },
          {
            name: "Cart",
            path: "/cart",
            icon: "shopping_cart",
          },
          {
            name: "Contact",
            path: "/contact",
            icon: "call",
          },
        ],
      },
    ],
    pageTitle: {
      text: "MyStore",
      align: "left",
      mobile: false,
    },
    avatarOptions: {
      title: "Vikas",
      subtitle: "Logout",
      size: 36,
      subtitleOptions: {
        clickAction: function() {
          $cookies.remove("accessToken");
          window.location = "/login";
        },
      },
    },
  },
};
