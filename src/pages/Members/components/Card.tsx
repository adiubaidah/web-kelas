import { useState } from "react";
import { MapPin } from "lucide-react";
import Skeleton from "react-loading-skeleton";

import { Member } from "@/types";
import { Anchor } from "@/components/ui/anchor";

const Card = ({
  name,
  slug,
  background_image,
  image,
  origin,
}: Member) => {
  const [isBackgroundImageLoaded, setisBackgroundImageLoaded] = useState(false);
  const [isImageLoaded, setImageIsLoaded] = useState(false);

  return (
    <div className="bg-indigo-950 pt-2 px-2 pb-7 rounded-2xl shadow-lg">
      <div className={`w-full h-44 md:h-[209px] rounded-2xl relative`}>
        {!isBackgroundImageLoaded && (
          <Skeleton className="w-full h-full z-10" />
        )}
        <img
          src={background_image}
          onLoad={() => setisBackgroundImageLoaded(true)}
          className={`${isBackgroundImageLoaded ? "" : "hidden"} rounded-2xl`}
        />
        <div className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] rounded-full absolute top-3/4 md:top-1/2 left-1/2 -translate-x-1/2 z-20">
          {!isImageLoaded && (
            <Skeleton
              circle
              className="w-full h-full border-4 border-indigo-950"
            />
          )}
          <img
            src={image}
            className={`${
              isImageLoaded ? "" : "hidden"
            } w-full h-full rounded-full object-cover border-4 border-indigo-950`}
            onLoad={() => setImageIsLoaded(true)}
          />
        </div>
      </div>
      <div className="mt-24">
        <h5 className="text-lg font-bold text-center leading-loose mb-2">
          {name}
        </h5>
        <h6 className="text-stone-300 font-bold flex justify-center gap-x-3">
          <MapPin className="w-6 h-6 text-green-400" /> {origin}
        </h6>
      </div>
      <div className="flex justify-center mt-5" >
        <Anchor href={"/anggota/"+slug} variant="outline">
          Lihat Profile
        </Anchor>
      </div>
    </div>
  );
};

export default Card;
