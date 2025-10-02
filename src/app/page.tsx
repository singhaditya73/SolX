import Navbar from "@/components/Navbar";
import ImageBackground from "@/components/ui/ImageBackground";
import LightRaysContainer from "@/components/ui/LightRays";
import SplitTextWrapper from "@/components/ui/SplitText";
export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1370px", position: "relative" }}>
        <LightRaysContainer />
        <ImageBackground />
        <div
          style={{
            position: "absolute",
            top: "0%", // vertically center
            left: "50%", // horizontally center
            transform: "translate(-50%, -50%)", // shift back by half width & height
            zIndex: 10, // on top of other elements
            width: "50%", // optional: span half of parent width
            textAlign: "center", // center text inside
          }}
        >
          <Navbar />
        </div>
        <div
          style={{
            position: "absolute",
            top: "20%", // vertically center
            left: "55%", // horizontally center
            transform: "translate(-50%, -50%)", // shift back by half width & height
            zIndex: 10, // on top of other elements
            width: "50%", // optional: span half of parent width
            textAlign: "center", // center text inside
          }}
        >
          <SplitTextWrapper />
        </div>
      </div>
    </div>
  );
}
