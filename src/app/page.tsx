import Navbar from "@/components/Navbar";
import ImageBackground from "@/components/ui/ImageBackground";
import LightRaysContainer from "@/components/ui/LightRays";
import SplitTextWrapper from "@/components/ui/SplitText";
import BgBlur from "@/components/ui/bgBlur";
import FooterBg from "@/components/ui/footerBackground";

export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1370px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            mixBlendMode: "screen",
            height: "100%",
            width: "100%",
          }}
        >
          <LightRaysContainer />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "60%",
            width: "90%",
            backgroundColor: "white",
            zIndex: 3,
            marginLeft: "5%",
            marginRight: "5%",
            borderRadius: "20px",

            marginTop: "65%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            height: "100%",
            width: "100%",
            marginTop: "5%",
          }}
        >
          <ImageBackground />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "52%",
            zIndex: 2,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: "55%",
          }}
        >
          <FooterBg />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            width: "100%",
            height: "90%",
            overflow: "hidden",
            marginTop: "50%",
          }}
        >
          <BgBlur />
        </div>
        <div
          style={{
            position: "fixed",
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 7,
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
