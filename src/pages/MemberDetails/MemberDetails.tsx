import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Crosshair, Instagram, MapPin, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
// import * as htmlparser2 from "htmlparser2";
import parse from "html-react-parser";

import ServiceMember from "@/actions/members";
import Loader from "@/components/layout/Loader";
import AnimationWrapper from "@/components/layout/AnimationWrapper";

function MemberDetails() {
  const { slug } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["find-member", slug],
    queryFn: async () => {
      const result = await ServiceMember.findMemberBySlug(slug as string);
      return result.data;
    },
    enabled: !!slug,
  });
  const [isBackgroundImageLoaded, setisBackgroundImageLoaded] = useState(false);
  const [isImageLoaded, setImageIsLoaded] = useState(false);

  const [imageSize, setImageSize] = useState({
    avatar: 200,
    backgroundHeight: 300,
  });
  const isMediumDevice = useMediaQuery("only screen and (min-width : 576px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 768px)");

  useEffect(() => {
    if (isMediumDevice) {
      setImageSize({ avatar: 230, backgroundHeight: 350 });
    }
    if (isLargeDevice) {
      setImageSize({ avatar: 240, backgroundHeight: 444 });
    }
  }, [isMediumDevice, isLargeDevice]);

  if (isLoading) return <Loader />;

  return (
    <AnimationWrapper keyValue="member-details">
      <div className="relative">
        {!isBackgroundImageLoaded && (
          <Skeleton height={imageSize.backgroundHeight} className="w-full" />
        )}
        <img
          src={data.background_image}
          onLoad={() => setisBackgroundImageLoaded(true)}
          style={{
            height: imageSize.backgroundHeight,
          }}
          className={`${
            isBackgroundImageLoaded ? "" : "hidden"
          } w-full object-cover`}
        />
        <div className="md:flex gap-x-7 rounded-full absolute top-2/3 md:top-[85%] left-10 lg:left-24">
          {!isImageLoaded && (
            <Skeleton
              circle
              height={imageSize.avatar}
              width={imageSize.avatar}
              className="border-4 border-blue-950"
            />
          )}
          <img
            src={data.image}
            alt={data.name}
            onLoad={() => setImageIsLoaded(true)}
            // width={imageSize.avatar}
            // height={imageSize.avatar}
            style={{
              height: imageSize.avatar,
              width: imageSize.avatar,
            }}
            className={`${
              isImageLoaded ? "" : "hidden"
            } rounded-full border-4 border-blue-950 object-cover`}
          />

          <div className="mt-10 md:mt-24 text-[14px] sm:text-[16px]">
            <h1 className="font-lemon text-xl md:text-3xl">{data.name}</h1>
            <p className="mt-3 leading-7 text-gray-400 font-light ">
              " {data.moto} "
            </p>
            <table className="mt-4 w-[300px] sm:w-[400px] h-28 border-spacing-y-11">
              <tbody>
                <tr>
                  <td>
                    <MapPin className="inline-block mr-2 text-green-400" /> Asal
                  </td>
                  <td>:</td>
                  <td>{data.origin}</td>
                </tr>
                <tr>
                  <td>
                    <Instagram className="inline-block mr-2 text-red-400" />{" "}
                    Instagram
                  </td>
                  <td>:</td>
                  <td>{data.instagram}</td>
                </tr>
                <tr>
                  <td>
                    <Phone className="inline-block mr-2 text-yellow-400" /> No
                    Telepon
                  </td>
                  <td>:</td>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <td>
                    <Crosshair className="inline-block mr-2 text-blue-400" /> Cita - cita
                  </td>
                  <td>:</td>
                  <td>{data.dream}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-fit mt-96 md:mt-72 container">
        <h2 className="font-bold text-center text-xl">DESKRIPSI</h2>
        <div className="bg-blue-600 h-2 rounded-full mt-5" />
        <div className="mt-6 leading-7 font-light text-[13px] md:text-[16px] tracking-wider md:tracking-wide description-member space-y-4">
          {parse(data.description)}
        </div>
      </div>
    </AnimationWrapper>
    // <Loader />
  );
}

export default MemberDetails;
