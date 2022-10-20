import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Invite {
  code: string;
  name: string;
}

const JoinPage = () => {
  // call to join on mount
  useEffect(() => {
    // create application
    // approve application
  }, []);

  return <div>Test</div>;
};

export default JoinPage;
