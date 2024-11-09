function ReviewSection({ reviews }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <img
                src={review.reviewerPhoto}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{review.reviewerName}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;