import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [groups, setGroups] = useState(null);
  const [groupsStatus, setGroupsStatus] = useState("loading");
  const [myGroups, setMyGroups] = useState(null);

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
        if (res.data && currentUser) {
          let temp = res.data.filter((group) => {
            return group.members.some((el) => el.id === currentUser._id);
          });
          setMyGroups(temp);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        setGroupsStatus("error");
      });
  }, [currentUser]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        groupsStatus,
        setGroupsStatus,
        myGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
