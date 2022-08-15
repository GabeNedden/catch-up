import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);
  const [groupsStatus, setGroupsStatus] = useState("loading");

  useEffect(() => {
    fetch(`https://catch-up-api.herokuapp.com/groups`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGroups(res.data);
        setGroupsStatus("loaded");
      })
      .catch((error) => {
        console.log("error:", error);
        setGroupsStatus("error");
      });
  }, []);

  return (
    <GroupContext.Provider
      value={{
        groups,
        groupsStatus,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
