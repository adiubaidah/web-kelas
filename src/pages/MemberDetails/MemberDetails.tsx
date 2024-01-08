import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Instagram, MapPin, Phone } from "lucide-react";

import Loader from "@/fragments/Loader";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function MemberDetails() {
  const { slug } = useParams();
  const [skeletonSIze, setSkeletonSIze] = useState({
    avatar: 200,
    backgroundHeight: 300,
  });
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 576px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 768px)"
  );
  
  useEffect(() => {
    if(isMediumDevice) setSkeletonSIze({avatar: 230, backgroundHeight: 350})
    else if(isLargeDevice) setSkeletonSIze({avatar: 250, backgroundHeight: 444})
  }, [isMediumDevice, isLargeDevice]);

  return (
    <section>
      <div className="relative">
          <Skeleton height={skeletonSIze.backgroundHeight} className="w-full" />
        <div className="md:flex gap-x-7 rounded-full absolute top-2/3 md:top-[85%] left-10 lg:left-24">
          <Skeleton
            circle
            height={skeletonSIze.avatar}
            width={skeletonSIze.avatar}
            className="border-4 border-blue-950"
          />
          <div className="mt-10 md:mt-24 text-[14px] sm:text-[16px]">
            <h1 className="font-lemon text-xl md:text-3xl">Nama</h1>
            <p className="leading-7 text-gray-400 font-light ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              omnis aut eius in eum. Dolores,
            </p>
              <table className="mt-4 w-full sm:w-[400px] border-spacing-y-11">
                <tbody>
                  <tr>
                    <td> <MapPin className="inline-block mr-2 text-green-400"/> Asal</td>
                    <td>:</td>
                    <td>jewifoejfjwej</td>
                  </tr>
                  <tr>
                    <td> <Instagram className="inline-block mr-2 text-red-400"/> Instagram</td>
                    <td>:</td>
                    <td>jewifoejfjwej</td>
                  </tr>
                  <tr>
                    <td> <Phone className="inline-block mr-2 text-yellow-400"/> No Telepon</td>
                    <td>:</td>
                    <td>jewifoejfjwej</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
      <div className="h-fit mt-96 md:mt-72 container">
        <h2 className="font-bold text-center text-xl">DESKRIPSI</h2>
        <div className="bg-blue-600 h-2 rounded-full mt-5" />
        <div className="mt-6 leading-7 font-light text-[13px] md:text-[16px] tracking-wider md:tracking-wide">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eum
            quidem facere distinctio pariatur odio culpa, nihil tempora, soluta
            aspernatur sunt debitis error dicta labore praesentium minima quo
            ullam! Fugiat quo voluptates quisquam modi numquam obcaecati
            doloremque similique odio veritatis sint alias dolorum qui labore a,
            deleniti minima quidem cupiditate illo! Maiores illo accusantium,
            sunt animi commodi tempore culpa consectetur pariatur aliquam
            molestiae vero, fugiat officiis ipsa reiciendis voluptatem
            consequuntur aliquid saepe perferendis, doloremque voluptates.
            Aliquid quisquam quidem similique temporibus veniam eaque hic. Unde,
            quo? Fuga cumque nam dolor eos nemo, illo laborum nihil velit fugiat
            sint! Iure, similique eos!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eum
            quidem facere distinctio pariatur odio culpa, nihil tempora, soluta
            aspernatur sunt debitis error dicta labore praesentium minima quo
            ullam! Fugiat quo voluptates quisquam modi numquam obcaecati
            doloremque similique odio veritatis sint alias dolorum qui labore a,
            deleniti minima quidem cupiditate illo! Maiores illo accusantium,
            sunt animi commodi tempore culpa consectetur pariatur aliquam
            molestiae vero, fugiat officiis ipsa reiciendis voluptatem
            consequuntur aliquid saepe perferendis, doloremque voluptates.
            Aliquid quisquam quidem similique temporibus veniam eaque hic. Unde,
            quo? Fuga cumque nam dolor eos nemo, illo laborum nihil velit fugiat
            sint! Iure, similique eos!
          </p>
        </div>
      </div>
    </section>
    // <Loader />
  );
}

export default MemberDetails;
