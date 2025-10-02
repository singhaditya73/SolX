import Image from 'next/image';

export default function bgBlur() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Image
        src="/images/bgBlur.webp"
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