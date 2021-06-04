<template>
  <b-modal id="newWorkspaceModal" ref="workspaceModal" title="Novo Workspace" size="lg" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-form @submit="onSubmit">
      <b-form-row>
        <b-col cols="4" class="text-center">
          <b-form-group
            id="imageLabel"
            label=""
            label-for="iconInput"
          >
            <b-link class="notify-badge shadow" @click="selectImage"><b-icon icon="pencil-square"></b-icon></b-link>
            <img v-if="tempURL===null" :src="defaultIcon" width="150" height="150"/>
            <b-img v-if="tempURL!==null" id="iconInput" :src="tempURL" width="150" height="150" rounded="circle" alt="Workspace Icon"></b-img>
            <b-form-file id="fileInput" :value="file" class="invisible" plain accept="image/*" @change="changeImage"></b-form-file>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group
            id="nameLabel"
            label="Nome:"
            label-for="nameInput"
          >
            <b-form-input
              id="nameInput"
              v-model="workspace.name"
              type="text"
              placeholder="Digite o nome"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="descLabel"
            label="Descrição:"
            label-for="descInput"
          >
            <b-form-textarea
              id="descInput"
              v-model="workspace.description"
              type="text"
              placeholder="Digite a descrição"
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
import axios from '../../variables/variables'

export default {
  data () {
    return {
      workspace: {
        name: '',
        description: '',
        icon: null,
        tasks: [],
        pomodoros: [],
        columns: [],
        lastAccess: null,
        owner: ''
      },
      defaultIcon: require('../../assets/iconPlaceholder.png'),
      file: null,
      tempURL: null
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      var userEmail = this.$store.state.useremail
      await axios.get(`user/${userEmail}`).then((response) => { this.workspace.owner = response.data._id })
      var formData = new FormData()
      var imagefile = this.workspace.icon
      formData.append('file', imagefile)
      formData.append('name', this.workspace.name)
      formData.append('description', this.workspace.description)
      formData.append('owner', this.workspace.owner)
      await axios.post('workspace', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => { this.$store.dispatch('loadWorkspaces'); this.hideModal() })
    },
    selectImage () {
      document.getElementById('fileInput').click()
    },
    changeImage (event) {
      this.tempURL = URL.createObjectURL(event.target.files[0])
      this.workspace.icon = event.target.files[0]
    },
    hideModal () {
      this.$refs.workspaceModal.hide()
    }
  }
}
</script>

<style scoped>
.notify-badge{
    position: absolute;
    right:3.5rem;
    top:1rem;
    text-align: center;
    background-color: rgb(253, 253, 253);
    border-radius: 30px 30px 30px 30px;
    padding:5px 10px;
    font-size:20px;
}
</style>
