import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./App.css";

function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
        console.log("Unsplash API Key:", API_KEY);
    
        const API_URL = `https://api.unsplash.com/photos/?client_id=${API_KEY}&per_page=42`;

        axios.get(API_URL)
            .then(response => { setImages(response.data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching images:", error));
            setLoading(false);
    }, []);

    return (
        <div className="gallery-container">

        {/* Loader  */}
        {loading && (
            <div className="loader-spinner">
                <div className="spinner"></div>
            </div>    
        )}

        {!loading && (
        <div className="grid">

            {images.map((image, index) => (
                <motion.img 
                    key={image.id}
                    src={image.urls.small}
                    alt={image.alt_description || "Unsplash Image"}
                    className="rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer" 
                    loading="lazy"
                    onClick={() => setSelectedImage(image.urls.regular)}
                    
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            ))}
        </div>
        )}

        <AnimatePresence>

            {selectedImage && (
                <motion.div className="lightbox" onClick={() => setSelectedImage(null)} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                > 

                    <motion.img src={selectedImage}             alt="Selected" 
                    className="lightbox-img"
                    loading="lazy" 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ duration: 1.2 }}
                    
                    />

                    <button className=" close-btn" whileHover={{ scale: 1.2 }}> X </button> 
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}

export default Gallery;
