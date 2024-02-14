import { useEffect, useState } from "react";

const useWindowSize = () => {

  const determineAvatarSize = (width) => {
    if (width <= 640) {
      return 'sm';
    } else {
      return 'md';
    }
  };

  const determineTextSize = (width) => {
    const ratio = width / (1920 / 20);
    const newSize = ratio > 20 ? 20 : ratio;
    return newSize;
  };

  const [avatarSize, setAvatarSize] = useState(() => determineAvatarSize(window.innerWidth));
  const [responsiveTextSize, setResponsiveTextSize] = useState(determineTextSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newSize = determineAvatarSize(width);
      setAvatarSize(newSize);
      const textSize = determineTextSize(width);
      setResponsiveTextSize(textSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return { avatarSize, responsiveTextSize };
}

export default useWindowSize;
