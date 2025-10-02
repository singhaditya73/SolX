import Image from 'next/image';

export default function ImageBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <Image
        src="/images/finalHeroImage.webp"
        alt="Background"
        fill
        priority
            style={{
              objectFit: "cover",
              objectPosition: "bottom", 
            }}
          />
        </div>
  );
}