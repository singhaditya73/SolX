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
            top: "20%", // Center vertically
            left: "38%", // Center horizontally
            // Adjust for perfect centering
            zIndex: 10, // Ensure it's on top of other elements
            width: "50%", // Allow the text container to span the full width
          }}
        >
          <SplitTextWrapper />
        </div>
      </div>
    </div>
  );
}
