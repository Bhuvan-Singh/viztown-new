import React, { useContext, useEffect } from "react";
import { CommonContext } from "../../../contexts/CommonContextProvider";

// Index Modules
import Navigation from "../../../components/showcase/index/Navigation";
import InfoMap from "../../../components/showcase/index/infomap/InfoMap";

export default function PropertyDetails(props) {
    const { setActiveSlug } = useContext(CommonContext);
    useEffect(() => {
        setActiveSlug(props.slug);
    }, []);
    return (
        <>
            <Navigation slug={`/showcase/${props.slug}`} />
            <InfoMap slug={props.slug} />
        </>
    );
}
