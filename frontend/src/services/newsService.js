import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/news";

const newsService = {
  // Ambil semua berita
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Ambil satu berita
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Tambah berita
  create: async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update berita
  update: async (id, formData) => {
    formData.append("_method", "PUT");

    const response = await axios.post(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Hapus berita
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default newsService;