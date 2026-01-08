import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 100, infinite = false, startDelay = 0, hideCursorOnComplete = false }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initial Start Delay
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let timeout;
    
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else {
      setIsComplete(true);
      if (infinite) {
        timeout = setTimeout(() => {
          setCurrentIndex(0);
          setCurrentText('');
          setIsComplete(false);
        }, 3000);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text, started]);

  return (
    <span>
      {currentText}
      {(!hideCursorOnComplete || !isComplete) && (
        <span className="animate-cursor">|</span>
      )}
    </span>
  );
};

export default TypewriterText;
