import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../variables/variables'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedToGlobal: { type: -1 },
    status: '',
    userIcon: null,
    userName: null,
    token: localStorage.getItem('token') || '',
    useremail: localStorage.getItem('useremail') || '',
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
      pomodoroType: 1,
      changed: { count: 0 },
      workspaceId: null,
      pomodoroId: null
    },
    workspaces: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    workspaces: state => {
      return state.workspaces
    },
    getWorkspaceById: state => (id) => {
      return state.workspaces.find(el => el.id === id)
    }
  },
  mutations: {
    auth_update (state, user) {
      state.useremail = user.useremail
      state.userIcon = user.userIcon
      state.userName = user.userName
      state.token = user.token
    },
    auth_success (state, user) {
      state.status = 'success'
      state.token = user.getId()
      state.useremail = user.getEmail()
      state.userIcon = user.getImageUrl()
      state.userName = user.getName()
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.useremail = ''
      state.userIcon = ''
      state.userName = ''
    },
    SET_Workspaces (state, workspaces) {
      state.workspaces = workspaces
    }
  },
  actions: {
    async loadWorkspaces ({ commit }) {
      let ownerId = ''
      await axios.get(`user/${this.state.useremail}`).then((response) => { ownerId = response.data._id })
      await axios.get('workspace/OwnerId/' + ownerId)
        .then(response => response.data)
        .then(workspaces => {
          commit('SET_Workspaces', workspaces)
        })
    }
  }
})
