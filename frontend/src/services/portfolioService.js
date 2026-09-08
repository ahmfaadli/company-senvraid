const API_URL = "http://127.0.0.1:8000/api";

export const getPortfolios = async () => {
    const response = await fetch(`${API_URL}/portfolios`);

    if (!response.ok) {
        throw new Error("Gagal mengambil data portfolio");
    }

    const result = await response.json();

    return result.data ?? result;
};

export const createPortfolio = async (formData) => {
    const response = await fetch(`${API_URL}/portfolios`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Gagal menambahkan portfolio"
        );
    }

    return result;
};

export const updatePortfolio = async (id, formData) => {
    formData.append("_method", "PUT");

    const response = await fetch(`${API_URL}/portfolios/${id}`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Gagal mengubah portfolio"
        );
    }

    return result;
};

export const deletePortfolio = async (id) => {
    const response = await fetch(`${API_URL}/portfolios/${id}`, {
        method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Gagal menghapus portfolio"
        );
    }

    return result;
};