

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, Trash2, Copy } from 'lucide-react';
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

// Single room schema
const singleRoomSchema = z.object({
  roomType: z.enum(['single', 'double', 'suite', 'deluxe'], {
    required_error: 'Room type is required',
  }),
  beds: z.string().min(1, 'Beds required'),
  baths: z.string().min(1, 'Baths required'),
  capacity: z.string().min(1, 'Capacity required'),
  pricePerNight: z.string().min(1, 'Price required'),
  isPetAllowed: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
});

// Multiple rooms schema
const roomsSchema = z.object({
  rooms: z.array(singleRoomSchema).min(1, 'At least one room is required'),
});

export default function AddMultipleRooms() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hotelName, setHotelName] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(roomsSchema),
    defaultValues: {
      rooms: [
        {
          roomType: 'single',
          beds: '1',
          baths: '1',
          capacity: '1',
          pricePerNight: '',
          isPetAllowed: false,
          amenities: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rooms',
  });

  // Fetch hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await apiService.getHotelById(hotelId);
        setHotelName(response.hotel.name);
      } catch (err) {
        setError('Failed to load hotel details');
      }
    };

    if (hotelId) {
      fetchHotel();
    }
  }, [hotelId]);

  const addNewRoom = () => {
    append({
      roomType: 'single',
      beds: '1',
      baths: '1',
      capacity: '1',
      pricePerNight: '',
      isPetAllowed: false,
      amenities: [],
    });
  };

  const duplicateRoom = (index) => {
    const roomToDuplicate = watch(`rooms.${index}`);
    append({ ...roomToDuplicate });
  };

  const toggleAmenity = (roomIndex, amenity, currentAmenities) => {
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    return newAmenities;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const roomsData = data.rooms.map(room => ({
        roomType: room.roomType,
        beds: parseInt(room.beds),
        baths: parseInt(room.baths),
        capacity: parseInt(room.capacity),
        pricePerNight: parseFloat(room.pricePerNight),
        isPetAllowed: room.isPetAllowed,
        amenities: room.amenities,
      }));

      const response = await apiService.addMultipleRooms(hotelId, roomsData);
      
      setSuccess(`${response.rooms?.length || roomsData.length} rooms added successfully!`);
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(`/manager/hotels/${hotelId}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to add rooms');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Add Multiple Rooms</CardTitle>
          <CardDescription>
            {hotelName ? `Adding rooms to ${hotelName}` : 'Add multiple rooms to your hotel at once'}
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
            {/* Room Cards */}
            <div className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="border-2">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Room #{index + 1}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => duplicateRoom(index)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Duplicate
                        </Button>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {/* Room Type */}
                    <div className="space-y-2">
                      <Label>Room Type *</Label>
                      <Controller
                        name={`rooms.${index}.roomType`}
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
                      {errors.rooms?.[index]?.roomType && (
                        <p className="text-sm text-red-500">
                          {errors.rooms[index].roomType.message}
                        </p>
                      )}
                    </div>

                    {/* Beds, Baths, Capacity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Beds *</Label>
                        <Controller
                          name={`rooms.${index}.beds`}
                          control={control}
                          render={({ field }) => (
                            <Input type="number" min="1" {...field} />
                          )}
                        />
                        {errors.rooms?.[index]?.beds && (
                          <p className="text-sm text-red-500">
                            {errors.rooms[index].beds.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Baths *</Label>
                        <Controller
                          name={`rooms.${index}.baths`}
                          control={control}
                          render={({ field }) => (
                            <Input type="number" min="1" {...field} />
                          )}
                        />
                        {errors.rooms?.[index]?.baths && (
                          <p className="text-sm text-red-500">
                            {errors.rooms[index].baths.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Capacity *</Label>
                        <Controller
                          name={`rooms.${index}.capacity`}
                          control={control}
                          render={({ field }) => (
                            <Input type="number" min="1" {...field} />
                          )}
                        />
                        {errors.rooms?.[index]?.capacity && (
                          <p className="text-sm text-red-500">
                            {errors.rooms[index].capacity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Per Night */}
                    <div className="space-y-2">
                      <Label>Price Per Night (₹) *</Label>
                      <Controller
                        name={`rooms.${index}.pricePerNight`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="2000"
                            {...field}
                          />
                        )}
                      />
                      {errors.rooms?.[index]?.pricePerNight && (
                        <p className="text-sm text-red-500">
                          {errors.rooms[index].pricePerNight.message}
                        </p>
                      )}
                    </div>

                    {/* Pet Allowed */}
                    <div className="flex items-center space-x-2">
                      <Controller
                        name={`rooms.${index}.isPetAllowed`}
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id={`pet-${index}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor={`pet-${index}`} className="font-normal cursor-pointer">
                        Pet Friendly Room
                      </Label>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                      <Label>Amenities</Label>
                      <Controller
                        name={`rooms.${index}.amenities`}
                        control={control}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg">
                            {AMENITIES.map((amenity) => (
                              <div key={amenity} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${amenity}-${index}`}
                                  checked={field.value.includes(amenity)}
                                  onCheckedChange={() => {
                                    field.onChange(
                                      toggleAmenity(index, amenity, field.value)
                                    );
                                  }}
                                />
                                <Label
                                  htmlFor={`${amenity}-${index}`}
                                  className="text-xs font-normal cursor-pointer"
                                >
                                  {amenity}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      <p className="text-xs text-gray-500">
                        Selected: {watch(`rooms.${index}.amenities`)?.length || 0} amenities
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Another Room Button */}
            <Button
              type="button"
              variant="outline"
              onClick={addNewRoom}
              className="w-full border-dashed border-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Room
            </Button>

            {/* Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Total Rooms:</strong> {fields.length}
              </p>
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
                    Adding {fields.length} Room(s)...
                  </>
                ) : (
                  `Add ${fields.length} Room(s)`
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