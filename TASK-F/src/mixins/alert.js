import alert from "../components/Alert.vue";
export const Alert = {
  components: {
    ALERT: alert,
  },
  data() {
    return {
      alert: {
        state: false,
        type: "",
        code: "",
        description: "",
        option: "",
      },
    };
  },
  methods: {
    sendAlert(code, type, description, option) {
      this.alert.state = true;
      this.alert.code = code;
      this.alert.type = type;
      this.alert.description = description;
      this.alert.option = option;
    },
    deletAlert() {
      this.alert.state = false;
      this.alert.code = "";
      this.alert.type = "";
      this.alert.description = "";
      this.alert.option = "";
    },
  },
};
