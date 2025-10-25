

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  MapPin, 
  IndianRupee, 
  Star, 
  Edit, 
  Trash2,
  Bed, 
  Bath, 
  Users,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Hotel,
  Check,
  X as XIcon
} from 'lucide-react';
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
import { apiService } from '@/lib/api';

export default function RoomDetails() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState('');

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

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await apiService.getRoomById(roomId);
        setRoom(response.room);
        setHotel(response.room.hotel);
        
        // Check if current user is the owner
        if (currentUser && response.room.hotel.createdBy === currentUser._id) {
          setIsOwner(true);
        }
      } catch (err) {
        setError(err.message || 'Failed to load room details');
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId, currentUser]);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await apiService.deleteRoom(roomId);
      setSuccess('Room deleted successfully');
      setTimeout(() => {
        navigate(`/hotels/${hotel._id}`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to delete room');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
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

  if (error || !room || !hotel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>{error || 'Room not found'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(`/hotels/${hotel._id}`)}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Hotel
      </Button>

      {/* Success Alert */}
      {success && (
        <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Room Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-3xl capitalize">
                      {room.roomType} Room
                    </CardTitle>
                    {room.isAvailable ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Unavailable
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <Hotel className="w-4 h-4" />
                    {hotel.name}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{hotel.location.district}, {hotel.location.address}</span>
                  </div>
                </div>

                {hotel.rating > 0 && (
                  <Badge className="text-lg px-3 py-1">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {hotel.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Room Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-2xl font-bold">{room.beds}</span>
                  <span className="text-sm text-gray-600">Bed(s)</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-2xl font-bold">{room.baths}</span>
                  <span className="text-sm text-gray-600">Bath(s)</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-2xl font-bold">{room.capacity}</span>
                  <span className="text-sm text-gray-600">Guests</span>
                </div>
              </div>

              <Separator />

              {/* Room Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Room Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    {room.isPetAllowed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span className={room.isPetAllowed ? 'text-green-700' : 'text-gray-500'}>
                      Pet Friendly
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.isAvailable ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span className={room.isAvailable ? 'text-green-700' : 'text-gray-500'}>
                      Available for Booking
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Amenities */}
              {room.amenities && room.amenities.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hotel Images */}
          {hotel.images && hotel.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Hotel Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.images.map((img, idx) => (
                    <div key={idx} className="relative h-40 rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`Hotel ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hotel Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {hotel.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <div className="flex items-center text-4xl font-bold text-green-600">
                  <IndianRupee className="w-8 h-8" />
                  {room.pricePerNight}
                </div>
                <span className="text-gray-500">per night</span>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium capitalize">{room.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Guests:</span>
                  <span className="font-medium">{room.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {room.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Manager Actions or Book Now */}
              {isOwner && isManager ? (
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/manager/rooms/${room._id}/edit`)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Room
                  </Button>
                  <Button
                    onClick={handleDeleteClick}
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Room
                  </Button>
                </div>
              ) : (
                <>
                  {room.isAvailable ? (
                    <Button className="w-full" size="lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Book Now
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      <XCircle className="w-5 h-5 mr-2" />
                      Currently Unavailable
                    </Button>
                  )}
                </>
              )}

              <p className="text-xs text-gray-500 text-center">
                Contact hotel directly for special requests
              </p>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-1 text-sm text-gray-600">
                <p className="font-semibold">Contact Information:</p>
                <p>{hotel.createdBy?.name || 'Hotel Manager'}</p>
                <p>{hotel.createdBy?.email || 'contact@hotel.com'}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Room?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will permanently delete this <strong>{room.roomType}</strong> room.
              </p>
              <p className="text-red-600 font-medium">
                This action cannot be undone.
              </p>
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
                'Delete Room'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}