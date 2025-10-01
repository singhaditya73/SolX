import LightRays from "@/components/LightRays";
import Image from 'next/image';
export default function Home() {
  return (
    <div className="wrapper">
      <div style={{ width: "100%", height: "1000px", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#3333ff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        ></LightRays>
      </div>
      <div style={{ position: "absolute", inset: 1, zIndex: 0, overflow: "hidden" }}>
        <Image
          src="/images/finalHeroImage.webp"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
