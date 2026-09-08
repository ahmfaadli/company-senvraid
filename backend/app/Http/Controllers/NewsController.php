<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Menampilkan semua berita
     */
    public function index()
    {
        $news = News::orderBy('created_at', 'desc')->get();

        return response()->json($news);
    }

    /**
     * Menyimpan berita baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'status' => 'nullable|in:draft,published',
        ]);

        // Membuat slug dari judul
        $slug = Str::slug($request->title);

        // Pastikan slug unik
        $originalSlug = $slug;
        $counter = 1;

        while (News::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;

        // Status default
        $validated['status'] = $request->status ?? 'published';

        // Upload gambar
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('news', 'public');
        }

        $news = News::create($validated);

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'data' => $news
        ], 201);
    }

    /**
     * Menampilkan satu berita
     */
    public function show(string $id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        return response()->json($news);
    }

    /**
     * Update berita
     */
    public function update(Request $request, string $id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'status' => 'nullable|in:draft,published',
        ]);

        // Jika judul berubah, buat slug baru
        if ($request->title !== $news->title) {
            $slug = Str::slug($request->title);

            $originalSlug = $slug;
            $counter = 1;

            while (
                News::where('slug', $slug)
                    ->where('id', '!=', $news->id)
                    ->exists()
            ) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        // Upload gambar baru
        if ($request->hasFile('image')) {

            // Hapus gambar lama
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }

            $validated['image'] = $request->file('image')
                ->store('news', 'public');
        }

        $news->update($validated);

        return response()->json([
            'message' => 'Berita berhasil diperbarui',
            'data' => $news
        ]);
    }

    /**
     * Menghapus berita
     */
    public function destroy(string $id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json([
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        // Hapus gambar
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json([
            'message' => 'Berita berhasil dihapus'
        ]);
    }
}