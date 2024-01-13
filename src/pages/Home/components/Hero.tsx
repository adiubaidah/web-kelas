import { Instagram } from "lucide-react";


function Hero() {
  return (
    <section className="h-screen pt-12 px-1 flex flex-col items-center justify-center max-w-full background-hero">
      <div className="text-center">
        <h3 className="font-bold capitalize tracking-wider text-lg md:text-2xl lg:text-4xl">
          Selamat Datang di
        </h3>
        <h1 className="mt-4 font-lemon text-yellow-300 text-3xl sm:text-3xl lg:text-[65px] capitalize drop-shadow-xl lg:leading-[75px]">
          Kelas a ti polinema psdku Lumajang
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center gap-y-6">
        <a
          href=""
          className="glass flex text-lg p-4 w-fit items-center gap-x-4"
        >
          <Instagram className="w-8 h-8" />
          <span>Instagram</span>
        </a>
        <div className="glass w-56 lg:w-72 flex justify-evenly text-3xl lg:text-5xl font-bold py-3">
          <p className="text-blue-500">17</p>
          <p>
            <span className="text-blue-500">2</span>
            <span className="text-pink-500">0</span>
          </p>
          <p className="text-pink-500">13</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
