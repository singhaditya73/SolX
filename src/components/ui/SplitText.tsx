"use client";
import SplitTextComponent from "../SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};
export default function SplitTextWrapper() {
  return (
    <div
      style={{
        width: "80%",
        height: "100px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <SplitTextComponent
        text="SolX: Build Across Chains"
        className="text-6xl font-bold text-center text-white mt-12"
        delay={100}
        duration={0.6}
        ease="bounce.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <SplitTextComponent
        text="Easily create tokens, transfer SOL, and run crowdfunding projects across chains."
        className="text-2xl font-semibold text-center text-white mt-8"
        delay={30}
        duration={0.9}
        ease="bounce.out"
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
