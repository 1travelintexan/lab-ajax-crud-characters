class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    return await axios.get(`${this.BASE_URL}/characters`);
  }

  async getOneRegister(id) {
    return await axios.get(`${this.BASE_URL}/characters/${id}`);
  }

  async createOneRegister(newCharacter) {
    await axios.post(`${this.BASE_URL}/characters`, newCharacter);
  }

  async updateOneRegister(id, updatedInfo) {
    await axios.put(`${this.BASE_URL}/characters/${id}`, updatedInfo);
  }

  async deleteOneRegister(id) {
    await axios.delete(`${this.BASE_URL}/characters/${id}`);
  }
}
