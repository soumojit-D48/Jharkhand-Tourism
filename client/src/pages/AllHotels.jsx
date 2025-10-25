

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, IndianRupee, Star, Hotel, Search, X, SlidersHorizontal } from 'lucide-react';
import { apiService } from '@/lib/api';

export default function AllHotels() {
  const navigate = useNavigate();
  
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0,
  });

  // Filter & Sort state
  const [filters, setFilters] = useState({
    search: '',
    district: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  // Temporary filter state for input fields
  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Fetch hotels whenever pagination or filters change
  useEffect(() => {
    fetchHotels();
  }, [pagination.page, filters]);

  const fetchHotels = async () => {
    setIsLoading(true);
    setError('');
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        order: filters.order,
      };

      // Add filters if they have values
      if (filters.search) params.search = filters.search;
      if (filters.district) params.district = filters.district;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.rating) params.rating = filters.rating;

      const response = await apiService.getAllHotels(params);
      setHotels(response.hotels);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      district: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'createdAt',
      order: 'desc',
    };
    setFilters(resetFilters);
    setTempFilters(resetFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick filter for sort/order changes (no Apply button needed)
  const handleQuickFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setTempFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Hotels</h1>
        <p className="text-gray-600">
          Find the perfect stay from our collection of {pagination.total} hotels
        </p>
      </div>

      {/* Search Bar & Quick Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search hotels by name or description..."
                  value={tempFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                  className="pl-10"
                />
              </div>
              <Button onClick={applyFilters}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Quick Sort Options */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Sort by:</span>
              <Select value={filters.sortBy} onValueChange={(val) => handleQuickFilter('sortBy', val)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest First</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="priceRange.min">Price (Low to High)</SelectItem>
                  <SelectItem value="priceRange.max">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.order} onValueChange={(val) => handleQuickFilter('order', val)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>

              {(filters.search || filters.district || filters.minPrice || filters.maxPrice || filters.rating) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="pt-4 border-t space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* District Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">District</label>
                    <Input
                      placeholder="e.g., Kolkata"
                      value={tempFilters.district}
                      onChange={(e) => handleFilterChange('district', e.target.value)}
                    />
                  </div>

                  {/* Min Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Min Price (₹)</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={tempFilters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>

                  {/* Max Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Price (₹)</label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={tempFilters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>

                  {/* Min Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Min Rating</label>
                    <Select value={tempFilters.rating} onValueChange={(val) => handleFilterChange('rating', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=" ">Any Rating</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="2">2+ Stars</SelectItem>
                        <SelectItem value="1">1+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={applyFilters} className="flex-1 md:flex-none">
                    Apply Filters
                  </Button>
                  <Button onClick={clearFilters} variant="outline" className="flex-1 md:flex-none">
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : hotels.length === 0 ? (
        /* Empty State */
        <Card className="text-center py-12">
          <CardContent>
            <Hotel className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Hotels Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search criteria
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {hotels.map((hotel) => (
              <Card key={hotel._id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/hotels/${hotel._id}`)}>
                {/* Hotel Image */}
                <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  {hotel.images && hotel.images.length > 0 ? (
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-300">
                      <Hotel className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  {hotel.rating > 0 && (
                    <Badge className="absolute top-3 right-3 bg-white text-gray-900">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">
                    {hotel.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {hotel.location.district}, {hotel.location.address}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {hotel.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Hotel className="w-4 h-4" />
                      <span className="font-medium">
                        {hotel.rooms?.length || 0} Rooms
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      {hotel.priceRange.min} - {hotel.priceRange.max}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t">
                  <Button className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/hotels/${hotel._id}`);
                  }}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} hotels
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {/* Show first page */}
                      {pagination.page > 3 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            className="w-10"
                          >
                            1
                          </Button>
                          {pagination.page > 4 && <span className="px-2">...</span>}
                        </>
                      )}

                      {/* Show pages around current page */}
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                        .filter(page => 
                          page === pagination.page ||
                          page === pagination.page - 1 ||
                          page === pagination.page + 1 ||
                          page === pagination.page - 2 ||
                          page === pagination.page + 2
                        )
                        .map((page) => (
                          <Button
                            key={page}
                            variant={pagination.page === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        ))}

                      {/* Show last page */}
                      {pagination.page < pagination.pages - 2 && (
                        <>
                          {pagination.page < pagination.pages - 3 && <span className="px-2">...</span>}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(pagination.pages)}
                            className="w-10"
                          >
                            {pagination.pages}
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}