import React from 'react'
import "./Teacher.css"

export default function Teacher() {
  return (
    <>
      <section>
        <div class="row_teacher">
          <h1>Top Instructor</h1>
        </div>
        <div class="row_teacher">
          {/* <!-- Column_teacher 1--> */}
          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Md Sajedur Rahaman</h3>
              <p>Principal</p>
              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Column_teacher 2--> */}
          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/5466340/pexels-photo-5466340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Gautam Kumar Biswas</h3>
              <p>Depertment Head Computer</p>
              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Column_teacher 3--> */}
          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/12863577/pexels-photo-12863577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Mst Sharmin Sultana</h3>
              <p>Teacher/Computer</p>
              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/4778667/pexels-photo-4778667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Mst Diya Khatun</h3>
              <p>Teacher/Computer</p>
              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/11563212/pexels-photo-11563212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Md Shariful Islam</h3>
              <p>Teacher/Computer</p>
              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="column_teacher">
            <div class="card_teacher">
              <div class="img-container_teacher">
                <img src="https://images.pexels.com/photos/5212682/pexels-photo-5212682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <h3>Mst Tuli Khatun</h3>

              <p>Designer</p>

              <div class="icons">
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <h1 style={{ textAlign: "center" }}>
          {" "}
          <a href="/teachers">See All Teachers</a>
        </h1>
      </section>
    </>
  );
}
