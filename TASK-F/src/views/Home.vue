<template>
  <v-app :style="{ background: '#eceef9' }">
    <AppBar />
    <ListTask />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import ListTask from "../components/ListTasks.vue";

export default {
  name: "Home",
  components: { AppBar, ListTask },
};
</script>
