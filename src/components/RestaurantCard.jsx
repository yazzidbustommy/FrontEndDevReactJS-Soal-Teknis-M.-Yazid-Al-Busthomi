import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const {
    id,
    name,
    image,
    cuisineType,
    rating,
    priceRange,
    isOpen
  } = restaurant;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">{cuisineType}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">{'$'.repeat(priceRange)}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        <Link
          to={`/restaurant/${id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;