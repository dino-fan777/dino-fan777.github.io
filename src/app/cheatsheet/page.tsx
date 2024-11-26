"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories, cheatsheets } from "../../../public/data/cheatsheet";

export default function Cheatsheet() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [selectedCheatsheet, setSelectedCheatsheet] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  const filteredCheatsheets = cheatsheets.filter(
    (cheatsheet) =>
      cheatsheet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(cheatsheet.category))
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">CTF Cheatsheets</h1>
        <AnimatePresence mode="wait">
          {selectedCheatsheet === null ? (
            <motion.div
              key="cheatsheet-list"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Search cheatsheets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-1">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {filteredCheatsheets.map((cheatsheet) => (
                  <motion.div
                    key={cheatsheet.id}
                    className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedCheatsheet(cheatsheet.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {cheatsheet.title}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {cheatsheet.category}
                        </p>
                      </div>
                      <ChevronRight />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cheatsheet-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedCheatsheet(null)}
              >
                &larr; Back to Cheatsheets
              </button>
              <div className="bg-gray-800 p-6 rounded">
                {(() => {
                  const cheatsheet = cheatsheets.find(
                    (c) => c.id === selectedCheatsheet
                  );

                  if (!cheatsheet) return <p>Cheatsheet not found</p>;

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">
                        {cheatsheet.title}
                      </h2>
                      <p className="text-sm text-gray-400 mb-4">
                        Category: {cheatsheet.category}
                      </p>
                      {cheatsheet.content}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
