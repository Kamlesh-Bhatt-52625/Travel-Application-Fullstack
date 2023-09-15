import React, { useState } from "react";
import classes from "./about.module.css";
import img1 from "../../assets/img1.jpg";
import { GiPalmTree } from "react-icons/gi";
import { BiHappy } from "react-icons/bi";
import { FaUmbrellaBeach } from "react-icons/fa";

const About = () => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endData, setEndDate] = useState("");

  const handleSearch = () => {};

  return (
    <section id="about">
      <div className={classes.wrapper}>
        <div className={classes.imgWrapper}>
          <img src={img1} alt="" />
        </div>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Your dream vacation awaits you</h5>
          <h2 className={classes.title}>
            Book now for <span>20% off</span>
          </h2>
        </div>
        <div className={classes.inputsContainer}>
          <div className={classes.inputContainer}>
            <span>
              Type <GiPalmTree className={classes.icon} />
            </span>
            <select onChange={(e) => setType(e.target.value)}>
              <option disabled>Select type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="bungalow">Bungalow</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <span>
              First day <BiHappy className={classes.icon} />
            </span>
            <input
              type="text"
              placeholder="Type date...."
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={classes.inputContainer}>
            <span>
              Last day <FaUmbrellaBeach className={classes.icon} />
            </span>
            <input
              type="text"
              placeholder="Type date...."
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button onClick={handleSearch} className={classes.bookBtn}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
