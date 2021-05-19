import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workspaces: [
      {
        id: 0,
        name: 'Matemática',
        description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
        icon: { blank: true, width: 70, height: 70, class: 'm1' },
        tasks: [],
        pomodoros: [],
        columns: []
      },
      {
        id: 1,
        name: 'Português',
        description: 'Aprimoramento da língua portuguesa e suas nuances do cotidiano',
        icon: { blank: true, width: 70, height: 70, class: 'm1' },
        tasks: [],
        pomodoros: [],
        columns: []
      },
      {
        id: 2,
        name: 'Geografia',
        description: 'Compreensão acerca dos eventos geográficos da atualidade',
        icon: { blank: true, width: 70, height: 70, class: 'm1' },
        tasks: [],
        pomodoros: [],
        columns: []
      },
      {
        id: 3,
        name: 'Biologia',
        description: 'Todo o enredo da biologia secular',
        icon: { blank: true, width: 70, height: 70, class: 'm1' },
        tasks: [],
        pomodoros: [],
        columns: []
      },
      {
        id: 4,
        name: 'História do Brasil',
        description: 'Estudo sobre a história do Brasil na época antiga e moderna',
        icon: { blank: true, width: 70, height: 70, class: 'm1' },
        tasks: [],
        pomodoros: [],
        columns: []
      }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
