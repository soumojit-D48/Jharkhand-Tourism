import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Star, MapPin, Users } from 'lucide-react';
import { stories } from '@/data';
import { communityImpacts } from '@/data';

const CommentSection = () => {

  return (
    <section className="py-20 bg-[linear-gradient(180deg,hsl(145_50%_95%),hsl(145_30%_85%))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-earth font-semibold text-sm tracking-wide uppercase mb-2 block">
            Community Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Voices from the Heart of Jharkhand
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the incredible people who make Jharkhand's tourism sustainable and authentic. 
            Their stories showcase how responsible tourism creates positive change in local communities.
          </p>
        </div>

        {/* Community Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityImpacts.map((impact, index) => (
            <div key={index} className="text-center p-6 bg-card/80 rounded-xl shadow-lg hover:shadow-green-200 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {impact.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {impact.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story) => (// text-center p-6 bg-card/80 rounded-xl shadow-lg hover:shadow-green-200 transition-all duration-300
            // <Card key={story.id} className="border-0 shadow-warm hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <Card key={story.id} className="border-0 text-center p-6 bg-card/80 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-amber-400 mb-4" />
                
                {/* Story */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{story.story}"
                </blockquote>
                
                {/* Profile */}
                <div className="flex items-start space-x-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-accent font-medium mb-1">{story.role}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.village}
                    </div>
                    <div className="flex items-center text-xs text-primary font-medium">
                      <Users className="h-4 w-4 mr-1" />
                      {story.impact}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Initiatives */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-warm">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Community-Led Initiatives
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Skill Development Programs",
                description: "Training local youth in hospitality, guiding, and craft-making skills.",
                participants: "300+ trained annually"
              },
              {
                title: "Women's Empowerment",
                description: "Supporting women-led cooperatives in food processing and handicrafts.",
                participants: "150+ women entrepreneurs"
              },
              {
                title: "Cultural Preservation",
                description: "Documenting and teaching traditional songs, dances, and stories.",
                participants: "25+ cultural groups active"
              }
            ].map((initiative, index) => (
              <div key={index} className="text-center p-4">
                <h4 className="font-semibold text-foreground mb-2">{initiative.title}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {initiative.description}
                </p>
                <div className="text-xs text-primary font-medium">
                  {initiative.participants}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Be Part of Sustainable Tourism
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your visit directly supports local communities and helps preserve Jharkhand's cultural heritage. 
            Choose responsible tourism experiences that make a positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-primary-foreground border-0 hover:shadow-xl">
              Support Communities
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-gray hover:text-gray-700">
              Learn More Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;