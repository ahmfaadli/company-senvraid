import { useEffect, useState } from "react";
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../services/portfolioService";

const API_URL = "http://127.0.0.1:8000";

const initialForm = {
  title: "",
  description: "",
  tech: "",
  image: null,
};

function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolios();
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
    setEditingId(null);
    setForm(initialForm);
    setPreview(null);

    const fileInput = document.getElementById("portfolio-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("tech", form.tech);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await updatePortfolio(editingId, formData);
        setSuccess("Portfolio berhasil diperbarui.");
      } else {
        await createPortfolio(formData);
        setSuccess("Portfolio berhasil ditambahkan.");
      }

      resetForm();
      setShowForm(false);
      await loadPortfolios();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (portfolio) => {
    setEditingId(portfolio.id);

    setForm({
      title: portfolio.title || "",
      description: portfolio.description || "",
      tech: portfolio.tech || "",
      image: null,
    });

    setPreview(portfolio.image ? getImageUrl(portfolio.image) : null);

    setShowForm(true);
    setShowView(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleView = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowView(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus portfolio ini?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      await deletePortfolio(id);

      setSuccess("Portfolio berhasil dihapus.");
      await loadPortfolios();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Gagal menghapus portfolio.");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return null;

    return image.startsWith("http") ? image : `${API_URL}/storage/${image}`;
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
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
              Portfolio
            </h1>

            <p className="text-gray-500 mt-2">
              Kelola project dan portfolio Senvra.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="bg-[#123F72] hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Tambah Portfolio
          </button>
        </div>

        {success && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-100 text-green-600 px-5 py-4">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-100 text-red-600 px-5 py-4">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#123F72]">
                  {editingId ? "Edit Portfolio" : "Tambah Portfolio"}
                </h2>

                {editingId && (
                  <p className="text-sm text-gray-400 mt-1">
                    Perbarui informasi portfolio
                  </p>
                )}
              </div>

              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Portfolio
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Contoh: Food Ordering App"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teknologi
                </label>

                <input
                  type="text"
                  name="tech"
                  value={form.tech}
                  onChange={handleChange}
                  placeholder="Contoh: React & Laravel"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Deskripsikan project..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gambar Portfolio
                </label>

                <label
                  htmlFor="portfolio-image"
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
                    id="portfolio-image"
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

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#123F72] hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  {saving
                    ? "Menyimpan..."
                    : editingId
                      ? "Update Portfolio"
                      : "Simpan Portfolio"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
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
            <h2 className="text-lg font-bold text-[#123F72]">
              Daftar Portfolio
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Memuat portfolio...
            </div>
          ) : portfolios.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Belum ada portfolio.
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
                      Portfolio
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Teknologi
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {portfolios.map((portfolio) => (
                    <tr
                      key={portfolio.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {portfolio.image ? (
                          <img
                            src={getImageUrl(portfolio.image)}
                            alt={portfolio.title}
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
                          {portfolio.title}
                        </p>

                        <p className="text-xs text-gray-400 mt-1 max-w-md line-clamp-2">
                          {portfolio.description}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">
                          {portfolio.tech || "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleView(portfolio)}
                            className="text-[#123F72] hover:text-cyan-500 font-semibold text-sm"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(portfolio.id)}
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

      {showView && selectedPortfolio && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            <div className="relative">
              {selectedPortfolio.image ? (
                <img
                  src={getImageUrl(selectedPortfolio.image)}
                  alt={selectedPortfolio.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <button
                onClick={() => setShowView(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {selectedPortfolio.tech && (
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">
                    {selectedPortfolio.tech}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-bold text-[#123F72] leading-tight">
                {selectedPortfolio.title}
              </h2>

              {selectedPortfolio.description && (
                <p className="mt-6 text-lg text-gray-600 leading-relaxed font-medium">
                  {selectedPortfolio.description}
                </p>
              )}

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(selectedPortfolio)}
                  className="bg-[#123F72] hover:bg-cyan-500 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  Edit Portfolio
                </button>

                <button
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

export default AdminPortfolio;
