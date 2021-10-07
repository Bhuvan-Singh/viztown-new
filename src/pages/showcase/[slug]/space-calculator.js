import React, { useContext, useEffect } from "react";
import Navigation from "../../../components/showcase/index/Navigation";
import Calculator from "../../../components/space-calculator/Calculator/Calculator";
import { CommonContext } from "../../../contexts/CommonContextProvider";

export default function SpaceCalculator(props) {
  const { setActiveSlug } = useContext(CommonContext);
  useEffect(() => {
    setActiveSlug(props.slug);
  }, []);
  return (
    <>
      <Navigation slug={`/showcase/${props.slug}`} />
      <Calculator />
    </>
  );
}
