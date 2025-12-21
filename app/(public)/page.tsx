import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedQuote from "@/components/home/FeaturedQuote";
import QuickNavigation from "@/components/home/QuickNavigation";
import LatestVideos from "@/components/home/LatestVideos";
import PhotoGalleryPreview from "@/components/home/PhotoGalleryPreview";
import TimelineSummary from "@/components/home/TimelineSummary";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import RecentTributes from "@/components/home/RecentTributes";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedQuote />
      <QuickNavigation />
      <LatestVideos />
      <PhotoGalleryPreview />
      <TimelineSummary />
      <FeaturedEvents />
      <RecentTributes />
      <CallToAction />
    </>
  );
}