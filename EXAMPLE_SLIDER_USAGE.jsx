import React from 'react';
import SliderImage from './components/SliderImage';

/**
 * Example usage of SliderImage component
 * This demonstrates how to use the component with slider images
 */
function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Slider Image Examples</h1>
      
      {/* Example 1: First slider image with high priority */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Slider Image 1 (High Priority)</h2>
        <SliderImage
          src="/assets/slider-image-1.jpg"
          alt="Empty room before virtual staging"
          width={800}
          height={600}
          loading="eager"
          fetchPriority="high"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </div>
      
      {/* Example 2: Second slider image with lazy loading */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Slider Image 2 (Lazy Loading)</h2>
        <SliderImage
          src="/assets/slider-image-2.jpg"
          alt="Professionally staged room with modern design"
          width={800}
          height={600}
          loading="lazy"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </div>
    </div>
  );
}

export default App;
