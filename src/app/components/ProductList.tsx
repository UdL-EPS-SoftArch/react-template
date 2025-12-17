"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/app/components/searchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons"; // Assegura't de tenir instal·lat fontawesome o fes servir Lucide

// 1. ACTUALITZEM LA INTERFÍCIE
interface SimpleProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
  available?: boolean;
  categoryName: string; // <--- AFEGIT: Ara és obligatori
}

interface ProductListProps {
  initialProducts: SimpleProduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) // Ara busquem també per categoria
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found matching &quot;{searchTerm}&quot;.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const stockCount = Number(product.stock || 0);
            const hasStock = stockCount > 0;

            return (
              <Card key={product.id} className="flex flex-col h-full relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        {/* 2. PINTEM LA CATEGORIA COM UN BADGE */}
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide">
                            <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                            {product.categoryName}
                        </span>
                        <CardTitle className="text-xl line-clamp-1" title={product.name}>
                            {product.name}
                        </CardTitle>
                    </div>
                    <span className="font-bold text-lg text-blue-600 whitespace-nowrap">
                      {product.price}€
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                    {product.description || "No description available."}
                  </p>
                  <div className="flex gap-2 text-xs font-medium">
                    <span className={hasStock ? "text-green-600" : "text-red-600"}>
                      {hasStock ? `${stockCount} in stock` : "Out of stock"}
                    </span>
                    {product.available && (
                      <span className="text-blue-500">• Available</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}