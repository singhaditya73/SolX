import Image from 'next/image';

export default function FooterBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Image
        src="/images/Footer.webp"
        alt="Background"
        fill
        priority
      />
    </div>
  );
}