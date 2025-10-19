import React from 'react';
import PropTypes from 'prop-types';

/**
 * SliderImage component that renders a <picture> element with AVIF and JPG sources
 * Supporting browsers receive AVIF format, non-supporting browsers fall back to JPG
 * 
 * @param {string} src - Path to the JPG image (e.g., "/assets/slider-image-1.jpg")
 * @param {string} alt - Alternative text for the image
 * @param {string} className - Optional CSS classes
 * @param {number} width - Image width attribute
 * @param {number} height - Image height attribute
 * @param {string} loading - Loading strategy ("eager" or "lazy")
 * @param {string} fetchPriority - Fetch priority ("high", "low", "auto")
 */
export const SliderImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto'
}) => {
  // Generate AVIF source path by replacing .jpg extension with .avif
  const avifSrc = src.replace(/\.jpg$/i, '.avif');
  
  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
};

SliderImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  fetchPriority: PropTypes.oneOf(['high', 'low', 'auto'])
};

export default SliderImage;
