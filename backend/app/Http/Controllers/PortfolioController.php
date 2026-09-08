<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Display all portfolios.
     */
    public function index()
    {
        $portfolios = Portfolio::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $portfolios,
        ]);
    }

    /**
     * Store new portfolio.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('portfolios', 'public');
        }

        $portfolio = Portfolio::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil ditambahkan.',
            'data' => $portfolio,
        ], 201);
    }

    /**
     * Display one portfolio.
     */
    public function show(Portfolio $portfolio)
    {
        return response()->json([
            'success' => true,
            'data' => $portfolio,
        ]);
    }

    /**
     * Update portfolio.
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {

            if ($portfolio->image) {
                Storage::disk('public')->delete(
                    $portfolio->image
                );
            }

            $validated['image'] = $request
                ->file('image')
                ->store('portfolios', 'public');
        }

        $portfolio->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil diperbarui.',
            'data' => $portfolio,
        ]);
    }

    /**
     * Delete portfolio.
     */
    public function destroy(Portfolio $portfolio)
    {
        if ($portfolio->image) {
            Storage::disk('public')->delete(
                $portfolio->image
            );
        }

        $portfolio->delete();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil dihapus.',
        ]);
    }
}