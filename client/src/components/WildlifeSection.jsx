import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Binoculars,
  TreePine,
  Fish,
  Bird,
  Target,
  MapPin,
  Clock,
} from "lucide-react";

import {sanctuaries, conservationStats} from "@/data"

const WildlifeSection = () => {
//   const [selectedSanctuary, setSelectedSanctuary] = useState("betla");


  return (
    // <section id="wildlife" className="py-20 bg-background ">
    // <section id="wildlife" className="py-20 bg-gradient-to-br from-green-700 via-green-500 to-lime-400">
    // <section id="wildlife" className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-700">
    <section
      id="wildlife"
      className="py-20 bg-gradient-to-br from-emerald-200 via-green-300 to-teal-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-nature font-semibold text-sm tracking-wide uppercase mb-2 block">
            Wildlife Conservation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Protect & Preserve Wildlife
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Jharkhand's commitment to wildlife conservation has created safe
            havens for endangered species while providing sustainable
            eco-tourism opportunities for visitors.
          </p>
        </div>



        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {conservationStats.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wildlife Sanctuaries */}
        <div className="mb-16 ">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Major Wildlife Sanctuaries
          </h3>

          <Tabs defaultValue="betla" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 ">
              <TabsTrigger value="betla">Betla National Park</TabsTrigger>
              <TabsTrigger value="palamu">Palamu Tiger Reserve</TabsTrigger>
            </TabsList>
            {/* <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 rounded-lg bg-muted/30">
              <TabsTrigger
                value="betla"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white 
               rounded-md px-3 transition-colors duration-200"
              >
                Betla National Park
              </TabsTrigger>
              <TabsTrigger
                value="palamu"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white 
               rounded-md px-3 py-2 transition-colors duration-200"
              >
                Palamu Tiger Reserve
              </TabsTrigger>
            </TabsList> */}

            {Object.entries(sanctuaries).map(([key, sanctuary]) => (
              <TabsContent key={key} value={key}>
                {/* {console.log(key)} */}
                {/*console.log(sanctuary)*/}
                <Card className="overflow-hidden border-1 shadow-green-200 hover:shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* grid 1 -> img , grid 2 -> card content*/}
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={sanctuary.image}
                        alt={sanctuary.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                        Est. {sanctuary.established}
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8">
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {sanctuary.name}
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Area:</span>
                          <div className="font-semibold text-foreground">
                            {sanctuary.area}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Best Time:
                          </span>
                          <div className="font-semibold text-foreground">
                            {sanctuary.bestTime}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-foreground mb-2">
                            Major Animals
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {sanctuary.animals.map((animal, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-amber-300"
                              >
                                {animal}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold text-foreground mb-2">
                            Bird Species
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {sanctuary.birds.map((bird, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-lime-300"
                              >
                                {bird}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold text-foreground mb-2">
                            Activities
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {sanctuary.activities.map((activity, index) => (
                              <Badge
                                key={index}
                                className="text-xs bg-blue-300 text-accent-foreground"
                              >
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Conservation CTA */}
        <div className="text-center bg-gradient-nature rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join Our Conservation Efforts
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your visit directly contributes to wildlife protection and habitat
            preservation. Learn how you can become a conservation ambassador for
            Jharkhand's incredible biodiversity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-400 text-grey border-0 hover:bg-green-500"
            >
              <Binoculars className="h-5 w-5 mr-2" />
              Plan Wildlife Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-black hover:text-white"
            >
              Learn Conservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WildlifeSection;

