import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedToGlobal: { type: -1 },
    status: '',
    token: localStorage.getItem('token') || '',
    userEmail: '',
    pomodoro: {
      running: false,
      paused: false,
      stopped: true,
      timerCount: null,
      timeLimit: null,
      min: null,
      secs: null,
      warning: null,
      alert: null,
      pomodoroType: 1
    },
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
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    auth_success (state, token, userEmail) {
      state.status = 'success'
      state.token = token
      state.userEmail = userEmail
      console.log(state)
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.userEmail = ''
    }
  },
  actions: {
  }
})
