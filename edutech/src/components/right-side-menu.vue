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

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    userName: String
  },
  data: () => {
    return {
      drawerOpen: false,
      group: null
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
