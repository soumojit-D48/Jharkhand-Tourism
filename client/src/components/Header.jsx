
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { slides } from '@/data';
import { useNavigate } from 'react-router-dom';

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // mobile states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate()

  // Auto-play functionality
  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Image preloading for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide) => {
        const img = new Image();
        img.src = slide.image;
      });
      setIsLoaded(true);
    };
    preloadImages();
  }, [slides]);

  // Navigation functions -> <-
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => { // via click dots(index)
    setCurrentSlide(index);
  }, []);



  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Keyboard navigation <  >
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);


  return (
    <div className="relative w-full h-[91vh] overflow-hidden bg-gray-900">
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        </div>
      )}

      {/* Slider Container */}
      <div 
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div 
          className="flex h-full transition-transform duration-1000 ease-out"
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
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/*  gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              
              {/* layout */}
              <div className="absolute inset-0 flex items-center justify-start text-left pl-8 md:pl-16">
                <div className="text-white max-w-2xl">
                  {/* Location badge */}
                  <div className="flex items-center gap-2 mb-4 opacity-90">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {slide.location}
                    </span>
                  </div>

                  {/* Main title with staggered animation */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    <span className="inline-block animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                      {slide.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <br />
                    <span className="inline-block animate-fade-in-up text-yellow-400" style={{animationDelay: '0.4s'}}>
                      {slide.title.split(' ').slice(2).join(' ')}
                    </span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-lg md:text-xl font-light opacity-90 mb-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    {slide.subtitle}
                  </p>

                  {/* Rating and highlights */}
                  <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{slide.rating}</span>
                    </div>
                    {slide.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button onClick={() =>{ navigate('/destinations'); window.scrollTo(0,0)}} className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up" style={{animationDelay: '1s'}}>
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md transition-all duration-300 group border border-white/15"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md transition-all duration-300 group border border-white/15"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>


        {/* slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button // dots are buttons
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75 w-2'
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Animated progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeaderSlider;