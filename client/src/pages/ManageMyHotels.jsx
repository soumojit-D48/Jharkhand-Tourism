

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Loader2, Plus, Eye, Edit, Trash2, MapPin, IndianRupee, Star, Hotel } from 'lucide-react';
import {apiService} from '@/lib/api';

export default function ManageMyHotels() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchMyHotels();
  }, [pagination.page]);

  const fetchMyHotels = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiService.getMyHotels({
        page: pagination.page,
        limit: pagination.limit,
        sortBy: 'createdAt',
        order: 'desc',
      });
      
      setHotels(response.hotels);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!hotelToDelete) return;

    setIsDeleting(true);
    try {
      await apiService.deleteHotel(hotelToDelete._id);
      setSuccess(`${hotelToDelete.name} deleted successfully`);
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
      
      // Refresh the list
      fetchMyHotels();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete hotel');
      setDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Hotels</h1>
          <p className="text-gray-600">
            Manage your hotels and rooms
          </p>
        </div>
        <Button
          onClick={() => navigate('/manager/hotels/create')}
          className="mt-4 md:mt-0"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Hotel
        </Button>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Hotels Grid */}
      {hotels.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Hotel className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Hotels Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first hotel to get started
            </p>
            <Button onClick={() => navigate('/manager/hotels/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Hotel
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel._id} className="flex flex-col hover:shadow-lg transition-shadow">
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

                <CardFooter className="flex flex-col gap-2 pt-4 border-t">
                  {/* Primary Actions */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/hotels/${hotel._id}`)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    
                    <Button
                      onClick={() => navigate(`/manager/hotels/${hotel._id}/add-rooms`)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Room
                    </Button>
                  </div>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/manager/hotels/${hotel._id}/edit`)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteClick(hotel)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will permanently delete <strong>{hotelToDelete?.name}</strong> and all associated rooms.
              </p>
              <p className="text-red-600 font-medium">
                This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
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
                'Delete Hotel'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}













