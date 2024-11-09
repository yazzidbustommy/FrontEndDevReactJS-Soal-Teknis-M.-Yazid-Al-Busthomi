import { useParams, Link } from "react-router-dom"; // Tambahkan Link di sini
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantDetails } from "../api/restaurants";
import ReviewSection from "../components/ReviewSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function RestaurantDetails() {
  const { id } = useParams();

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurantDetails(id),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tambahkan tombol Back di sini */}
      <Link
        to="/"
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-1">{restaurant.rating}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {restaurant.cuisineType}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {"$".repeat(restaurant.priceRange)}
            </span>
            <span
              className={`px-3 py-1 rounded-full ${
                restaurant.isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      <ReviewSection reviews={restaurant.reviews} />
    </div>
  );
}

export default RestaurantDetails;
