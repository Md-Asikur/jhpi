// import BottomNav from '../components/BottomNav';
// import NavBar from '../components/NavBar';
// import Login from '../components/user/Login';

// const Home = () => {
//   return (
//     <>
//       <Login />
//       <NavBar />
//       <BottomNav />
//     </>
//   );
// };

// export default Home;
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./home.css";
import p1 from "../components1/img/3.jpg";
import p2 from "../components1/img/2.jpg";
import p3 from "../components1/img/1.jpg";
import Card from "../components1/Cards/Card";
import ArrowForward from "@mui/icons-material/ArrowForward";
import MainPortfolio from "../components1/portfolio page/MainPortfolio";

import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";
import Login from "../components/user/Login";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Login />
      <NavBar />
    
      <BottomNav />
      {/* <div className="home-main">
        <div className="home-text">
          <h3>THE BEST INSTITUTE IN THIS STATE</h3>
          <h1>JHENAIDAH POLYTECHNIC INSTITUTE</h1>
        </div>
        <div className="home-btn">
          <button type="">TAKE A TOUR</button>
        </div>
  </div>*/}

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={p3} alt="First slide" />
          <Carousel.Caption>
            <h3>THE BEST INSTITUTE IN THIS STATE</h3>
            <h1>JHENAIDAH POLYTECHNIC INSTITUTE</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" src={p1} alt="Second slide" />

          <Carousel.Caption>
            <h3>HOLIDAYS</h3>
            <h1>TEACHER'S DAY</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={p2} alt="Third slide" />

          <Carousel.Caption>
            <h3>THE BEST INSTITUTE IN THIS STATE</h3>
            <h1>JHENAIDAH POLYTECHNIC INSTITUTE</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" src={p1} alt="Third slide" />

          <Carousel.Caption>
            <h3>THE BEST INSTITUTE IN THIS STATE</h3>
            <h1>JHENAIDAH POLYTECHNIC INSTITUTE</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={p2} alt="Third slide" />

          <Carousel.Caption>
            <h3>THE BEST INSTITUTE IN THIS STATE</h3>
            <h1>JHENAIDAH POLYTECHNIC INSTITUTE</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="about-main">
        <Card />
      </div>
      <div class="section">
        <div class="container">
          <div class="content-section">
            <div class="title">
              <h1>About Our College</h1>
            </div>
            <div class="content">
              <h3>
                About Jhenaidah Polytechnic Institute (30023)Jhenaidah Polytechnic
                Institute
              </h3>
              <p>
                About Jhenaidah Polytechnic Institute (30023)Jhenaidah Polytechnic
                Institute is situated on the eastern outskirts of the district town of
                Jhenaidah District. The institute is near the Jhenaidah Bus Terminal and
                on the north side on the way to Jhenaidah-Dhaka Highway. This is one of
                the 49 government polytechnic institutes in Bangladesh. The institute is
                on 2 acres of land opposite to the BSCIC, Jhenaidah.{" "}
                <a href="#">
                  Learn More
                  <ArrowForward />
                </a>
              </p>
            </div>
            <div class="social">
              <a href="">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div class="image-section">
            <img src={p3} />
          </div>
        </div>
      </div>

      <div className="portfolio">
        <h1>Our Projects</h1>
        <MainPortfolio />
      </div>
      <div className="contact">
        <h1
          style={{
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "-70px",
            fontSize: "50px",
          }}
        >
          Contact Us
        </h1>
        {/* <LoginSignUp /> */}
      </div>
    </>
  );
}
