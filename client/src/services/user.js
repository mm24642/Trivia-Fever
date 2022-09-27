import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(baseUrl, newObject, config)
  return response.data
}


export default { setToken, getAll, update }