import React, {useEffect, useRef, useState} from 'react';
import Loader from '../loader/Loader';
import classes from "./LazyImage.module.scss";

interface Props {
    src: string;
    alt: string;
}

const LazyImage = ({src, alt}: Props) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = src;
                    observer.unobserve(img);
                }
            });
        });

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [src]);

    return (
        <div className={classes.lazyImageContainer}>
            {isLoading && <Loader/>}
            <img
                loading='lazy'
                ref={imageRef}
                src=""
                alt={alt}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

export default LazyImage;
