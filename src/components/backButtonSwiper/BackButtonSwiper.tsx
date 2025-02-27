import { useSwiper } from "swiper/react";

export default () => {
  const swiper = useSwiper();
  return <button className="p-2 bg-blue-600 text-white font-bold rounded-md mt-4 w-48" onClick={() => swiper.slidePrev()}>Anterior</button>;
};