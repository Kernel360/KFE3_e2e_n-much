'use client';
import { useState } from 'react';
import { FIRST_SLIDE_INDEX, LAST_SLIDE_INDEX } from 'src/entities/layout/constants';

const useOnboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(FIRST_SLIDE_INDEX);
  const [isSkipped, setIsSkipped] = useState(false);

  const nextSlide = () => {
    if (currentSlide < LAST_SLIDE_INDEX) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsSkipped(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > FIRST_SLIDE_INDEX) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipIntro = () => {
    setIsSkipped(true);
  };

  return { currentSlide, prevSlide, nextSlide, skipIntro, isSkipped };
};

export { useOnboarding };
