import React from 'react'

import "./about.css"
import p3 from "./img/c1.png";
import I1 from "./img/c2.png";
import F1 from "./img/c3.png";
import C3 from "./img/c4.png";
import Fi1 from "./img/c6.png";
import Delivery from "./img/delivery.png";

import Footer from '../../ALL__Hero/components/Footer/Footer';

export default function About() {
   const heroData = [
     {
       id: 1,
       name: "EVENTS",
       decp: "Chocolate & vanilla",
       price: "5.25",
       imageSrc:
         "https://images.pexels.com/photos/3761504/pexels-photo-3761504.jpeg?auto=compress&cs=tinysrgb&w=600",
     },
     {
       id: 2,
       name: "TEACHERS",
       decp: "Fresh Strawberries",
       price: "10.25",
       imageSrc:
         "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=600",
     },
     {
       id: 3,
       name: "PROJECTS",
       decp: "Mixed Kebab Plate",
       price: "8.25",
       imageSrc:
         "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=600",
     },
     {
       id: 4,
       name: "STUDENTS",
       decp: "Mixed Fish Kebab",
       price: "5.25",
       imageSrc:
         "https://images.pexels.com/photos/3775128/pexels-photo-3775128.jpeg?auto=compress&cs=tinysrgb&w=600",
     },
   ];
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6" id="home">
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <a href="/" className="text-base text-orange-500 font-semibold">
              COME TO JHPI
            </a>

            <div className="w-12 h-15 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                className="w-full h-full object-contain"
                alt="delivery"
              />
            </div>
          </div>

          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Best Institute in
            <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span>
          </p>

         

          <button
            type="button"
            className="text-lg bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Admission Now
          </button>
        </div>
        <div className="py-2 flex-1 flex items-center relative pb-8">
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-2 flex-wrap">
            {heroData &&
              heroData.map((n) => (
                <div
                  key={n.id}
                  className="  lg:w-80  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={n.imageSrc}
                    className="w-80 lg:w-40 -mt-10 lg:-mt-20 "
                    alt="I1"
                  />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {n.name}
                  </p>

                  <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                    {n.decp}
                  </p>

                </div>
              ))}
          </div>
        </div>
      </section>
      <div class="about">
        {/* <Top title="About Our Institute" /> */}

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          About Our
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]"> Institute</span>
        </p>
        <div className="contents mt-6">
          <h3 className="font-bold">
            About Jhenaidah Polytechnic Institute (30023)Jhenaidah Polytechnic Institute
          </h3>
          <p className="text-[1rem] lg:text-[2.5rem] font-normal tracking-wide text-headingColor">
            About Jhenaidah Polytechnic Institute (30023)Jhenaidah Polytechnic Institute
            <div class="image-section">
              <img src="https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=600" />
            </div>{" "}
            is situated on the eastern outskirts of the district town of Jhenaidah
            District. The institute is near the Jhenaidah Bus Terminal and on the north
            side on the way to Jhenaidah-Dhaka Highway. This is one of the 49 government
            polytechnic institutes in Bangladesh. The institute is on 2 acres of land
            opposite to the BSCIC, Jhenaidah. This institute has a five-storied Academic
            Building, a five-storied Administrative Building, two-storied Workshop
            Buildings. There are also two residential buildings in the campus; one is for
            Principal and the other two-storied building is for the staffs. The large
            buildings, clean campus and scenic beauty of this institute grab the attention
            of the visitors and passersby. The institute is providing 4 years
            Diploma-in-Engineering under the regulation of Bangladesh Technical Education
            Board (BTEB) in 5 technologies. The technologies are Civil, Computer,
            Electronics, Environmental and Electrical. This institute started its journey
            in 2004 with only Computer Technology. The other 4 technologies have been
            added to the institute latter. At present the institute has nearly 2000
            students and more than 70 teachers and staffs. The institute is relentlessly
            working to implement government’s vision-2030 to keep pace with the
            Sustainable Development Goals (SDGs) set by United Nations (UN). As a
            technical institute, the institute mainly focuses on the practical learning.
            The institute carefully and sincerely nurtures the young talents giving them
            opportunities to acquire practical skills. Many of the youths of this
            institute have shown and constantly showing their great skills by taking part
            in regional and national innovation competitions and science fairs. Some
            innovations like Smart Agro Robot, Automatic House-cleaning Robot and Life
            Saver Robot have got special local and national recognition and hailed by many
            scholars and experts. A number of TV channels have broadcast news on these
            issues. Many local and national dailies publish news about the innovative
            works of the students of this institute at regular intervals. Apart from
            technical work, the students of this institute often participate in various
            extra-curricular activities. They enjoy great facilities to show their
            creative abilities in arts, culture and sports. The institute arranges Annual
            Sports Week in February every year and publish Annual Magazine (Naboganga) in
            January every year. Students of this institute are highly encouraged to take
            part in the cultural programs and other extra-curricular activities. A team of
            self-driven teachers help and guide the students to perform best in the events
            and programs.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
