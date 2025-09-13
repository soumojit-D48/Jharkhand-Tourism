import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Calendar, Users, Award, ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { culturalHighlights } from '@/data';
import CulturalSection from '@/components/CulturalSection';
import CurlturalFestivals from '@/components/cultural/CurlturalFestivals';

const Culture = () => {
  

  const tribalCommunities = [
    { 
      name: "Santhal", 
      population: "600,000+", 
      specialty: "Traditional Dance & Music",
      region: "Eastern Jharkhand",
      language: "Santhali"
    },
    { 
      name: "Munda", 
      population: "450,000+", 
      specialty: "Agricultural Festivals",
      region: "Central Jharkhand", 
      language: "Mundari"
    },
    { 
      name: "Oraon", 
      population: "350,000+", 
      specialty: "Forest Conservation",
      region: "Western Jharkhand",
      language: "Kurukh"
    },
    { 
      name: "Ho", 
      population: "200,000+", 
      specialty: "Metalwork & Crafts",
      region: "Southern Jharkhand",
      language: "Ho"
    },
    { 
      name: "Kharia", 
      population: "150,000+", 
      specialty: "Bamboo Crafts",
      region: "Northern Jharkhand",
      language: "Kharia"
    },
    { 
      name: "Kharwar", 
      population: "120,000+", 
      specialty: "Traditional Weaving",
      region: "Scattered",
      language: "Kharwar"
    }
  ];


  return (
    

    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-green-700 via-green-500 to-yellow-400 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" text-center mb-8">
            <Link to="/" className="absolute m-[-60px] top-0 left-[-35px]  inline-flex items-center text-yellow-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Cultural Heritage of Jharkhand
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed text-gray-100">
              Discover the rich tapestry of tribal traditions, ancient festivals, and living heritage 
              that makes Jharkhand a unique cultural destination in India.
            </p>
          </div>
        </div>
      </section>

    

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <CurlturalFestivals/>
</div>
      

      {/* Tribal Communities */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Indigenous Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the diverse tribal communities that call Jharkhand home, each with their unique customs and contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tribalCommunities.map((tribe, index) => (
              <Card key={index} className="p-6 border shadow-md hover:shadow-lg transition-all duration-200">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tribe.name}</h3>
                  <Badge className="mb-3 bg-gray-200 text-gray-700">{tribe.population}</Badge>
                  <p className="text-sm text-green-700 font-medium mb-2">{tribe.specialty}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p><span className="font-medium">Region:</span> {tribe.region}</p>
                    <p><span className="font-medium">Language:</span> {tribe.language}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 via-green-500 to-yellow-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience Jharkhand's Culture?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-100">
            Join us for an authentic cultural journey that connects you with the heart and soul of tribal Jharkhand.
          </p>
          <div className="group-hover flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-yellow-400 text-white border-0 hover:shadow-lg">
              Plan Cultural Tour
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black group-hover:bg-amber-700 hover:text-green-700">
              Download Culture Guide
            </Button>
          </div>
        </div>
      </section>

    </div>

  );
};

export default Culture




