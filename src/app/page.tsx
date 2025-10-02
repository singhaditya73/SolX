import Navbar from "@/components/Navbar";
import ImageBackground from "@/components/ui/ImageBackground";
import LightRaysContainer from "@/components/ui/LightRays";
import SplitTextWrapper from "@/components/ui/SplitText";
import BgBlur from "@/components/ui/bgBlur";

export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1370px", position: "relative" }}>
        
        {/* --- Background Layers with Controlled Stacking --- */}

        {/* Layer 1: Light Rays (at the very bottom) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <LightRaysContainer />
        </div>

        {/* Layer 2: Blur Effect (between rays and image) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <BgBlur />
        </div>

        {/* Layer 3: Main Image (on top of blur) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          <ImageBackground />
        </div>

        {/* --- Foreground Layers (Your Navbar and Text) --- */}
        <div
          style={{
            position: "fixed",
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 4,
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
            zIndex: 6,
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