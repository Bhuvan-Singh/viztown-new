import React, { useContext, useEffect } from "react";
import Navigation from "../../../components/showcase/index/Navigation";
import ActualSiteView from "../../../components/showcase/index/actualsite/ActualSite";

import { CommonContext } from "../../../contexts/CommonContextProvider";

export default function ActualSite(props) {
  const { setActiveSlug } = useContext(CommonContext);
  useEffect(()=>{
    setActiveSlug(props.slug)
  },[])
  return (
    <>
      <Navigation slug={`/showcase/${props.slug}`} />
      <ActualSiteView slug={props.slug} />
    </>
  );
}
