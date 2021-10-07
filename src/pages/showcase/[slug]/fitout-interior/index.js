import React, { useContext, useEffect } from "react";
import { Link, navigate } from "gatsby";
// Index Modules
import Navigation from "../../../../components/showcase/index/Navigation";
import FitoutInteriorView from "../../../../components/showcase/index/fitout-interior/FitoutInteriorView";
import { CommonContext } from "../../../../contexts/CommonContextProvider";

export default function FitoutInterior(props) {
  const { fitoutMenuStatus, activeSlug, setActiveSlug } =
    useContext(CommonContext);
  useEffect(() => {
    setActiveSlug(props.slug);
  }, []);

  useEffect(() => {
    if (fitoutMenuStatus !== null) {
      console.log(fitoutMenuStatus);
      if (fitoutMenuStatus.layout === 0) {
        navigate(`/showcase/${props.slug}/fitout-interior/3d-renders`);
      }
    }
  }, [fitoutMenuStatus]);
  return (
    <>
      <Navigation slug={`/showcase/${props.slug}`} />
      <FitoutInteriorView slug={props.slug} />
    </>
  );
}
