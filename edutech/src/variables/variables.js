import ax from 'axios'

// Axios to use on project
const apiPort = 5000
const axios = ax.create({ baseURL: `http://localhost:${apiPort}/api/` })

export default axios
