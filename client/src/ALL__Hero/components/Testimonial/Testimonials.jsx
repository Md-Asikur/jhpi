// import React from "react";
// import "./testimonial.css";
// import { Container, Row, Col } from "reactstrap";
// import Slider from "react-slick";

// import img from "../../assests/images/testimonial01.png";

// const Testimonials = () => {
//   const settings = {
//     infinite: true,
//     dots: true,
//     speed: 500,
//     slidesToShow: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     slidesToScroll: 1,
//   };
//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="10" md="12" className="m-auto">
//             <div className="testimonial__wrapper d-flex justify-content-between align-items-center ">
//               <div className="testimonial__img w-50 sm-w-100">
//                 <img src={img} alt="" className="w-100" />
//               </div>

//               <div className="testimonial__content w-50 sm-w-100">
//                 <h2 className="mb-4">Our Students Voice</h2>

//                 <Slider {...settings}>
//                   <div>
//                     <div className="single__testimonial">
//                       <h6 className="mb-3 fw-bold">
//                         Excellent course of materials
//                       </h6>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Facilis saepe id voluptas molestiae. Aperiam corrupti
//                         voluptas earum at molestiae neque!
//                       </p>

//                       <div className="student__info mt-4">
//                         <h6 className="fw-bold">Jhon Doe</h6>
//                         <p>California, United State</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="single__testimonial">
//                       <h6 className="mb-3 fw-bold">
//                         Excellent course of materials
//                       </h6>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Facilis saepe id voluptas molestiae. Aperiam corrupti
//                         voluptas earum at molestiae neque!
//                       </p>

//                       <div className="student__info mt-4">
//                         <h6 className="fw-bold">Jhon Doe</h6>
//                         <p>California, United State</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="single__testimonial">
//                       <h6 className="mb-3 fw-bold">
//                         Excellent course of materials
//                       </h6>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Facilis saepe id voluptas molestiae. Aperiam corrupti
//                         voluptas earum at molestiae neque!
//                       </p>

//                       <div className="student__info mt-4">
//                         <h6 className="fw-bold">Jhon Doe</h6>
//                         <p>California, United State</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Testimonials;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonial.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "green", fontSize: "25px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "green", fontSize: "25px" }} />
    </div>
  );
};
const Testimonial = () => {
  return (
    <div
      className="testimonial"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
        marginBottom: 50,
      }}
    >
      <div style={{ width: "90%", textAlign: "center" }}>
        <h1 style={{ marginBottom: 20 }}>TESTIMONIALS</h1>
        <h1 style={{ marginBottom: 20 }}>What Our Student Say!</h1>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          <Card img="https://www.tutorialrepublic.com/examples/images/clients/1.jpg" />
          <Card img="https://www.tutorialrepublic.com/examples/images/clients/2.jpg" />
          <Card img="https://www.tutorialrepublic.com/examples/images/clients/3.jpg" />
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ img }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 100,
          height: 100,
          border: "1px solid lightgray",
          padding: 7,
          marginBottom: 10,
        }}
      />
      <p style={{margin:"0px",padding:"0px"}}>
       There All Teacher is very good teaching,I learn more for him
        
        
      </p>
      <p style={{ fontStyle: "italic", marginTop: 25 }}>
        <span style={{ fontWeight: 500, color: "green" }}>MD ASIKUR</span> AUTHOR
      </p>
    </div>
  );
};

export default Testimonial;