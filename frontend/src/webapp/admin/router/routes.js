import Dashboard from "@/webapp/admin/dashboard";
import Cart from "@/webapp/admin/cart";
import ProductDetail from "@/webapp/admin/productDetail";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/productDetail/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
];

export default routes;
