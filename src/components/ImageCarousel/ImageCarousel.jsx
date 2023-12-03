import React, { useState, useEffect } from 'react';
import './ImageCarousel.scss'; // Ensure you have the SCSS file for styling

const ImageCarousel = () => {
    // Array of image URLs
    const images = [
        '../src/assets/images/nike.png',
        '../src/assets/images/camera.png',
        '../src/assets/images/croc.png',
        '../src/assets/images/headphone.png',
        '../src/assets/images/heel.png',
        '../src/assets/images/jacket.png',
        '../src/assets/images/laptop.png',
        '../src/assets/images/samsung.png',
        '../src/assets/images/timb.png'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000); // Change image every 3000 milliseconds (3 seconds)

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            <div className="carouselIndicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;