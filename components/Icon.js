import React from "react";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { MdCurtainsClosed } from "react-icons/md";
import { GiTheaterCurtains, GiPlantRoots, GiHomeGarage } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { CiTempHigh } from "react-icons/ci";

function IconOn({ iconType }) {
  switch (iconType) {
    case "lamp":
      return <BsFillLightbulbFill color="#edcf55" />;
    case "curtain":
      return <GiTheaterCurtains />;
    case "plant":
      return <RiPlantFill />;
    case "garage":
      return <GiHomeGarage />;
    case "temprature":
      return <CiTempHigh />;
    default:
      return null;
  }
}

function IconOff({ iconType }) {
  switch (iconType) {
    case "lamp":
      return <BsFillLightbulbOffFill />;
    case "curtain":
      return <MdCurtainsClosed />;
    case "plant":
      return <GiPlantRoots />;
    case "garage":
      return <GiHomeGarage />;
    case "temprature":
      return <CiTempHigh />;
    default:
      return null;
  }
}

export { IconOn, IconOff };
