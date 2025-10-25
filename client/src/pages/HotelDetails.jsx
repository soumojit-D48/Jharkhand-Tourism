


import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Loader2, 
  MapPin, 
  IndianRupee, 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  Bed, 
  Bath, 
  Users,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Hotel
} from 'lucide-react';
import { apiService } from '@/lib/api';

export default function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  
  // Hotel state
  const [hotel, setHotel] = useState(null);
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);
  const [hotelError, setHotelError] = useState('');
  
  // Rooms state
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [roomsError, setRoomsError] = useState('');
  
  // User/Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  
  // UI state
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'hotel' or 'room'
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Filter & Sort state
  const [filters, setFilters] = useState({
    roomType: '',
    isAvailable: '',
    isPetAllowed: '',
    minPrice: '',
    maxPrice: '',
    capacity: '',
    beds: '',
    baths: '',
    amenities: [],
    sortBy: 'pricePerNight',
    order: 'asc',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;

  // Amenities list
  const AMENITIES = [
    "Wi-Fi", "Air Conditioning", "Television", "Mini Bar", "Room Service",
    "Safe Box", "Hair Dryer", "Coffee Maker", "Balcony", "Mountain View",
    "Bathtub", "Shower", "Towels", "Wardrobe", "Work Desk", "Iron",
    "Laundry Service", "Free Parking", "Pool Access", "Gym Access",
    "Pet Friendly", "Smoking Allowed", "Non-smoking Room"
  ];

  const [showAmenities, setShowAmenities] = useState(false);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiService.checkAuth();
        setCurrentUser(response.user);
        setIsManager(response.user?.role === 'manager');
      } catch (err) {
        console.log('Not authenticated');
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoadingHotel(true);
      setHotelError('');
      try {
        const response = await apiService.getHotelById(hotelId);
        setHotel(response.hotel);
        
        // Check if current user is the owner
        if (currentUser && response.hotel.createdBy._id === currentUser.id) {
          setIsOwner(true);
        }
      } catch (err) {
        setHotelError(err.message || 'Failed to load hotel');
      } finally {
        setIsLoadingHotel(false);
      }
    };

    if (hotelId) {
      fetchHotel();
    }
  }, [hotelId, currentUser]);

  // Fetch rooms with filters
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoadingRooms(true);
      setRoomsError('');
      try {
        const params = {};
        if (filters.roomType) params.roomType = filters.roomType;
        if (filters.isAvailable) params.isAvailable = filters.isAvailable;
        if (filters.isPetAllowed) params.isPetAllowed = filters.isPetAllowed;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.capacity) params.capacity = filters.capacity;
        params.sortBy = filters.sortBy;
        params.order = filters.order;

        const response = await apiService.getHotelRooms(hotelId, params);
        
        // Client-side filtering for beds, baths, and amenities
        let filteredRooms = response.rooms;
        
        if (filters.beds) {
          filteredRooms = filteredRooms.filter(room => room.beds >= parseInt(filters.beds));
        }
        
        if (filters.baths) {
          filteredRooms = filteredRooms.filter(room => room.baths >= parseInt(filters.baths));
        }
        
        if (filters.amenities.length > 0) {
          filteredRooms = filteredRooms.filter(room => 
            filters.amenities.every(amenity => room.amenities.includes(amenity))
          );
        }
        
        setRooms(filteredRooms);
      } catch (err) {
        setRoomsError(err.message || 'Failed to load rooms');
      } finally {
        setIsLoadingRooms(false);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      roomType: '',
      isAvailable: '',
      isPetAllowed: '',
      minPrice: '',
      maxPrice: '',
      capacity: '',
      beds: '',
      baths: '',
      amenities: [],
      sortBy: 'pricePerNight',
      order: 'asc',
    });
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      if (deleteType === 'hotel') {
        await apiService.deleteHotel(itemToDelete._id);
        setSuccess('Hotel deleted successfully');
        setTimeout(() => navigate('/manager/hotels'), 1500);
      } else if (deleteType === 'room') {
        await apiService.deleteRoom(itemToDelete._id);
        setSuccess('Room deleted successfully');
        setDeleteDialogOpen(false);
        // Refresh rooms
        const response = await apiService.getHotelRooms(hotelId, {});
        setRooms(response.rooms);
      }
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setRoomsError(err.message || 'Failed to delete');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      setDeleteType('');
    }
  };

  if (isLoadingHotel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (hotelError || !hotel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>{hotelError || 'Hotel not found'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Success Alert */}
      {success && (
        <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Hotel Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            {hotel.images && hotel.images.length > 0 ? (
              <img
                src={hotel.images[selectedImage]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-300">
                <Hotel className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          {hotel.images && hotel.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {hotel.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hotel Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span>{hotel.location.district}</span>
              </div>
              <p className="text-gray-600">{hotel.location.address}</p>
            </div>
            
            {hotel.rating > 0 && (
              <Badge className="text-lg px-3 py-1">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                {hotel.rating.toFixed(1)}
              </Badge>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{hotel.description}</p>

          <div className="flex items-center gap-2 text-2xl font-semibold text-green-600">
            <IndianRupee className="w-6 h-6" />
            <span>{hotel.priceRange.min} - {hotel.priceRange.max}</span>
            <span className="text-sm text-gray-500 font-normal">per night</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Hotel className="w-5 h-5" />
            <span className="font-medium">{rooms.length} Rooms Available</span>
          </div>

          {/* Manager Actions */}
          {isOwner && isManager && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => navigate(`/manager/hotels/${hotelId}/edit`)}
                variant="outline"
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Hotel
              </Button>
              <Button
                onClick={() => navigate(`/manager/hotels/${hotelId}/add-rooms`)}
                className="flex-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Room
              </Button>
              <Button
                onClick={() => handleDeleteClick(hotel, 'hotel')}
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}

          {/* Manager Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Managed by:</strong> {hotel.createdBy.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong> {hotel.createdBy.email}
            </p>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Available Rooms</h2>
          {isOwner && isManager && (
            <Button onClick={() => navigate(`/manager/hotels/${hotelId}/add-rooms`)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Multiple Rooms
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter & Sort Rooms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Room Type */}
              <Select value={filters.roomType} onValueChange={(val) => handleFilterChange('roomType', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Types</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                </SelectContent>
              </Select>

              {/* Availability */}
              <Select value={filters.isAvailable} onValueChange={(val) => handleFilterChange('isAvailable', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>

              {/* Pet Friendly */}
              <Select value={filters.isPetAllowed} onValueChange={(val) => handleFilterChange('isPetAllowed', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pet Friendly" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="true">Pet Friendly</SelectItem>
                  <SelectItem value="false">No Pets</SelectItem>
                </SelectContent>
              </Select>

              {/* Beds */}
              <Select value={filters.beds} onValueChange={(val) => handleFilterChange('beds', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Number of Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Any Beds</SelectItem>
                  <SelectItem value="1">1 Bed</SelectItem>
                  <SelectItem value="2">2 Beds</SelectItem>
                  <SelectItem value="3">3 Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                </SelectContent>
              </Select>

              {/* Baths */}
              <Select value={filters.baths} onValueChange={(val) => handleFilterChange('baths', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Number of Baths" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Any Baths</SelectItem>
                  <SelectItem value="1">1 Bath</SelectItem>
                  <SelectItem value="2">2 Baths</SelectItem>
                  <SelectItem value="3">3+ Baths</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Min Capacity"
                value={filters.capacity}
                onChange={(e) => handleFilterChange('capacity', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              
              {/* Sort By & Order */}
              <div className="flex gap-2">
                <Select value={filters.sortBy} onValueChange={(val) => handleFilterChange('sortBy', val)} className="flex-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pricePerNight">Price</SelectItem>
                    <SelectItem value="capacity">Capacity</SelectItem>
                    <SelectItem value="roomType">Type</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.order} onValueChange={(val) => handleFilterChange('order', val)} className="w-24">
                  <SelectTrigger>
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">↑</SelectItem>
                    <SelectItem value="desc">↓</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAmenities(!showAmenities)}
                className="w-full"
              >
                {showAmenities ? 'Hide' : 'Show'} Amenities Filter 
                {filters.amenities.length > 0 && ` (${filters.amenities.length} selected)`}
              </Button>
              
              {showAmenities && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 border rounded-lg max-h-60 overflow-y-auto">
                  {AMENITIES.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={clearFilters} variant="outline" className="flex-1">
                Clear All Filters
                {(filters.roomType || filters.isAvailable || filters.isPetAllowed || filters.minPrice || 
                  filters.maxPrice || filters.capacity || filters.beds || filters.baths || 
                  filters.amenities.length > 0) && ' ✕'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        {isLoadingRooms ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : roomsError ? (
          <Alert variant="destructive">
            <AlertDescription>{roomsError}</AlertDescription>
          </Alert>
        ) : rooms.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bed className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Rooms Found</h3>
              <p className="text-gray-600 mb-6">
                {isOwner ? 'Add rooms to your hotel to get started' : 'No rooms match your filters'}
              </p>
              {isOwner && isManager && (
                <Button onClick={() => navigate(`/manager/hotels/${hotelId}/add-room`)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Room
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms
                .slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage)
                .map((room) => (
              <Card key={room._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">{room.roomType} Room</CardTitle>
                    {room.isAvailable ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="w-3 h-3 mr-1" />
                        Unavailable
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{room.beds} Bed(s)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{room.baths} Bath(s)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity}</span>
                    </div>
                  </div>

                  {room.isPetAllowed && (
                    <Badge variant="outline">🐾 Pet Friendly</Badge>
                  )}

                  <div className="text-2xl font-bold text-green-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {room.pricePerNight}
                    <span className="text-sm text-gray-500 font-normal ml-1">/night</span>
                  </div>

                  {room.amenities && room.amenities.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-1">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.slice(0, 3).map((amenity, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{room.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="border-t pt-4">
                  {isOwner && isManager 

                  ? (
                    // <div className="grid grid-cols-1 gap-2 w-full">

                      <div className="space-y-4 w-full">
                      <Button 
                      className="w-full"
                      onClick={() => navigate(`/hotels/room/${room._id}`)}
                    >
                      View Details
                    </Button>
                    

                    <div className="grid grid-cols-2 gap-2 w-full">

                      <Button
                        variant="outline"
                        onClick={() => navigate(`/manager/rooms/${room._id}/edit`)}
                        size="sm"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteClick(room, 'room')}
                        size="sm"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>

                      

                    </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/hotels/room/${room._id}`)}
                    >
                      View Details
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {rooms.length > roomsPerPage && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * roomsPerPage) + 1} to {Math.min(currentPage * roomsPerPage, rooms.length)} of {rooms.length} rooms
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.ceil(rooms.length / roomsPerPage) }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(rooms.length / roomsPerPage), prev + 1))}
                      disabled={currentPage === Math.ceil(rooms.length / roomsPerPage)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              {deleteType === 'hotel' ? (
                <>
                  <p>
                    This will permanently delete <strong>{itemToDelete?.name}</strong> and all its rooms.
                  </p>
                  <p className="text-red-600 font-medium">
                    This action cannot be undone.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    This will permanently delete this <strong>{itemToDelete?.roomType}</strong> room.
                  </p>
                  <p className="text-red-600 font-medium">
                    This action cannot be undone.
                  </p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                `Delete ${deleteType === 'hotel' ? 'Hotel' : 'Room'}`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}