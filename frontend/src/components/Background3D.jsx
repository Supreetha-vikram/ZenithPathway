import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Background3D = () => {
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        // Grid-based generation for even distribution
        const columns = 6;
        const rows = 4;
        const newCubes = [];
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                // Base position on grid + random jitter
                const xBase = (c / columns) * 100;
                const yBase = (r / rows) * 100;
                const jitter = 15; // +/- variance
                
                newCubes.push({
                    id: `${r}-${c}`,
                    x: xBase + Math.random() * jitter,
                    y: yBase + Math.random() * jitter,
                    z: -200 + Math.random() * 400, // Depth variance
                    size: 50 + Math.random() * 40,
                    duration: 12 + Math.random() * 15,
                    delay: Math.random() * 5,
                });
            }
        }
        setCubes(newCubes);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none',
            perspective: '1000px',
            background: '#130308' 
        }}>
            {cubes.map((cube) => (
                <Cube key={cube.id} {...cube} />
            ))}
        </div>
    );
};

const Cube = ({ x, y, z, size, duration, delay }) => {
    const half = size / 2;
    
    // "Solid Fluorite" Style
    const faceStyle = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        // Reduced Border Intensity
        border: '3px solid rgba(255, 0, 127, 0.5)', 
        // Softer Internal Volume
        boxShadow: 'inset 0 0 15px rgba(255, 0, 127, 0.15), 0 0 15px rgba(255, 0, 127, 0.1)',
        // Lighter Glassy Surface
        background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.05) 0%, rgba(20, 5, 20, 0.3) 100%)',
        backfaceVisibility: 'visible'
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                x: `${x}vw`, 
                y: `${y}vh`, 
                rotateX: 0, 
                rotateY: 0, 
                rotateZ: 0 
            }}
            animate={{ 
                opacity: [0.3, 0.6, 0.3], 
                y: [`${y}vh`, `${y - 20}vh`, `${y}vh`], // Float range
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
            style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                transformStyle: 'preserve-3d', // Enable True 3D
            }}
        >
            {/* Front */}
            <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
            {/* Back */}
            <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
            {/* Right */}
            <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
            {/* Left */}
            <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
            {/* Top */}
            <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
            {/* Bottom */}
            <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </motion.div>
    );
};

export default Background3D;
