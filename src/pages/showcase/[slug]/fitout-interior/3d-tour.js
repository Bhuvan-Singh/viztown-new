import React, { useContext, useEffect } from "react";
import Navigation from "../../../../components/showcase/index/Navigation";
import Tour3DView from "../../../../components/showcase/index/fitout-interior/3d-tours/Tour3DView";
import { CommonContext } from "../../../../contexts/CommonContextProvider";

export default function ThreedTour(props) {
  const { setActiveSlug } = useContext(CommonContext);
  useEffect(() => {
    setActiveSlug(props.slug);
  }, []);
  return (
    <>
      <Navigation slug={`/showcase/${props.slug}`} />
      <Tour3DView slug={props.slug} />
    </>
  );
}
