
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Calendar, Users, Award, ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { culturalHighlights } from '@/data';
// import CulturalHeritageSection from '@/components/CulturalHaritage';
// import CurlturalFestivals from '@/components/cultural/curlturalFestivals';

const CurlturalFestivals = () => {
  return (
    <section className="py-10 ">
        
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}

          {/* <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Festivals & Traditions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the vibrant celebrations and time-honored customs that define Jharkhand's cultural identity.
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalHighlights.map((highlight, index) => (
              <Link key={highlight.id} to={`/player/${highlight.id}`} className="block">
              <Card key={index} className="overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative group">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Button
                    size="sm"
                    className="absolute top-4 right-4 bg-white/20 group-hover:bg-red-600 backdrop-blur-sm border-0 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute bottom-4 left-4 bg-green-600 text-white">
                    {highlight.date}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-green-700">
                        <Users className="h-4 w-4 mr-1" />
                        {highlight.participants}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {highlight.duration}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {highlight.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        {/* </div> */}
      </section>
  )
}

export default CurlturalFestivals
