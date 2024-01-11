import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "@uidotdev/usehooks";

Fancybox.bind("[data-fancybox]", {});
const Fancy = ({ imageSrc, alt, group }: { imageSrc: string; alt?: string, group?:  string }) => {
  const [isLoaded, setisLoaded] = useState(false);
  const [skeletonSize, setSkeletonSize] = useState({
    width: 400,
    height: 200,
  });

  const isMediumDevice = useMediaQuery("only screen and (min-width : 576px) and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 768px)");

  useEffect(() => {

    if (isMediumDevice) {
      setSkeletonSize({
        width: 400,
        height: 300,
      });
      return
    }
    if (isLargeDevice) {
      // console.log("Besar")
      setSkeletonSize({
        width: 300,
        height: 200,
      });
      return
    }

  }, [isMediumDevice, isLargeDevice])

  return (
    <>
      {!isLoaded && (
        <Skeleton width={skeletonSize.width} height={skeletonSize.height} />
      )}
      <a href={imageSrc} data-fancybox={group}>
        <img
          src={imageSrc}
          alt={alt}
          className={`${isLoaded ? "" : "hidden"}`}
          onLoad={() => setisLoaded(true)}
        />
      </a>
    </>
  );
};

export default Fancy;
