import Hero from "@/sections/Hero";
import Foundation from "@/sections/Foundation/Foundation";
import Brands from "@/sections/Categories/Categories";
import GlobalPresence from "@/sections/GlobalPresence/GlobalPresence";
import Sustainability from "@/sections/Sustainability/Sustainability";
import Journal from "@/sections/Journal/Journal";
import People from "@/sections/People/People";
import WineryExperience from "@/sections/WineryExperience/WineryExperience";
import Contact from "@/sections/Contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Foundation />
      <Brands />
      <GlobalPresence />
      <Sustainability />
      <Journal />
      <People />
      <WineryExperience />
      <Contact />
    </>
  );
}