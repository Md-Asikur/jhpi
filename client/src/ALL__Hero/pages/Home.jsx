import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";
import CompanySection from "../components/Company-section/Company";

import AboutUs from "../components/About-us/AboutUs";
import Courses from "../components/Courses-section/Courses";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import FreeCourse from "../components/Free-course-section/FreeCourse";

import Testimonials from "../components/Testimonial/Testimonials";

import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import Teacher from "../components/Teacher/Teacher";
import Timer from "../timer--sec/timer";
import Events from "../EVENTS/Events";
import Eventsa from "../EVENTS/Events";
import MultiActionAreaCard from "../EVENTS/Events";
import Carousel from "../../Effect/components/sections/Carousel";
import Roadmap from "../../Effect/components/sections/Roadmap";
import ShowCase from "../../Effect/components/sections/ShowCase";
import Team from "../../Effect/components/sections/Team";

const HomeHero = () => {
  return (
    <Fragment>
      {/* <Header /> */}
      <HeroSection />
      {/* <Carousel /> */}
      <Roadmap />
      <ShowCase />
      <Team/>
      <CompanySection />
      {/* <AboutUs /> */}
      <Courses />
      {/* <ChooseUs /> */}
      {/* <Teacher /> */}
      <Timer />
      <MultiActionAreaCard/>
      {/* <Features /> */}
      <FreeCourse />
      <Testimonials />
      {/*<Newsletter /> */}
      <Footer />
    </Fragment>
  );
};

export default HomeHero;
