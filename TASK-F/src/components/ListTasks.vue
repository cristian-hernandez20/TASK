<template>
  <v-container fluid>
    <v-row justify="center" class="mx-10 mt-14">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="12">
          <v-card-text class="text-title primary--text mt-0">
            <h2 class="text-start">
              Listado de tareas
              <v-icon color="primary" class="mb-1">mdi-book</v-icon>
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="12" :disabled="_state_loading">
          <v-card-text class="text-center primary--text mt-0">
            <v-row justify="start">
              <v-col cols="4" lg="4" sm="4" md="4">
                <v-text-field
                  append-icon="mdi-text-search-variant"
                  label="Buscar tarea"
                  class="elevation-6"
                  v-model="search"
                  maxlength="30"
                  hide-details
                  outlined
                  dense
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-btn color="primary" class="my-1 botone" dark elevation="10" @click="createTask()">
                  Nueva tarea
                  <v-icon class="ml-2">mdi-book-plus</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="12" lg="12" sm="12" md="12">
                <v-data-table
                  loading-text="Cargando... Por favor Espere"
                  :items="getTasks('tasks')"
                  :loading="_state_loading"
                  :items-per-page="5"
                  class="elevation-5"
                  :headers="headers"
                  :search="search"
                >
                  <template v-slot:[`item.condition`]="{ item }">
                    <v-chip v-if="item.condition == '1'" color="green" dark>
                      COMPLETADA
                      <v-icon color="white" small class="botone ml-2"> mdi-check-circle </v-icon>
                    </v-chip>
                    <v-chip v-else color="accent" dark>
                      INCOMPLETA
                      <v-icon color="white" small class="botone ml-2"> mdi-timer-sand-complete </v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:[`item.favorite`]="{ item }">
                    <v-icon small class="mr-2" :color="`${item.favorite == '1' ? 'yellow' : ''}`" @click="editFavorite(item)">
                      {{ `${item.favorite == "0" ? "mdi-star-outline" : "mdi-star"}` }}
                    </v-icon>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                    <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="_getTasks()"> Cargar tareas </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <OptionTask :option="option" v-if="option.state" />
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import OptionTask from "./OptionTask.vue";
import { Alert } from "@/mixins/alert.js";
export default {
  components: {
    OptionTask,
  },
  mixins: [Alert],
  name: "list-task",
  data: () => ({
    option: {
      state: false,
      option_text: "Nueva tarea",
      icon: "mdi-book-plus",
    },
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Descripci??n", value: "description" },
      { text: "Fecha", value: "date" },
      { text: "Hora", value: "hour" },
      { text: "Condici??n", align: "center", value: "condition" },
      { text: "Favorito", align: "center", value: "favorite" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    edit_index: -1,
    option_task: "",
  }),

  computed: {
    ...mapGetters({ _state_loading: "_stateLoading", getTasks: "task/getTasks" }),
  },
  async created() {
    await this._getTasks();
    this.desserts = this.getTasks("tasks");
    // console.log(this.desserts);
  },

  methods: {
    ...mapActions({
      _getTasks: "task/_getTasks",
      _deleteTask: "task/_deleteTask",
      _putTask: "task/_putTask",
      _putTaskFavorite: "task/_putTaskFavorite",
    }),
    createTask() {
      this.option = {
        state: true,
        option_text: "save",
        icon: "mdi-book-plus",
      };
    },
    editItem(item) {
      this.option = {
        state: true,
        option_text: "edit",
        icon: "mdi-book-edit",
        data: item,
      };
      this.edit_index = this.desserts.indexOf(item);
      this.item_edit = Object.assign({}, item);
    },

    deleteItem(item) {
      this.edit_index = this.desserts.indexOf(item);
      this.item_edit = Object.assign({}, item);

      this.option_task = "delete";
      this.sendAlert("DL-T", "warning", null, "P");
    },
    async editFavorite(item) {
      const indice = this.desserts.map((e) => e.id).indexOf(item.id);
      this.desserts[indice] = item;

      this.edit_index = this.desserts.indexOf(item);
      this.desserts[this.edit_index].favorite = this.desserts[this.edit_index].favorite == "1" ? "0" : "1";

      const id_task = item.id;
      const data = {
        favorite: this.desserts[this.edit_index].favorite,
      };
      let res = await this._putTaskFavorite({ id_task, data });

      if (res.status != 200) {
        setTimeout(() => {
          this.sendAlert("PUT-T-E", "success");
        }, 100);
      }
    },
    cancel() {
      this.deletAlert();
    },
    confirm() {
      switch (this.option_task) {
        case "delete":
          this.deleteItemConfirm();
          break;
        default:
          break;
      }
      this.deletAlert();
      this.option_task = "";
    },

    async deleteItemConfirm() {
      const id_task = this.item_edit?.id;
      let res = await this._deleteTask(id_task);
      if (res.status == 200) {
        this.desserts.splice(this.edit_index, 1);
        setTimeout(() => {
          this.sendAlert("DL-T", "success");
        }, 100);
      } else {
        setTimeout(() => {
          this.sendAlert("DL-T-E", "error");
        }, 100);
      }
    },
  },
};
</script>
