
import React from 'react'
import "./nav.css"
import logo from "../img/slack.png"
export default function Navbar() {
  return (
    <>
      <nav>
        <div className="jhpi-title">
          <div className="jhpi-logo">
            <img src={logo} alt="" />
          </div>
          <div className="jhpi">
            <span>JHENAIDAH</span> POLYTECHNIC <span>INSTITUTE</span>
          </div>
          <div className="jhpi-logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="logo">JHPI</div>
        <label htmlFor="btn" className="icon">
          <span className="fa fa-bars"></span>
        </label>
        <input className="input" type="checkbox" id="btn" />
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <label htmlFor="btn-1" className="show">
              ADMINISTRATION +
            </label>
            <a href="#">ADMINISTRATION</a>
            <input className="input" type="checkbox" id="btn-1" />
            <ul>
              <li>
                <a href="/teachers">Teachers INFO</a>
              </li>
              <li>
                <a href="/officers">Officers INFO</a>
              </li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-6" className="show">
              ACADEMIC +
            </label>
            <a href="#">ACADEMIC</a>
            <input className="input" type="checkbox" id="btn-6" />
            <ul>
              <li>
                <a href="#">Students</a>
              </li>
              <li>
                <a href="#">Notice</a>
              </li>
              <li>
                <a href="#">Result</a>
              </li>
              <li>
                <a href="#">Class Routine</a>
              </li>
              <li>
                <a href="#">Exam Routine</a>
              </li>
              <li>
                <a href="#">Rate Of Passing</a>
              </li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-2" className="show">
              TEACHERS +
            </label>
            <a href="#"> TEACHERS</a>
            <input className="input" type="checkbox" id="btn-2" />
            <ul>
              {/* <li>
                <a href="#">Home1</a>
              </li>
              <li>
                <a href="#">Home2</a>
              </li> */}
              <li>
                <label htmlFor="btn-10" className="show">
                  Civil +
                </label>
                <a href="#">
                  Civil <span className="fa fa-plus"></span>
                </a>
                <input className="input" type="checkbox" id="btn-10" />
                <ul>
                  <li>
                    <a href="/civil/teachers">Teachers</a>
                  </li>
                  <li>
                    <a href="/civil/students">Students</a>
                  </li>
                </ul>
              </li>
              <li>
                <label htmlFor="btn-11" className="show">
                  Electrical +
                </label>
                <a href="#">
                  Electrical <span className="fa fa-plus"></span>
                </a>
                <input className="input" type="checkbox" id="btn-11" />
                <ul>
                  <li>
                    <a href="/electrical/teachers">Teachers</a>
                  </li>
                  <li>
                    <a href="/electrical/students">Students</a>
                  </li>
                </ul>
              </li>
              <li>
                <label htmlFor="btn-13" className="show">
                  Computer +
                </label>
                <a href="#">
                  Computer <span className="fa fa-plus"></span>
                </a>
                <input className="input" type="checkbox" id="btn-13" />
                <ul>
                  <li>
                    <a href="/computer/teachers">Teachers</a>
                  </li>
                  <li>
                    <a href="/computer/students">Students</a>
                  </li>
                </ul>
              </li>
              <li>
                <label htmlFor="btn-14" className="show">
                  Electronics +
                </label>
                <a href="#">
                  Electronics <span className="fa fa-plus"></span>
                </a>
                <input className="input" type="checkbox" id="btn-14" />
                <ul>
                  <li>
                    <a href="/electronics/teachers">Teachers</a>
                  </li>
                  <li>
                    <a href="/electronics/students">Students</a>
                  </li>
                </ul>
              </li>
              <li>
                <label htmlFor="btn-15" className="show">
                  Environment +
                </label>
                <a href="#">
                  Environment <span className="fa fa-plus"></span>
                </a>
                <input className="input" type="checkbox" id="btn-15" />
                <ul>
                  <li>
                    <a href="/environment/teachers">Teachers</a>
                  </li>
                  <li>
                    <a href="/environment/students">Students</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-4" className="show">
              GALLERY +
            </label>
            <a href="#"> GALLERY</a>
            <input className="input" type="checkbox" id="btn-4" />
            <ul>
              <li>
                <a href="#">Teachers Photos</a>
              </li>
              <li>
                <a href="#">Students Photos</a>
              </li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-5" className="show">
              Our Projects +
            </label>
            <a href="#">Our Projects</a>
            <input className="input" type="checkbox" id="btn-5" />
            <ul>
              <li>
                <a href="#">Civil</a>
              </li>
              <li>
                <a href="#">Electrical</a>
              </li>
              <li>
                <a href="#">Computer</a>
              </li>
              <li>
                <a href="#">Electronics</a>
              </li>
              <li>
                <a href="#">Environment</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/login">SignUp With Us</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
