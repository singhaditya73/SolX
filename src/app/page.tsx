import ImageBackground from "@/components/ui/ImageBackground";
import LightRaysContainer from "@/components/ui/LightRays";
import SplitText from "@/components/ui/SplitText";
export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1370px", position: "relative" }}>
        
        
        <LightRaysContainer />
        <ImageBackground />
      </div>
    </div>
  );
}