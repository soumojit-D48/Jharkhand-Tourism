

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample images representing Jharkhand's eco and cultural tourism
  const slides = [
    {
      id: 1,
      image: "https://img.freepik.com/premium-photo/patratu-valley-ranchi-beautiful-place-jharkhand_459244-239.jpg",
      title: "Discover Jharkhand's Natural Beauty",
      subtitle: "Explore pristine forests and wildlife sanctuaries"
    },
    {
      id: 2,
      image: "https://img.freepik.com/premium-photo/dassam-water-falls-bundu-ranchi-jharkhand_193751-27.jpg",
      title: "Rich Cultural Heritage",
      subtitle: "Experience traditional festivals and tribal art"
    },
    {
      id: 3, // "https://www.indiatravel.app/wp-content/uploads/2024/03/places-to-visit-in-jharkhand.jpg"
      image: "https://www.indiatravel.app/wp-content/uploads/2024/03/places-to-visit-in-jharkhand.jpg",
      title: "Majestic Waterfalls",
      subtitle: "Visit stunning cascades and natural wonders"
    }, // https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/ghatshila-image.jpg
    {
      id: 4,
      image: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/ghatshila-image.jpg",
      title: "Wildlife Adventures",
      subtitle: "Encounter diverse flora and fauna in their habitat"
    },
    {
      id: 5,
      image: "https://ak0.picdn.net/shutterstock/videos/31954030/thumb/1.jpg?i10c=img.resize(height:160)",
      title: "Eco-Tourism Paradise",
      subtitle: "Sustainable travel through untouched landscapes"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative"
            >
                
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="text-white max-w-4xl px-6">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-light opacity-90">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

         <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Floating Info Card */} 
      <div className="absolute bottom-8 left-8 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg max-w-sm hidden md:block text-black hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
        <h3 className="font-semibold text-lg mb-2">Jharkhand Tourism</h3>
        <p className="text-sm opacity-90">
          Discover the unexplored beauty of Jharkhand - where nature meets culture in perfect harmony.
        </p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeaderSlider;