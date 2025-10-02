"use client";
import SplitTextComponent from "../SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};
export default function SplitTextWrapper() {
  return (
    <div style={{ width: "50%", height: "100px", position: "relative" }}>
      <SplitTextComponent
        text="Hello, GSAP!cdfsf sgfsfg dfhdghgd dhdgdhgf hghgf hfghfh fhfhfg "
        className="text-2xl font-semibold text-center text-white"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
}
