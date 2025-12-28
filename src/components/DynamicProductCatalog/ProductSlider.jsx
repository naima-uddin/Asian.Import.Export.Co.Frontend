"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Slider data - images and text content
  const slides = [
    {
      image: "/1.png",
    },
    {
      image: "/2.png",
    },
    {
      image: "/3.png",
    },
    {
      image: "/4.png",
    },
    {
      image: "/5.png",
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Full Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
              }}
            />
            
            {/* Dark Overlay for better text readability */}
            <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].bgColor}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Top Section - Title and Text */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${currentSlide}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              {slides[currentSlide].title}
            </motion.h2>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={`subtitle-${currentSlide}`}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 15, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-teal-200 mb-2"
            >
              {slides[currentSlide].subtitle}
            </motion.h3>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`description-${currentSlide}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/90"
            >
              {slides[currentSlide].description}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>

      {/* Auto-Play Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ 
            width: "100%",
            transition: { 
              duration: 5, 
              ease: "linear" 
            }
          }}
          className="h-full bg-teal-400"
        />
      </div>
      
        {/* Bottom Section - Navigation */}
        <div className="pt-4">
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
    </div>
  );
};

export default ProductSlider;