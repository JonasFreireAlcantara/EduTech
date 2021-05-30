<template>
  <v-navigation-drawer
  v-model="drawerOpen"
  absolute
  bottom
  temporary
  right
  style="z-index:100;"
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <h2>{{userName ? userName : 'Usuário'}}</h2>

        <div class="h-line"></div>

        <v-list-item>
          <v-list-item-title>Opção 1</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Opção 2</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script src="https://apis.google.com/js/platform.js"></script>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      drawerOpen: false,
      group: null,
      userName: null
    }
  },
  updated: function () {
    this.$emit('newdata', [false, this.drawerOpen])
  },
  watch: {
    drawer: function (newVal) {
      this.drawerOpen = newVal
    },
    group: function () {
      this.drawerOpen = false
    }
  },
  created: function () {
    if (gapi.auth2) {
      const auth = gapi.auth2.init()
      if (auth.isSignedIn.get()) {
        this.userIcon = auth.currentUser.get().getBasicProfile().uK
        this.userName = auth.currentUser.get().getBasicProfile().Ue
      }
    }
  }
}
</script>

<style scoped>
  .h-line {
    height: 1px;
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid rgb(211, 211, 211);
  }
</style>
