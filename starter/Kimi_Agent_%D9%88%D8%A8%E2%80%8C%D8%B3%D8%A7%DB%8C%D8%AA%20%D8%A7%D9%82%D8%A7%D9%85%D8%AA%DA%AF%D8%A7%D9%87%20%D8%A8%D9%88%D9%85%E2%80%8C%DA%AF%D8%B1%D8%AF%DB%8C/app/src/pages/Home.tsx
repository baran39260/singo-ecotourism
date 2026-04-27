import HeroSection from '../sections/HeroSection'
import IntroBand from '../sections/IntroBand'
import MemoirDisc from '../sections/MemoirDisc'
import RoomShowcase from '../sections/RoomShowcase'
import ExperienceHighlights from '../sections/ExperienceHighlights'
import PhilosophyStatement from '../sections/PhilosophyStatement'
import TestimonialCylinder from '../sections/TestimonialCylinder'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroBand />
      <MemoirDisc />
      <RoomShowcase />
      <ExperienceHighlights />
      <PhilosophyStatement />
      <TestimonialCylinder />
      <ContactSection />
    </>
  )
}
