import { useEffect, useState } from "react";
import newsService from "../services/newsService";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image: null,
    status: "published",
  });

  const [preview, setPreview] = useState(null);

  const API_URL = "http://127.0.0.1:8000";

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAll();
      setNews(data);
    } catch (error) {
      console.error("Gagal mengambil berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      content: "",
      image: null,
      status: "published",
    });

    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await newsService.update(editingId, formData);
        alert("Berita berhasil diperbarui!");
      } else {
        await newsService.create(formData);
        alert("Berita berhasil ditambahkan!");
      }

      resetForm();
      setShowForm(false);
      await fetchNews();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);

      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }

      alert(
        editingId ? "Gagal memperbarui berita." : "Gagal menambahkan berita.",
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      content: item.content || "",
      image: null,
      status: item.status || "published",
    });

    if (item.image) {
      setPreview(`${API_URL}/storage/${item.image}`);
    } else {
      setPreview(null);
    }

    setShowForm(true);
    setShowView(false);
  };

  const handleView = (item) => {
    setSelectedNews(item);
    setShowView(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus berita ini?",
    );

    if (!confirmDelete) return;

    try {
      await newsService.delete(id);
      alert("Berita berhasil dihapus!");
      await fetchNews();
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
      alert("Gagal menghapus berita.");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}/storage/${image}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm font-semibold tracking-widest text-cyan-500">
              CONTENT MANAGEMENT
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#123F72] mt-2">
              News
            </h1>

            <p className="text-gray-500 mt-2">
              Kelola berita dan insight Senvra.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-[#123F72] hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Tambah Berita
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#123F72]">
                  {editingId ? "Edit Berita" : "Tambah Berita"}
                </h2>

                {editingId && (
                  <p className="text-sm text-gray-400 mt-1">
                    Perbarui informasi berita
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Berita
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul berita"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Contoh: Insight"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Singkat
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Deskripsi singkat berita"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Isi Berita
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Tulis isi berita..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gambar Berita
                </label>

                <label
                  htmlFor="berita-image"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#123F72]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
                    />
                  </svg>

                  <span>Pilih Gambar</span>

                  <input
                    id="berita-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {form.image && (
                  <span className="ml-3 text-sm text-gray-400">
                    {form.image.name}
                  </span>
                )}

                {preview && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-2">Preview gambar</p>

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-60 h-36 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-[#123F72] hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  {editingId ? "Update Berita" : "Simpan Berita"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#123F72]">Daftar Berita</h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Memuat berita...
            </div>
          ) : news.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Belum ada berita.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Gambar
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Judul
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Kategori
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {news.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.title}
                            className="w-20 h-14 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#123F72]">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "published"
                              ? "bg-green-50 text-green-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleView(item)}
                            className="text-[#123F72] hover:text-cyan-500 font-semibold text-sm"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 font-semibold text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showView && selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            <div className="relative">
              {selectedNews.image ? (
                <img
                  src={getImageUrl(selectedNews.image)}
                  alt={selectedNews.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowView(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">
                  {selectedNews.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedNews.status === "published"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {selectedNews.status}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[#123F72] leading-tight">
                {selectedNews.title}
              </h2>

              <p className="text-sm text-gray-400 mt-3">
                {selectedNews.published_at
                  ? new Date(selectedNews.published_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : selectedNews.created_at
                    ? new Date(selectedNews.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )
                    : "-"}
              </p>

              {selectedNews.description && (
                <p className="mt-6 text-lg text-gray-600 leading-relaxed font-medium">
                  {selectedNews.description}
                </p>
              )}

              {selectedNews.content && (
                <div className="mt-6 text-gray-600 leading-8 whitespace-pre-line">
                  {selectedNews.content}
                </div>
              )}

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleEdit(selectedNews)}
                  className="bg-[#123F72] hover:bg-cyan-500 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  Edit Berita
                </button>

                <button
                  type="button"
                  onClick={() => setShowView(false)}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
