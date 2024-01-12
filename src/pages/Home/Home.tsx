import Hero from "./components/Hero";
import Structure from "./components/Structure2";
import Chat from "./components/Chat";
import AnimationWrapper from "@/components/layout/AnimationWrapper";
function Home() {
  return (
    <AnimationWrapper keyValue='home' transition={{duration: 1}}>
      <Hero />
      <div className="mt-20">
        <Structure />
      </div>
      <div className="mt-28">
        <Chat />
      </div>
    </AnimationWrapper>
  );
}

export default Home;
