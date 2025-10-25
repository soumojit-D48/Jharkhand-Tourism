

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import {apiService} from '@/lib/api';

// Amenities list
const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Television",
  "Mini Bar",
  "Room Service",
  "Safe Box",
  "Hair Dryer",
  "Coffee Maker",
  "Balcony",
  "Mountain View",
  "Bathtub",
  "Shower",
  "Towels",
  "Wardrobe",
  "Work Desk",
  "Iron",
  "Laundry Service",
  "Free Parking",
  "Pool Access",
  "Gym Access",
  "Pet Friendly",
  "Smoking Allowed",
  "Non-smoking Room",
];

// Validation Schema
const roomSchema = z.object({
  roomType: z.enum(['single', 'double', 'suite', 'deluxe'], {
    required_error: 'Room type is required',
  }),
  beds: z.string().min(1, 'Number of beds is required'),
  baths: z.string().min(1, 'Number of baths is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  pricePerNight: z.string().min(1, 'Price per night is required'),
  isPetAllowed: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  amenities: z.array(z.string()).default([]),
});

export default function EditRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      beds: '1',
      baths: '1',
      isPetAllowed: false,
      isAvailable: true,
      amenities: [],
    },
  });

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await apiService.getRoomById(roomId);
        const roomData = response.room;
        setRoom(roomData);
        setHotelId(roomData.hotel._id);
        setHotelName(roomData.hotel.name);
        setSelectedAmenities(roomData.amenities || []);

        // Populate form
        setValue('roomType', roomData.roomType);
        setValue('beds', roomData.beds.toString());
        setValue('baths', roomData.baths.toString());
        setValue('capacity', roomData.capacity.toString());
        setValue('pricePerNight', roomData.pricePerNight.toString());
        setValue('isPetAllowed', roomData.isPetAllowed);
        setValue('isAvailable', roomData.isAvailable);

      } catch (err) {
        setError(err.message || 'Failed to load room');
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId, setValue]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const roomData = {
        roomType: data.roomType,
        beds: parseInt(data.beds),
        baths: parseInt(data.baths),
        capacity: parseInt(data.capacity),
        pricePerNight: parseFloat(data.pricePerNight),
        isPetAllowed: data.isPetAllowed,
        isAvailable: data.isAvailable,
        amenities: selectedAmenities,
      };

      await apiService.updateRoom(roomId, roomData);
      
      setSuccess('Room updated successfully!');
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(`/manager/hotels/${hotelId}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to update room');
    } finally {
      setIsSubmitting(false);
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

  if (!room) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>Room not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Edit Room</CardTitle>
          <CardDescription>
            {hotelName ? `Updating room in ${hotelName}` : 'Update room details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Room Type */}
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type *</Label>
              <Controller
                name="roomType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roomType && (
                <p className="text-sm text-red-500">{errors.roomType.message}</p>
              )}
            </div>

            {/* Beds, Baths, Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beds">Number of Beds *</Label>
                <Input
                  id="beds"
                  type="number"
                  min="1"
                  {...register('beds')}
                />
                {errors.beds && (
                  <p className="text-sm text-red-500">{errors.beds.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="baths">Number of Baths *</Label>
                <Input
                  id="baths"
                  type="number"
                  min="1"
                  {...register('baths')}
                />
                {errors.baths && (
                  <p className="text-sm text-red-500">{errors.baths.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (Guests) *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  {...register('capacity')}
                />
                {errors.capacity && (
                  <p className="text-sm text-red-500">{errors.capacity.message}</p>
                )}
              </div>
            </div>

            {/* Price Per Night */}
            <div className="space-y-2">
              <Label htmlFor="pricePerNight">Price Per Night (₹) *</Label>
              <Input
                id="pricePerNight"
                type="number"
                step="0.01"
                min="0"
                placeholder="2000"
                {...register('pricePerNight')}
              />
              {errors.pricePerNight && (
                <p className="text-sm text-red-500">{errors.pricePerNight.message}</p>
              )}
            </div>

            {/* Room Status Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold">Room Status</h3>
              
              {/* Pet Allowed */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPetAllowed" className="text-base cursor-pointer">
                    Pet Friendly Room
                  </Label>
                  <p className="text-sm text-gray-500">
                    Allow guests to bring pets
                  </p>
                </div>
                <Controller
                  name="isPetAllowed"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="isPetAllowed"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Is Available */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isAvailable" className="text-base cursor-pointer">
                    Room Available for Booking
                  </Label>
                  <p className="text-sm text-gray-500">
                    Enable or disable room availability
                  </p>
                </div>
                <Controller
                  name="isAvailable"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="isAvailable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-4 border rounded-lg">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label
                      htmlFor={amenity}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Selected: {selectedAmenities.length} amenities
              </p>
            </div>

            {/* Current Room Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Current Room Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                <p><strong>Type:</strong> {room.roomType}</p>
                <p><strong>Beds:</strong> {room.beds}</p>
                <p><strong>Baths:</strong> {room.baths}</p>
                <p><strong>Capacity:</strong> {room.capacity} guests</p>
                <p><strong>Current Price:</strong> ₹{room.pricePerNight}/night</p>
                <p><strong>Status:</strong> {room.isAvailable ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating Room...
                  </>
                ) : (
                  'Update Room'
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/manager/hotels/${hotelId}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}