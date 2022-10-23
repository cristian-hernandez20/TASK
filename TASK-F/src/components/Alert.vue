<template>
  <v-dialog v-model="alert.state" persistent width="500">
    <v-card width="500">
      <v-container>
        <v-alert border="top" colored-border :color="color" class="my-0 py-0">
          <v-row align="center">
            <v-col cols="8" lg="9" md="9" sm="9" class="ml-0 pl-0">
              <v-row justify="center" align="center">
                <v-col cols="12" lg="12" md="12" sm="12" class="ml-0 pl-0">
                  <h2 :class="`mt-2 ${color}--text text-center`">
                    {{ title }}
                  </h2>
                  <h4 class="text-center">
                    {{ body }}
                  </h4>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" v-if="!btn_cancel" class="mx-auto py-0 my-0">
                  <v-card-actions class="mx-0">
                    <v-btn ref="btn3" @click="cancel" class="botone mx-auto" :color="color" outlined
                      >cerrar
                      <v-icon :color="color" dark translate="true" class="ml-2">fa-circle-xmark</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0" v-if="btn_cancel">
                  <v-btn ref="btn1" outlined color="success" width="110" class="botone ml-md-13 ml-sm-10" @click="confirm">
                    Aceptar
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0" v-if="btn_cancel">
                  <v-btn color="error" outlined width="110" @click="cancel" class="botone" ref="btn2">
                    cancelar
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" lg="3" md="3" sm="3">
              <lottie-animation
                :animationData="type_alert"
                class="mx-auto botone mt-3"
                style="height: 100px"
                v-if="alert.state"
                :autoPlay="true"
                ref="anim_login"
                id="anim_login"
                :loop="true"
                :speed="2"
                content
              />
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
import error from "../assets/image/error.json";
import info from "../assets/image/info.json";
import warning from "../assets/image/warning.json";
import success from "../assets/image/success.json";
export default {
  props: {
    alert: Object,
  },
  components: {
    LottieAnimation,
  },
  data() {
    return {
      list_alert: {
        warning: ["mdi-alert-circle", "¡Precaución!", warning],
        error: ["mdi-close-octagon-outline", "¡Error!", error],
        success: ["mdi-check-circle-outline", "¡Realizado!", success],
        info: ["mdi-information-outline", "¡Información!", info],
      },
      btn_cancel: false,
      type_alert: "",
      title: "",
      color: "",
      icon: "",
      body: "",
    };
  },
  methods: {
    msjalert(code) {
      this.btn_cancel = true;
      setTimeout(() => {
        this.$refs.btn2.$el.focus();
      }, 100);
      switch (code) {
        case "DL-T":
          this.body = `¿Desea eliminar esta tarea?`;
          break;
        case "PUT-T":
          this.body = `¿Desea editar esta tarea?`;
          break;
        case "POST-T":
          this.body = `¿Desea guardar esta tarea?`;
          break;
        default:
          this.body = this.alert.code;
          break;
      }
      return this.body;
    },
    msjError(code) {
      setTimeout(() => {
        this.$refs.btn3.$el.focus();
      }, 100);
      switch (code) {
        case "POST-T-E":
          this.body = `La tarea no se pudo crear`;
          break;
        case "POST-T":
          this.body = `Tarea creada correctamente`;
          break;
        case "PUT-T":
          this.body = `Tarea editada correctamente`;
          break;
        case "PUT-T-E":
          this.body = `La tarea no se pudo editar`;
          break;

        default:
          this.body = this.alert.description;
          break;
      }
      return this.body;
    },
    validTypeAlert() {
      for (const key of Object.keys(this.list_alert)) {
        if (this.alert.type == key) {
          this.type_alert = this.list_alert[key][2];
          this.title = this.list_alert[key][1];
          this.icon = this.list_alert[key][0];
          this.color = key;
          break;
        }
      }
    },
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
    exit() {
      if (event.keyCode === 27) {
        if (this.btn_cancel) {
          this.$emit("cancel");
        } else {
          this.$emit("exitEsc");
        }
      }
    },
    checkKey(event) {
      switch (event.which) {
        case 39: //right
          this.$refs.btn2.$el.focus();
          break;
        case 37: //left
          this.$refs.btn1.$el.focus();
          break;
        default:
          null;
          break;
      }
    },
  },
  created() {
    this.validTypeAlert();
  },
  mounted() {
    if (["p", "P"].includes(this.alert.option)) {
      this.msjalert(this.alert.code);
    } else {
      this.msjError(this.alert.code);
    }
    document.addEventListener("keydown", this.exit);
    document.addEventListener("keydown", this.checkKey);
  },
  destroyed() {
    document.removeEventListener("keydown", this.exit);
    document.removeEventListener("keydown", this.checkKey);
  },
};
</script>
