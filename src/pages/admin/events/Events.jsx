import React, { useEffect, useState } from "react";
import {
  Button,
  Calender,
  Container,
  Image,
  Loader,
  Select,
  SubNavBar,
  SubNavChild,
} from "../../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "../../../components/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { roleUsers, userDetails } from "../../../redux/server/server";
import { restore } from "../../../redux/features/roleUsers";

const Events = () => {
  const auth = useSelector((state) => state.auth);
  const { users, user, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const roles = [
    {
      role: "All",
      value: "",
    },
    {
      role: "Employees",
      value: ["employee"],
    },
    {
      role: "Clients",
      value: ["client"],
    },
  ];

  const [selectedUser, setSelectedUser] = useState(auth?.user);
  const [role, setRole] = useState(roles[0]);

  useEffect(() => {
    dispatch(roleUsers(role.value));
    return () => dispatch(restore());
  }, [role.value, pathname]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(userDetails(selectedUser?.id));
    }
  }, [selectedUser]);

  const Templete = (i) => {
    return (
      <div className="flex gap-4 items-center">
        <Image
          className={"w-5 h-5 rounded-sm"}
          src={i?.profile}
          alt={i?.name}
        />
        <div className="flex flex-col">
          <p className="text-sm">{i?.name}</p>
          {/* <p className="text-xs text-slate-400">{i?.role[0]}</p> */}
        </div>
        {i?.name === auth?.user?.name && (
          <span className="px-1 rounded-sm bg-slate-600 text-white text-xs">
            its you
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {auth?.user?.role?.includes("admin") && (
        <SubNavBar>
          <SubNavChild>
            {/* <span className="pr-2">{role.role}:</span> */}
            <Select
              width="250px"
              optionswidth="350px"
              value={selectedUser}
              options={users}
              fields={(i) => i.name}
              onChange={(data) => {
                setSelectedUser(data);
              }}
              search
              optiontemplete={Templete}
              valuetemplete={Templete}
            />
          </SubNavChild>

          <SubNavChild>
            <span className="pr-1">Type:</span>
            <Select
              options={roles}
              onChange={(e) => {
                setRole(e);
              }}
              value={role}
              width="100%"
              optionswidth="120px"
              fields={(i) => i.role}
              className="border-0"
            />
          </SubNavChild>
        </SubNavBar>
      )}

      <div className="p-8">
        {auth?.user?.role?.includes("admin") && (
          <div className="pb-4">
            <Button
              text={"Events"}
              type="button"
              icon={<FaPlus />}
              onClick={() => {
                navigate("/events/create");
              }}
            />
          </div>
        )}

        <Container className="relative w-full h-full">
          {loading && <Loader />}
          <div className="p-8">
            <Calender
              events={user?.events}
              height="600px"
              initialView="dayGridMonth"
              userId={user?.id}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Events;
