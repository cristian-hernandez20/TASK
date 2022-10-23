import postData from "@/axios_res";

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  getters: {
    getTasks: (state) => (list) => state[list],
  },
  mutations: {
    setTask(state, data) {
      state[data.list] = data.data;
    },
    pushTask(state, data) {
      state[data.list].push(data.data);
    },
    editTask(state, data) {
      const indice = state[data.list].map((e) => e.id).indexOf(data.data.id);
      state[data.list][indice] = data.data;
    },
  },
  actions: {
    async _addTask({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "post", url: `tasks/create`, data });
        if (RES.status == 200) {
          commit("pushTask", { list: "tasks", data: RES.data });
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_addTask", error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _putTask({ commit }, { id_task, data }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "PUT", url: `tasks/edit/${id_task}`, data });
        if (RES.status == 200) {
          commit("editTask", { list: "tasks", data: RES.data });
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_putTask", error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _deleteTask({ commit }, id_task) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "DELETE", url: `tasks/delete/${id_task}` });
        return RES;
      } catch (error) {
        console.error("_deleteTask", error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getTasks({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "GET", url: `tasks/getAll` });
        if (!RES.msg) return commit("setTask", { list: "tasks", data: RES.data });
        return RES;
      } catch (error) {
        console.error("_getTasks", error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getTask({ commit }, { id_task }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "GET", url: `task/${id_task}` });
        return RES;
      } catch (error) {
        console.error("_getTask", error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
