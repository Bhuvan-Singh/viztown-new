import React, { useContext, useEffect } from "react";
// Index Modules
import Navigation from "../../../../components/showcase/index/Navigation";
import Render3DView from "../../../../components/showcase/index/fitout-interior/3d-renders/Render3DView";
import { CommonContext } from "../../../../contexts/CommonContextProvider";

export default function ThreedRenders(props) {
  const { setActiveSlug } = useContext(CommonContext);
  useEffect(() => {
    setActiveSlug(props.slug);
  }, []);
  return (
    <>
      <Navigation slug={`/showcase/${props.slug}`} />
      <Render3DView slug={props.slug} />
    </>
  );
}
