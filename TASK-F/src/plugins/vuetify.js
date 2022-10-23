import Vuetify from "vuetify/lib/framework";
import es from "vuetify/lib/locale/es";
import Vue from "vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#0D1A64",
        secondary: "#661392",
        tertiary: "#5252e8",
        background: "#ececf5",
        accent: "#5F6A6A",
        error: "#cc0000",
        info: "#0D1A64",
        exit: "#09696e",
        success: "#4BB543",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
