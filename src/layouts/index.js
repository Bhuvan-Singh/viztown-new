import React from "react";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";
import Header from '../components/Header'

const Layout = ({ location, children }) => {
    return (
      <TransitionProvider
        location={location}
        mode="immediate"
      >
        <Header />
        <TransitionViews>
          {children}
        </TransitionViews>
      </TransitionProvider>
    );
  };
  
  export default Layout;