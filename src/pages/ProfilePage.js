import React, { useEffect, useState } from "react";
import { getUserProfile } from "../lib/CustomFunctions";

function ProfilePage({ match }) {
  const [profile, setProfile] = useState();
  const {
    params: { id },
  } = match;

  useEffect(() => {
    getUserProfile(id).then((res) => setProfile(res.data.profile[0]));
  }, [id]);
  return <div>{profile && profile.nickname}</div>;
}

export default ProfilePage;
