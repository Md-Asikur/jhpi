import React from 'react'
import "./card.css"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function Card() {
  return (
    <>
      <div>
       
        <div className="wrappers">
          <div className="img-area">
            <div className="inner-area">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="icon arrow">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="icon dots">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="name">TEACHER</div>
          <div className="about">Designer & Developer</div>
          <div className="social-icons">
            <a href="#" className="fb">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="insta">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="yt">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <div className="buttons">
            <button>Message Me</button>
            <button>About Me</button>
          </div>
          <div className="social-share">
            <div className="row">
              <i className="far fa-heart"></i>
              <i className="icon-2 fas fa-heart"></i>
              <span>20.4k</span>
            </div>
            <div className="row">
              <i className="far fa-comment"></i>
              <i className="icon-2 fas fa-comment"></i>
              <span>14.3k</span>
            </div>
            <div className="row">
              <i className="fas fa-share"></i>
              <span>12.8k</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="wrappers">
          <div className="img-area">
            <div className="inner-area">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="icon arrow">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="icon dots">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="name">TEACHER</div>
          <div className="about">Designer & Developer</div>
          <div className="social-icons">
            <a href="#" className="fb">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="insta">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="yt">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <div className="buttons">
            <button>Message Me</button>
            <button>About Me</button>
          </div>
          <div className="social-share">
            <div className="row">
              <i className="far fa-heart"></i>
              <i className="icon-2 fas fa-heart"></i>
              <span>20.4k</span>
            </div>
            <div className="row">
              <i className="far fa-comment"></i>
              <i className="icon-2 fas fa-comment"></i>
              <span>14.3k</span>
            </div>
            <div className="row">
              <i className="fas fa-share"></i>
              <span>12.8k</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="wrappers">
          <div className="img-area">
            <div className="inner-area">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="icon arrow">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="icon dots">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="name">TEACHER</div>
          <div className="about">Designer & Developer</div>
          <div className="social-icons">
            <a href="#" className="fb">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="insta">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="yt">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <div className="buttons">
            <button>Message Me</button>
            <button>About Me</button>
          </div>
          <div className="social-share">
            <div className="row">
              <i className="far fa-heart"></i>
              <i className="icon-2 fas fa-heart"></i>
              <span>20.4k</span>
            </div>
            <div className="row">
              <i className="far fa-comment"></i>
              <i className="icon-2 fas fa-comment"></i>
              <span>14.3k</span>
            </div>
            <div className="row">
              <i className="fas fa-share"></i>
              <span>12.8k</span>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button>
          <a href="#">
            Our All Teachers
            <ArrowForwardIcon />
          </a>
        </button>
      </div>
    </>
  );
}
