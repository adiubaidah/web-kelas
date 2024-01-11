import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceEvent from "@/actions/events";
import Loader from "@/fragments/Loader";
import "swiper/css";
import { EventAndGallery, Gallery } from "@/types";

import Fancy from "./fancy";
import AnimationWrapper from "@/components/layout/AnimationWrapper";

function Gallery() {
  const { data, isLoading } = useQuery({
    queryKey: ["events", { gallery: true }],
    queryFn: ServiceEvent.getAllAndGallery,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
        <Loader />
    );
  }

  return (
    <AnimationWrapper className="container max-w-full background-blur-right" keyValue="gallery">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-[63.98px] font-lemon text-yellow-300">
        Gallery
      </h1>

      <div className="mt-10 space-y-7">
        {data?.data.map((item: EventAndGallery) => (
          <div key={item.id}>
            <h3 className="font-bold text-lg sm:text-xl lg:text-2xl">
              {item.name} - {item.year}
            </h3>
            <Swiper
              className="mt-4 overflow"
              spaceBetween={30}
              breakpoints={{
                400: {
                  slidesPerView: 1.2,
                },
                1024: {
                  slidesPerView: 3.5,
                },
              }}
            >
              {item.Gallery.map((gallery: Gallery) => (
                <SwiperSlide key={gallery.id} className="cursor-grab">
                  {/* <img src={gallery.image} alt={item.name} /> */}
                  <Fancy imageSrc={gallery.image} alt={item.name} group={item.name}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </AnimationWrapper>
  );
}

export default Gallery;
