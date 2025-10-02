"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../public/images/Nav_Logo.svg";

const Navbar = () => {
  // 1. Create two separate states for hover and scroll
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      // Set scroll state based on scroll position
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Derive the final visibility: show if hovered OR scrolled
  const isNavVisible = isHovered || isScrolled;

  return (
    // 3. Update hover handlers to only control the hover state
    <div
      className="h-fit fixed top-[34px] left-[50%] -translate-x-1/2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Logo */}
       <Image
  alt="Drop Icons"
  width={72} // Optional: Increase base width for better optimization
  height={81} // Optional: Increase base height
  className="w-[46.68px] h-[52.51px] relative z-[2] lg:w-[72px] lg:h-[81px] mx-auto" // Increased values
  src={Logo}
/>

        {/* Navigation Bar */}
        <AnimatePresence>
          {/* 4. Use the derived isNavVisible state to render the nav */}
          {isNavVisible && (
            <motion.nav
              initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              exit={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-[7px] left-1/2 z-[1] flex -translate-x-1/2 justify-between gap-x-[109px] rounded-[9px] bg-[#161616] px-[31.5px] py-[11.5px] font-grotesk-semiBold text-[16px] leading-[17.6px] text-white headerShadow lg:top-[15px] lg:gap-x-[123px] lg:py-[16.2px] lg:text-[17px] lg:leading-[18.5px]"
            >
              {/* Left Links */}
              <div className="flex gap-x-[31.5px]">
                <a href="https://droplets.drop.money" target="_blank" rel="noreferrer">
                  Earn
                </a>
                <a href="https://medium.com/drop-protocol" target="_blank" rel="noreferrer">
                  Blog
                </a>
              </div>

              {/* Right Links */}
              <div className="flex gap-x-[31.5px]">
                <a href="https://docs.drop.money" target="_blank" rel="noreferrer">
                  Docs
                </a>
                <a href="https://hadron.notion.site/Drop-FAQ-c73305bfa6f44a8d95f30400f80edcbe" target="_blank" rel="noreferrer">
                  FAQ
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;