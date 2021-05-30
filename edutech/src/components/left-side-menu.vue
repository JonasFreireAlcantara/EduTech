<template>
  <v-navigation-drawer
  v-model="drawerOpen"
  absolute
  bottom
  temporary
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
        <h2>Workspaces</h2>

        <div class="h-line"></div>

        <v-list-item v-for="workspace in workspaces" :key="workspace.id">
          <v-list-item-title @click="openWorkspace(workspace.id)">{{workspace.name}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      drawerOpen: false,
      group: null,
      workspaces: this.$store.state.workspaces
    }
  },
  updated: function () {
    this.$emit('newdata', [this.drawerOpen, false])
  },
  watch: {
    drawer: function (newVal) {
      this.drawerOpen = newVal
    },
    group: function () {
      this.drawerOpen = false
    }
  },
  methods: {
    openWorkspace: function (id) {
      if (this.$route.path !== '/workspace/' + id) {
        this.$router.push({ path: '/workspace/' + id })
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

  h2 {
    text-align: center;
    margin: 8px 0 0;
  }
</style>
