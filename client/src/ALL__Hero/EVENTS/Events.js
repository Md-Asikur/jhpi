import * as React from "react";
import "./ev.css"
import img1 from "../assests/images/hero-img1.png"
import img2 from "../assests/images/seo.png";
import img3 from "../assests/images/hero-img1.png";
import img4 from "../assests/images/ui-ux.png";
export default function MultiActionAreaCard() {
  return (
    <>
      <div class="wrapper">
        <div class="services">
          <a href="#">
            <span class="single-img img-one">
              <span class="img-text">
                <h4>Canon 9587</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
          <a href="#">
            <span class="single-img img-two">
              <span class="img-text">
                <h4>Independece Day!</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
          <a href="#">
            <span class="single-img img-three">
              <span class="img-text">
                <h4>Independece Day!</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
        </div>
      </div>{" "}
      <div class="wrapper">
        <div class="services">
          <a href="#">
            <span class="single-img img-one">
              <span class="img-text">
                <h4>Canon 9587</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
          <a href="#">
            <span class="single-img img-two">
              <span class="img-text">
                <h4>Independece Day!</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
          <a href="#">
            <span class="single-img img-three">
              <span class="img-text">
                <h4>Independece Day!</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam.
                </p>
                <button>View More</button>
              </span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
