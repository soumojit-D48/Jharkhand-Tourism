import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users,
  Search,
  Filter,
  Camera,
  TreePine,
  Mountain,
  Waves,
  Building
} from "lucide-react";

import { destinationsPageData } from "@/data";



const categoryFilters = [
  { id: "all", label: "All", icon: Filter },
  { id: "wildlife", label: "Wildlife", icon: TreePine },
  { id: "nature", label: "Nature", icon: Mountain },
  { id: "culture", label: "Culture", icon: Users },
  { id: "adventure", label: "Adventure", icon: Waves },
  { id: "heritage", label: "Heritage", icon: Building },
];

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinationsPageData.filter(destination => {
    const matchesCategory = selectedCategory === "all" || destination.categories.includes(selectedCategory);
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "wildlife": return "bg-amber-600 text-white";
      case "nature": return "bg-emerald-600 text-white";
      case "culture": return "bg-purple-600 text-white";
      case "adventure": return "bg-blue-600 text-white";
      case "heritage": return "bg-red-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  const getCategoryButtonStyle = (filterId, isActive) => {
    const baseStyle = "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-medium";
    
    if (filterId === "all" && isActive) {
      return `${baseStyle} bg-green-500 text-white shadow-lg`;
    }
    
    if (isActive) {
      switch (filterId) {
        case "wildlife": return `${baseStyle} bg-amber-600 text-white shadow-lg`;
        case "nature": return `${baseStyle} bg-emerald-600 text-white shadow-lg`;
        case "culture": return `${baseStyle} bg-purple-600 text-white shadow-lg`;
        case "adventure": return `${baseStyle} bg-blue-600 text-white shadow-lg`;
        case "heritage": return `${baseStyle} bg-red-600 text-white shadow-lg`;
        default: return `${baseStyle} bg-gray-600 text-white shadow-lg`;
      }
    }
    
    return `${baseStyle} bg-white border border-gray-200 text-gray-700 hover:bg-gray-50`;
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Section */}
      <div className="bg-gradient-to-t from-emerald-600 to-blue-500 text-white py-16 px-4">
        <div className="relative max-w-7xl mx-auto text-center">
        {/* <Link to="/" className="absolute lg:m-[-50px] top-0 lg:left-[-35px]  inline-flex items-center text-yellow-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link> */}

            {/* <Link
  to="/"
  className="
    inline-flex items-center top-0 text-yellow-200 hover:text-white mb-6 transition-colors
    lg:absolute lg:m-[-50px] lg:top-0 lg:left-[-35px]
  "
>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back to Home
</Link> */}


<Link
  to="/"
  className="
    absolute top-[-45px] left-[-10px]
    lg:top-0 lg:left-[-35px] lg:m-[-50px]
    inline-flex items-center text-yellow-200 hover:text-white mb-6 transition-colors
  "
>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back to Home
</Link>

            
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Jharkhand's Treasures
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            From pristine wildlife sanctuaries to ancient cultural sites, discover the diverse beauty and rich heritage that makes Jharkhand a unique eco-cultural destination.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 placeholder:text-white/70 text-white backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Destinations</h2>
          <div className="flex flex-wrap gap-3">
            {categoryFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={getCategoryButtonStyle(filter.id, isActive)}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlays */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(destination.categories[0])} text-sm font-medium px-3 py-1`}>
                    {destination.categories[0]}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-gray-900">
                    {destination.name}
                  </h3>
                  <span className="text-emerald-600 font-bold text-lg">{destination.price}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.location}</span>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-colors duration-200">
                  <Camera className="w-4 h-4 mr-2" />
                  Explore Destination
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No destinations found matching your criteria.
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg"
            >
              Clear Filters
            </Button>
          </div>
        )}
        
      </div>
        {/* <Footer/> */}
      
    </div>
   
  );
};

export default Destinations;


