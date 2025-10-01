import LightRays from "@/components/LightRays";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="wrapper">
      {/* This is the parent container. It MUST have position: "relative" */}
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

        {/* This is the image container. It uses inset to fill the parent. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Image
            src="/images/finalHeroImage.webp"
            alt="Background"
            fill
            priority
            style={{
              objectFit: "cover",
              // This should align the image to the bottom.
              objectPosition: "bottom", 
            }}
          />
        </div>
      </div>
    </div>
  );
}