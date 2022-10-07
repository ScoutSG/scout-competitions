import React from "react";
import CallToAction from "../components/CallToAction";

// add validation if authenticated go to /home else CTA
const Page: React.FC = () => {
  return (
    <>
      <CallToAction />
    </>
  );
};

export default Page;
