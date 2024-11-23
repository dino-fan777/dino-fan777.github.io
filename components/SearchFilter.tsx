import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categories: string[];
}

export function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  categories
}: SearchFilterProps) {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <Input
        type="text"
        placeholder="Search..."
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
            <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

