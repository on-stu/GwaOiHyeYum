import React, { useEffect, useState } from "react";
import { getClass } from "../lib/CustomFunctions";

function ClassPage({ match }) {
  const {
    params: { classId },
  } = match;

  const [thisClass, setThisClass] = useState();

  useEffect(() => {
    getClass(classId).then((res) => setThisClass(res.data.thisClass[0]));
  }, [classId]);
  return <>{thisClass && thisClass.classTitle}</>;
}

export default ClassPage;
