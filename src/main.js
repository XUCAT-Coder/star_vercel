import App from "./App";

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = true;
Vue.prototype.serveUrl = "/api";
// Vue.prototype.serveUrl='http://10.22.1.181:3000'

App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
