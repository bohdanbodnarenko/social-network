import React from "react";
import "./landing.css";
import { Icon } from "@material-ui/core";
const LandingPage = () => {
  return (
    <div>
      <div className="header">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Social Network</span>
            <span className="heading-primary-sub"> Try it now</span>
          </h1>
          <button className="btn btn-white">Register now</button>
        </div>
      </div>
      <main>
        <section className="section-about">
          <div className="center-text margin-bottom">
            <h2 className="heading-secondary">New modern Social Network</h2>
          </div>
          <div className="row">
            <div>
              <h3 className="heading-tertiary">Be able to share information</h3>
              <p className="paragraph">
                Meet new people and share information with them
              </p>
              <h3 className="heading-tertiary">
                Always keep in touch with you friends
              </h3>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
                vehicula nibh. Phasellus eget augue odio. Nulla suscipit
                sollicitudin metus, sed hendrerit dolor euismod a.
              </p>
            </div>
            <div>
              <div className="composition">
                <img
                  src="https://i.imgur.com/mBdct1D.jpg"
                  alt="Screenshot 1"
                  className="composition_photo "
                />
              </div>
            </div>
          </div>
        </section>
        <section className="features">
          <div className="row">
            <div className="feature-box">
              <Icon style={{ fontSize: "5rem" }} className="feature_icon">
                public
              </Icon>
              <h3 className="heading-tertiary">
                Explore friends over the world
              </h3>
              <p className="feature-">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="feature-box">
              <Icon style={{ fontSize: "5rem" }} className="feature_icon">
                mood
              </Icon>
              <h3 className="heading-tertiary">Have fun with other people</h3>
              <p className="feature-">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="feature-box">
              <Icon style={{ fontSize: "5rem" }} className="feature_icon">
                thumb_up_alt
              </Icon>
              <h3 className="heading-tertiary">Everybody loves us</h3>
              <p className="feature-">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="feature-box">
              <Icon style={{ fontSize: "5rem" }} className="feature_icon ">
                poll
              </Icon>
              <h3 className="heading-tertiary">Fast growing social network</h3>
              <p className="feature-">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
          </div>
        </section>
        <section className="registration-section">
          <h2 className="heading-secondary">Register now</h2>
          <div className="row">
            <div className="register" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
