import { Switch } from "@headlessui/react";

function FilterSection({ filters, setFilters }) {
  const priceRanges = [1, 2, 3, 4];
  const cuisineTypes = [
    "All",
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "American",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-5">
          <span className="font-medium">Open Now</span>
          <Switch
            checked={filters.isOpenNow}
            onChange={(checked) =>
              setFilters((prev) => ({ ...prev, isOpenNow: checked }))
            }
            className={`${
              filters.isOpenNow ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                filters.isOpenNow ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div>
          <span className="font-medium block mb-2">Price Range</span>
          <div className="flex gap-2">
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: prev.priceRange.includes(range)
                      ? prev.priceRange.filter((r) => r !== range)
                      : [...prev.priceRange, range],
                  }));
                }}
                className={`px-3 py-1 rounded-full ${
                  filters.priceRange.includes(range)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                } hover:bg-opacity-90 transition-colors`}
              >
                {"$".repeat(range)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="font-medium block mb-2">Category</span>
          <select
            value={filters.cuisineType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, cuisineType: e.target.value }))
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine} value={cuisine === "All" ? "" : cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
