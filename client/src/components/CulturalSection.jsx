import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { culturalHighlights, tribalCommunities } from '@/data';
import CurlturalFestivals from './cultural/CurlturalFestivals';

// console.log(culturalHighlights)

const CulturalSection = () => {
  

  const traditions = [
    { name: "Santhal", population: "600,000+", specialty: "Traditional Dance & Music" },
    { name: "Munda", population: "450,000+", specialty: "Agricultural Festivals" },
    { name: "Oraon", population: "350,000+", specialty: "Forest Conservation" },
    { name: "Ho", population: "200,000+", specialty: "Metalwork & Crafts" }
  ];

  return (
    <section id="culture" className="py-10 bg-gradient-to-b from-yellow-300 via-yellow-500 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-bold text-sm tracking-wide uppercase mb-2 block text-black">
            Cultural Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Living Tribal Traditions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the vibrant cultural tapestry of Jharkhand, where ancient tribal traditions 
            continue to thrive and inspire visitors from around the world.
          </p>
        </div>

        <CurlturalFestivals  />


        {/* Tribal Communities Stats */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-warm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Major Tribal Communities</h3>
            <p className="text-muted-foreground">
              Jharkhand is home to over 30 indigenous tribal communities, each with unique traditions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tribalCommunities.slice(0, 4).map((tribe, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-background/50 hover:bg-background/90 transition-all duration-200">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-amber-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{tribe.name}</h4>
                <p className="text-sm text-primary font-medium mb-2">{tribe.population}</p>
                <p className="text-xs text-muted-foreground">{tribe.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Experience Authentic Cultural Immersion
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our cultural programs to learn traditional crafts, participate in festivals, 
            and stay with local families for an authentic tribal experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-700 text-primary-foreground border-0 hover:shadow-glow">
              Book Cultural Tour
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-accent hover:text-accent-foreground">
              View Festival Calendar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalSection;