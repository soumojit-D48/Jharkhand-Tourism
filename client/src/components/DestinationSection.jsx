

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {destinationsSectionData} from "@/data"

const DestinationsSection = () => {


  const categories = [
    "All",
    "Wildlife",
    "Nature",
    "Culture",
    "Adventure",
    "Heritage",
  ];
  

  const navigate = useNavigate();

  return (
    <section id="destinations" className="py-15 bg-gradient-to-b from-blue-300 via-blue-500 to-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase mb-2 block">
            Popular Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Explore Jharkhand's Treasures
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From pristine wildlife sanctuaries to ancient cultural sites,
            discover the diverse beauty and rich heritage that makes Jharkhand a
            unique eco-cultural destination.
          </p>
        </div>

        {/* Category Filter */}
        <div onClick={() => {navigate('/destinations'); window.scrollTo(0, 0)}} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
            
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={
                category === "All"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary hover:text-primary-foreground"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsSectionData.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-black text-primary-foreground">
                  {destination.category}
                </Badge>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                  <div className="flex items-center space-x-1 text-white text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.location}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {destination.duration}
                    </div>
                    <div className="text-muted-foreground">
                      {destination.reviews} reviews
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 ">
                    {destination.highlights.map((highlight, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-blue-200"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full bg-green-500 text-primary-foreground border-0 hover:shadow-glow group">
                  Explore Destination
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div
          onClick={() => {
            navigate("/destinations");
            window.scrollTo(0, 0); // scrolls to top
          }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 hover:bg-primary hover:text-primary-foreground"
          >
            Load More Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
