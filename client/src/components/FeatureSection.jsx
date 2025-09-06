import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Users, Camera, Map, Compass, Heart,ChefHat } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: TreePine,
      title: "Eco Adventures",
      description: "Explore pristine forests, wildlife sanctuaries, and biodiversity hotspots with guided eco-tours.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Cultural Heritage",
      description: "Immerse yourself in authentic tribal cultures, traditional crafts, and ancient customs.",
      color: "text-primary"
    },
    {
      icon: Camera,
      title: "Photography Tours",
      description: "Capture stunning landscapes, wildlife, and cultural moments with expert photography guides.",
      color: "text-primary"
    },
    {
      icon: Map,
      title: "Custom Itineraries",
      description: "Personalized travel plans crafted to match your interests and adventure level.",
      color: "text-primary"
    },
    {
      icon: Compass,
      title: "Adventure Sports",
      description: "Rock climbing, trekking, river rafting, and wildlife safaris for thrill seekers.",
      color: "text-primary"
    },
    // {
    //   icon: Heart,
    //   title: "Sustainable Tourism",
    //   description: "Responsible travel that supports local communities and environmental conservation.",
    //   color: "text-primary"
    // },
    {
        icon: ChefHat ,
        title: "Cuisines of Jharkhand",
        description: "Don't only see! But Eat it! The traditional food loved by the people for centuries are available to you! From Litti-chokha to Rugdha",
        color: "text-primary"
   
    }

  ];

  return (
    // <section id="features" className="py-20 px-7 bg-gradient-to-tl from-teal-300 via-teal-400 to-teal-600 w-full"> // bg-gradient-to-r from-lime-100 via-lime-200 to-lime-300

    // <section id="features" className="py-20 px-20 bg-[linear-gradient(180deg,hsl(145_50%_95%),hsl(145_30%_85%))] w-full">
    <section id="features" className="py-20 lg:px-20 bg-gradient-to-r from-lime-200 via-lime-300 to-lime-400 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose Jharkhand?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes Jharkhand a unique destination for eco and cultural tourism
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return ( // text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
              // <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;