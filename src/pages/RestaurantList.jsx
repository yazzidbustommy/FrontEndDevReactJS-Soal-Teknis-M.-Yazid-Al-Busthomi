import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { fetchRestaurants } from "../api/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import FilterSection from "../components/FilterSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function RestaurantList() {
  const [filters, setFilters] = useState({
    isOpenNow: false,
    priceRange: [],
    cuisineType: "",
  });
  const [displayCount, setDisplayCount] = useState(8);

  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurants", filters.cuisineType],
    queryFn: () => fetchRestaurants(filters.cuisineType),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    const priceRangeMatch =
      filters.priceRange.length === 0 ||
      filters.priceRange.includes(restaurant.priceRange);
    const openNowMatch = !filters.isOpenNow || restaurant.isOpen;
    return priceRangeMatch && openNowMatch;
  });

  const displayedRestaurants = filteredRestaurants?.slice(0, displayCount);
  const hasMore = filteredRestaurants?.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  const handleClearFilters = () => {
    setFilters({
      isOpenNow: false,
      priceRange: [],
      cuisineType: "",
    });
    setDisplayCount(8);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Restaurants</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            ea reprehenderit temporibus explicabo rerum assumenda aliquam
            delectus dignissimos inventore error.
          </p>
        </div>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <FilterSection filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {displayedRestaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {filteredRestaurants?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No restaurants found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
