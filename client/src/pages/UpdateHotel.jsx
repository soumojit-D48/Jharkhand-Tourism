

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, Upload, X, Trash2 } from 'lucide-react';
import {apiService} from '@/lib/api';

// Validation Schema
const hotelSchema = z.object({
  name: z.string().min(3, 'Hotel name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  district: z.string().min(2, 'District is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  lat: z.string().optional(),
  lng: z.string().optional(),
  minPrice: z.string().min(1, 'Minimum price is required'),
  maxPrice: z.string().min(1, 'Maximum price is required'),
}).refine((data) => {
  const min = parseFloat(data.minPrice);
  const max = parseFloat(data.maxPrice);
  return max > min;
}, {
  message: "Maximum price must be greater than minimum price",
  path: ["maxPrice"],
});

export default function EditHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteImageDialog, setDeleteImageDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(hotelSchema),
  });

  // Fetch hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await apiService.getHotelById(hotelId);
        const hotelData = response.hotel;
        setHotel(hotelData);
        setExistingImages(hotelData.images || []);

        // Populate form
        setValue('name', hotelData.name);
        setValue('description', hotelData.description);
        setValue('district', hotelData.location.district);
        setValue('address', hotelData.location.address);
        setValue('lat', hotelData.location.coordinates?.lat?.toString() || '');
        setValue('lng', hotelData.location.coordinates?.lng?.toString() || '');
        setValue('minPrice', hotelData.priceRange.min.toString());
        setValue('maxPrice', hotelData.priceRange.max.toString());

      } catch (err) {
        setError(err.message || 'Failed to load hotel');
      } finally {
        setIsLoading(false);
      }
    };

    if (hotelId) {
      fetchHotel();
    }
  }, [hotelId, setValue]);

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImages = existingImages.length + newImages.length + files.length;
    if (totalImages > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setNewImages(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ''; // Reset input
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = (imageUrl) => {
    setImageToDelete(imageUrl);
    setDeleteImageDialog(true);
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;

    setIsDeletingImage(true);
    try {
      await ApiService.deleteHotelImage(hotelId, imageToDelete);
      setExistingImages(prev => prev.filter(img => img !== imageToDelete));
      setDeleteImageDialog(false);
      setImageToDelete(null);
      setSuccess('Image deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete image');
      setDeleteImageDialog(false);
    } finally {
      setIsDeletingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      
      // Location object
      const location = {
        district: data.district,
        address: data.address,
      };
      
      if (data.lat && data.lng) {
        location.coordinates = {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
        };
      }
      
      formData.append('location', JSON.stringify(location));
      
      // Price range object
      formData.append('priceRange', JSON.stringify({
        min: parseFloat(data.minPrice),
        max: parseFloat(data.maxPrice),
      }));

      // Append new images
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      await apiService.updateHotel(hotelId, formData);
      
      setSuccess('Hotel updated successfully!');
      setNewImages([]);
      setNewImagePreviews([]);
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(`/hotels/${hotelId}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to update hotel');
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

  if (!hotel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>Hotel not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Edit Hotel</CardTitle>
          <CardDescription>
            Update your hotel information and images
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
            {/* Hotel Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Hotel Name *</Label>
              <Input
                id="name"
                placeholder="Grand Plaza Hotel"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your hotel, amenities, and unique features..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Kolkata"
                    {...register('district')}
                  />
                  {errors.district && (
                    <p className="text-sm text-red-500">{errors.district.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Park Street"
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude (Optional)</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    placeholder="22.5726"
                    {...register('lat')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude (Optional)</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    placeholder="88.3639"
                    {...register('lng')}
                  />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Minimum Price (₹) *</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    step="0.01"
                    placeholder="1000"
                    {...register('minPrice')}
                  />
                  {errors.minPrice && (
                    <p className="text-sm text-red-500">{errors.minPrice.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Maximum Price (₹) *</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    step="0.01"
                    placeholder="5000"
                    {...register('maxPrice')}
                  />
                  {errors.maxPrice && (
                    <p className="text-sm text-red-500">{errors.maxPrice.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Hotel ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingImage(imageUrl)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Add New Images (Total: {existingImages.length + newImages.length}/10)
              </h3>
              
              {existingImages.length + newImages.length < 10 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="newImages"
                    accept="image/*"
                    multiple
                    onChange={handleNewImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="newImages"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to upload new images
                    </span>
                  </Label>
                </div>
              )}

              {/* New Image Previews */}
              {newImagePreviews.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">New Images to Upload:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating Hotel...
                  </>
                ) : (
                  'Update Hotel'
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/manager/hotels')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Delete Image Confirmation Dialog */}
      <AlertDialog open={deleteImageDialog} onOpenChange={setDeleteImageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingImage}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteImage}
              disabled={isDeletingImage}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingImage ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Image'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}