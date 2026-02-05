"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({ media = [] }) => {
  const [current, setCurrent] = useState(0);

  // safety check
  if (!Array.isArray(media) || media.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No media available
      </div>
    );
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow">
      {/* Slider */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {media.map((url, index) => (
          <div key={index} className="min-w-full flex justify-center">
            {url.endsWith(".mp4") ? (
              <video
                src={url}
                controls
                className="w-full h-[350px] object-contain"
              />
            ) : (
              <Image
                src={url}
                alt={`slide-${index}`}
                width={600}
                height={400}
                className="object-contain h-[350px]"
                priority
              />
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
