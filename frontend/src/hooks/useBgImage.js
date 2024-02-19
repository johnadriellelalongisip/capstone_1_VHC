import { useEffect, useState } from "react";

const useBgImage = () => {
  const bgImages = ['bgimg_0.jpg','bgimg_1.jpg','bgimg_2.jpg','bgimg_3.jpg','bgimg_4.jpg'];
  const [backgroundImage, setBackgroundImage] = useState(bgImages[0]);
  
  useEffect(() => {
    let index = 0;
    const changeImage = setInterval(() => {
      setBackgroundImage(bgImages[index]);
      index = (index + 1) % bgImages.length;
    },2000);
    return () => clearInterval(changeImage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return backgroundImage;
}
 
export default useBgImage;