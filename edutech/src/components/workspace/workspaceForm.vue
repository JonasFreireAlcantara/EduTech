<template>
  <b-modal id="newWorkspaceModal" title="Novo Workspace" size="lg" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-form @submit="onSubmit">
      <b-form-row>
        <b-col cols="4" class="text-center">
          <b-form-group
            id="imageLabel"
            label=""
            label-for="iconInput"
          >
            <b-link class="notify-badge shadow" @click="selectImage"><b-icon icon="pencil-square"></b-icon></b-link>
            <img v-if="tempURL===null" :src="defaultIcon" width="150"/>
            <b-img v-if="tempURL!==null" id="iconInput" :src="tempURL" width="150" rounded="circle" alt="Workspace Icon"></b-img>
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
      var userEmail = this.$store.state.user.email
      console.log(userEmail)
      await axios.get(`user/${userEmail}`).then((response) => { console.log(response) })

      await axios.post('workspace', this.workspace).then(() => { alert('Workspace adicionado com sucesso!') })
    },
    selectImage () {
      document.getElementById('fileInput').click()
    },
    changeImage (event) {
      this.tempURL = URL.createObjectURL(event.target.files[0])
      event.target.files[0].arrayBuffer().then(buffer => {
        this.workspace.icon = buffer
      })
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
