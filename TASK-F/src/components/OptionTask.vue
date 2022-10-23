<template>
  <v-dialog v-model="option.state" max-width="1000px">
    <v-card>
      <v-footer color="primary" height="60">
        <h1 class="white--text mx-auto">
          {{ `${option.option_text == "save" ? "Guardar Tarea" : "Editar tarea"}` }}
          <v-icon color="white" size="30">{{ option.icon }}</v-icon>
        </h1>
      </v-footer>
      <v-card-title>
        <span class="text-h5">{{ option.title_option }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="3" md="3">
              <v-text-field v-model="form.description" outlined dense type="text" placeholder="Descripción" label="Descripción"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field v-model="form.date" outlined dense type="date" maxlenght="10" placeholder="Fecha" label="Fecha"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field v-model="form.hour" outlined dense type="time" placeholder="Hora" label="Hora"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" v-if="option.option_text == 'edit'">
              <v-autocomplete
                v-model="form.condition"
                placeholder="Condición"
                :items="condition"
                label="Condición"
                item-value="id"
                outlined
                dense
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="botone" @click="option.state = false"> Cancelar </v-btn>
        <v-btn color="green" class="botone" dark @click="optionTask()"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Alert } from "@/mixins/alert.js";

export default {
  props: {
    option: Object,
  },
  mixins: [Alert],

  data() {
    return {
      condition: [
        { id: "complete", text: "Completada" },
        { id: "incomplete", text: "Incompletada" },
      ],
      form: {
        description: "",
        date: "",
        hour: "",
        condition: "incomplete",
      },
      form_default: {
        description: "",
        date: "",
        hour: "",
        condition: "incomplete",
      },
    };
  },
  methods: {
    ...mapActions({
      _addTask: "task/_addTask",
      _putTask: "task/_putTask",
    }),
    ...mapMutations({
      pushTask: "task/pushTask",
    }),
    cancel() {
      this.option.state = false;
    },
    confirm() {
      switch (this.option.option_text) {
        case "save":
          this.createdTask();
          break;
        case "edit":
          this.editTask();
          break;
        default:
          break;
      }
    },
    optionTask() {
      switch (this.option.option_text) {
        case "save":
          this.sendAlert("POST-T", "info", null, "P");
          break;
        case "edit":
          this.sendAlert("PUT-T", "info", null, "P");
          break;
        default:
          break;
      }
    },

    async editTask() {
      this.deletAlert();
      const id_task = this.option.data.id;
      const data = {
        description: this.form.description,
        date: this.form.date,
        hour: this.form.hour,
        condition: this.form.condition,
      };
      let res = await this._putTask({ id_task, data });

      if (res.status == 200) {
        setTimeout(() => {
          this.sendAlert("PUT-T", "success");
        }, 100);
      } else {
        setTimeout(() => {
          this.sendAlert("PUT-T-E", "error");
        }, 100);
      }
    },

    async createdTask() {
      this.deletAlert();
      const data = {
        description: this.form.description,
        date: this.form.date,
        hour: this.form.hour,
      };
      let res = await this._addTask(data);
      if (res.status == 200) {
        setTimeout(() => {
          this.sendAlert("POST-T", "success");
        }, 100);
      } else {
        setTimeout(() => {
          this.sendAlert("POST-T-E", "error");
        }, 100);
      }
    },
  },
  mounted() {
    if (this.option.option_text == "edit") this.form = this.option.data;
    else this.form = Object.assign({}, this.form_default);
  },
};
</script>
