import Navbar from "@/components/Navbar";
import ImageBackground from "@/components/ui/ImageBackground";
import LightRaysContainer from "@/components/ui/LightRays";
import SplitTextWrapper from "@/components/ui/SplitText";
import BgBlur from "@/components/ui/bgBlur";

export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1370px", position: "relative" }}>
        <LightRaysContainer />
        <BgBlur />
        <ImageBackground />
        <div
          style={{
            position: "fixed",
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: "50%",
            textAlign: "center",
          }}
        >
          <Navbar />
        </div>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: "50%",
            textAlign: "center",
          }}
        >
          <SplitTextWrapper />
        </div>
      </div>
    </div>
  );
}