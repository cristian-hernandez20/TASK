<template>
  <v-app-bar app color="primary" dark>
    <v-row justify="center" align="center">
      <v-col>
        <div class="text-center text-title">
          <h1>LISTA DE TAREAS <v-icon size="34" class="mb-2">mdi-book</v-icon></h1>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ getTasks: "task/getTasks" }),
  },
};
</script>
<style>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
