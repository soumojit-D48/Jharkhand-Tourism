
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Plus, Upload, X, Building2, Bed, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { apiService } from '../lib/api';

// const AMENITIES = [
//   "Wi-Fi", "Air Conditioning", "Television", "Mini Bar", "Room Service",
//   "Safe Box", "Hair Dryer", "Coffee Maker", "Balcony", "Mountain View",
//   "Bathtub", "Shower", "Wardrobe", "Work Desk", "Iron", "Laundry Service",
//   "Free Parking", "Pool Access", "Gym Access", "Pet Friendly"
// ];

// const hotelSchema = z.object({
//   name: z.string().min(3, "Hotel name must be at least 3 characters"),
//   description: z.string().min(20, "Description must be at least 20 characters"),
//   district: z.string().min(2, "District is required"),
//   address: z.string().min(5, "Address is required"),
//   lat: z.string().optional(),
//   lng: z.string().optional(),
//   minPrice: z.string().min(1, "Minimum price is required"),
//   maxPrice: z.string().min(1, "Maximum price is required"),
// });

// const roomSchema = z.object({
//   roomType: z.enum(["single", "double", "suite", "deluxe"]),
//   beds: z.string().min(1, "Number of beds is required"),
//   baths: z.string().min(1, "Number of baths is required"),
//   capacity: z.string().min(1, "Capacity is required"),
//   pricePerNight: z.string().min(1, "Price is required"),
//   isPetAllowed: z.boolean().default(false),
//   // amenities: z.array(z.string()).min(1, "Select at least one amenity"),
//   amenities: z.array(z.string()),
// });

// export default function HotelRoomCreation() {
//   const [step, setStep] = useState(1);
//   const [hotelData, setHotelData] = useState(null);
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const hotelForm = useForm({
//     resolver: zodResolver(hotelSchema),
//     defaultValues: {
//       name: '',
//       description: '',
//       district: '',
//       address: '',
//       lat: '',
//       lng: '',
//       minPrice: '',
//       maxPrice: '',
//     }
//   });

//   const roomForm = useForm({
//     resolver: zodResolver(roomSchema),
//     defaultValues: {
//       roomType: 'single',
//       beds: '1',
//       baths: '1',
//       capacity: '2',
//       pricePerNight: '',
//       isPetAllowed: false,
//       amenities: [],
//     }
//   });

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + images.length > 10) {
//       alert('Maximum 10 images allowed');
//       return;
//     }

//     setImages(prev => [...prev, ...files]);
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const onHotelSubmit = async (data) => {
//     // if (images.length === 0) {
//     //   setError('Please upload at least one image');
//     //   return;
//     // }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('description', data.description);
//       formData.append('location', JSON.stringify({
//         district: data.district,
//         address: data.address,
//         coordinates: {
//           lat: parseFloat(data.lat) || 0,
//           lng: parseFloat(data.lng) || 0
//         }
//       }));
//       formData.append('priceRange', JSON.stringify({
//         min: parseFloat(data.minPrice),
//         max: parseFloat(data.maxPrice)
//       }));

//       images.forEach(image => {
//         formData.append('images', image);
//       });

//       const result = await apiService.createHotel(formData);

//       if (result.success) {
//         setHotelData(result.hotel);
//         setStep(2);
//         setError(null);
//       } else {
//         setError(result.message+"hiiiiiiiii" || 'Failed to create hotel');
//       }
//     } catch (err) {
//       setError(err.message + "hello" || 'Failed to create hotel');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRoomSubmit = async (data) => {
//     if (!hotelData) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const roomData = {
//         roomType: data.roomType,
//         beds: parseInt(data.beds),
//         baths: parseInt(data.baths),
//         capacity: parseInt(data.capacity),
//         pricePerNight: parseFloat(data.pricePerNight),
//         isPetAllowed: data.isPetAllowed,
//         amenities: data.amenities
//       };

//       const result = await apiService.addRoom(hotelData._id, roomData);

//       if (result.success) {
//         setRooms(prev => [...prev, result.room]);
//         roomForm.reset({
//           roomType: 'single',
//           beds: '1',
//           baths: '1',
//           capacity: '2',
//           pricePerNight: '',
//           isPetAllowed: false,
//           amenities: [],
//         });
//         setError(null);
//         alert('Room added successfully!');
//       } else {
//         setError(result.message || 'Failed to add room');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to add room');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFinish = () => {
//     alert(`Hotel "${hotelData.name}" created successfully with ${rooms.length} room(s)!`);
//     window.location.href = '/manager/hotels';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Hotel</h1>
//           <p className="text-gray-600">Add your hotel details and rooms</p>
//         </div>

//         <div className="flex items-center justify-center mb-8">
//           <div className={`flex items-center ${step === 1 ? 'text-blue-600' : 'text-green-600'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 1 ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
//               1
//             </div>
//             <span className="ml-2 font-medium">Hotel Details</span>
//           </div>
//           <div className="w-24 h-1 bg-gray-300 mx-4"></div>
//           <div className={`flex items-center ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
//               2
//             </div>
//             <span className="ml-2 font-medium">Add Rooms</span>
//           </div>
//         </div>

//         {error && (
//           <Alert className="mb-6 bg-red-50 border-red-200">
//             <AlertDescription className="text-red-800">{error}</AlertDescription>
//           </Alert>
//         )}

//         {step === 1 && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Building2 className="w-6 h-6" />
//                 Hotel Information
//               </CardTitle>
//               <CardDescription>Provide details about your hotel</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Hotel Name *</Label>
//                   <Input
//                     id="name"
//                     {...hotelForm.register('name')}
//                     placeholder="Grand Hotel Mumbai"
//                   />
//                   {hotelForm.formState.errors.name && (
//                     <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.name.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="description">Description *</Label>
//                   <Textarea
//                     id="description"
//                     {...hotelForm.register('description')}
//                     placeholder="Describe your hotel..."
//                     rows={4}
//                   />
//                   {hotelForm.formState.errors.description && (
//                     <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.description.message}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="district">District *</Label>
//                     <Input
//                       id="district"
//                       {...hotelForm.register('district')}
//                       placeholder="Mumbai"
//                     />
//                     {hotelForm.formState.errors.district && (
//                       <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.district.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label htmlFor="address">Address *</Label>
//                     <Input
//                       id="address"
//                       {...hotelForm.register('address')}
//                       placeholder="123 Marine Drive"
//                     />
//                     {hotelForm.formState.errors.address && (
//                       <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.address.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="lat">Latitude (Optional)</Label>
//                     <Input
//                       id="lat"
//                       {...hotelForm.register('lat')}
//                       placeholder="19.0760"
//                       type="number"
//                       step="any"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="lng">Longitude (Optional)</Label>
//                     <Input
//                       id="lng"
//                       {...hotelForm.register('lng')}
//                       placeholder="72.8777"
//                       type="number"
//                       step="any"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="minPrice">Minimum Price (₹) *</Label>
//                     <Input
//                       id="minPrice"
//                       {...hotelForm.register('minPrice')}
//                       placeholder="2000"
//                       type="number"
//                     />
//                     {hotelForm.formState.errors.minPrice && (
//                       <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.minPrice.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label htmlFor="maxPrice">Maximum Price (₹) *</Label>
//                     <Input
//                       id="maxPrice"
//                       {...hotelForm.register('maxPrice')}
//                       placeholder="10000"
//                       type="number"
//                     />
//                     {hotelForm.formState.errors.maxPrice && (
//                       <p className="text-sm text-red-600 mt-1">{hotelForm.formState.errors.maxPrice.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <Label>Hotel Images * (Max 10)</Label>
//                   <div className="mt-2">
//                     <label htmlFor="images" className="cursor-pointer">
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
//                         <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                         <p className="text-sm text-gray-600">Click to upload images</p>
//                         <p className="text-xs text-gray-500 mt-1">{images.length}/10 images selected</p>
//                       </div>
//                     </label>
//                     <input
//                       id="images"
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageSelect}
//                       className="hidden"
//                     />
//                   </div>

//                   {imagePreviews.length > 0 && (
//                     <div className="grid grid-cols-5 gap-2 mt-4">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative group">
//                           <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded" />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <Button
//                   onClick={hotelForm.handleSubmit(onHotelSubmit)}
//                   disabled={loading}
//                   className="w-full"
//                   size="lg"
//                 >
//                   {loading ? 'Creating Hotel...' : 'Create Hotel & Continue'}
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {step === 2 && hotelData && (
//           <div className="space-y-6">
//             <Card className="bg-green-50 border-green-200">
//               <CardContent className="pt-6">
//                 <div className="flex items-start gap-4">
//                   <Building2 className="w-6 h-6 text-green-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-green-900">{hotelData.name}</h3>
//                     <p className="text-sm text-green-700">{hotelData.location.address}</p>
//                     <p className="text-xs text-green-600 mt-1">Hotel created successfully! Now add rooms.</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Bed className="w-6 h-6" />
//                   Add Room
//                 </CardTitle>
//                 <CardDescription>Add rooms to your hotel one by one</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="roomType">Room Type *</Label>
//                       <Select
//                         onValueChange={(value) => roomForm.setValue('roomType', value)}
//                         value={roomForm.watch('roomType')}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="single">Single</SelectItem>
//                           <SelectItem value="double">Double</SelectItem>
//                           <SelectItem value="suite">Suite</SelectItem>
//                           <SelectItem value="deluxe">Deluxe</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="pricePerNight">Price Per Night (₹) *</Label>
//                       <Input
//                         id="pricePerNight"
//                         {...roomForm.register('pricePerNight')}
//                         placeholder="5000"
//                         type="number"
//                       />
//                       {roomForm.formState.errors.pricePerNight && (
//                         <p className="text-sm text-red-600 mt-1">{roomForm.formState.errors.pricePerNight.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="beds">Beds *</Label>
//                       <Input
//                         id="beds"
//                         {...roomForm.register('beds')}
//                         placeholder="2"
//                         type="number"
//                         min="1"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="baths">Baths *</Label>
//                       <Input
//                         id="baths"
//                         {...roomForm.register('baths')}
//                         placeholder="1"
//                         type="number"
//                         min="1"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="capacity">Capacity *</Label>
//                       <Input
//                         id="capacity"
//                         {...roomForm.register('capacity')}
//                         placeholder="4"
//                         type="number"
//                         min="1"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="isPetAllowed"
//                       checked={roomForm.watch('isPetAllowed')}
//                       onCheckedChange={(checked) => roomForm.setValue('isPetAllowed', checked)}
//                     />
//                     <Label htmlFor="isPetAllowed" className="cursor-pointer">
//                       Pet Friendly
//                     </Label>
//                   </div>

//                   <div>
//                     <Label>Amenities * (Select at least one)</Label>
//                     <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto p-2 border rounded">
//                       {AMENITIES.map((amenity) => (
//                         <div key={amenity} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={amenity}
//                             checked={roomForm.watch('amenities').includes(amenity)}
//                             onCheckedChange={(checked) => {
//                               const current = roomForm.watch('amenities');
//                               if (checked) {
//                                 roomForm.setValue('amenities', [...current, amenity]);
//                               } else {
//                                 roomForm.setValue('amenities', current.filter(a => a !== amenity));
//                               }
//                             }}
//                           />
//                           <Label htmlFor={amenity} className="text-sm cursor-pointer">
//                             {amenity}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                     {roomForm.formState.errors.amenities && (
//                       <p className="text-sm text-red-600 mt-1">{roomForm.formState.errors.amenities.message}</p>
//                     )}
//                   </div>

//                   <Button
//                     onClick={roomForm.handleSubmit(onRoomSubmit)}
//                     disabled={loading}
//                     className="w-full"
//                   >
//                     {loading ? 'Adding Room...' : 'Add Room'}
//                     <Plus className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {rooms.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Added Rooms ({rooms.length})</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     {rooms.map((room) => (
//                       <div key={room._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                         <div>
//                           <p className="font-semibold capitalize">{room.roomType} Room</p>
//                           <p className="text-sm text-gray-600">
//                             ₹{room.pricePerNight}/night • {room.beds} bed(s) • {room.baths} bath(s) • {room.capacity} guests
//                             {room.isPetAllowed && ' • Pet Friendly'}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {room.amenities.slice(0, 3).join(', ')}
//                             {room.amenities.length > 3 && ` +${room.amenities.length - 3} more`}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex gap-3 mt-4">
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         roomForm.reset({
//                           roomType: 'single',
//                           beds: '1',
//                           baths: '1',
//                           capacity: '2',
//                           pricePerNight: '',
//                           isPetAllowed: false,
//                           amenities: [],
//                         });
//                       }}
//                       className="flex-1"
//                     >
//                       Add Another Room
//                     </Button>
//                     <Button
//                       onClick={handleFinish}
//                       className="flex-1"
//                       size="lg"
//                     >
//                       Finish & View Hotel
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {rooms.length === 0 && (
//               <Card className="border-dashed">
//                 <CardContent className="text-center py-8">
//                   <Bed className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-600">No rooms added yet. Add at least one room to continue.</p>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



































import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, X } from 'lucide-react';
// import  from '@/lib/api';
import { apiService } from '../lib/api';

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

export default function CreateHotel() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(hotelSchema),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ''; // Reset input
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
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

      // Append images
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await apiService.createHotel(formData);
      
      setSuccess('Hotel created successfully!');
      reset();
      setImages([]);
      setImagePreviews([]);
      
      // Navigate to hotel details or my hotels page after 2 seconds
      setTimeout(() => {
        navigate(`/manager/hotels/${response.hotel._id}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to create hotel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create New Hotel</CardTitle>
          <CardDescription>
            Add your hotel details and upload images to get started
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

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hotel Images (Max 10)</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 10}
                />
                <Label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload images ({images.length}/10)
                  </span>
                </Label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
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
                    Creating Hotel...
                  </>
                ) : (
                  'Create Hotel'
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
    </div>
  );
}