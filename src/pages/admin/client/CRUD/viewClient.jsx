import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { userDetails } from "../../../../redux/server/server";
import {
  FaLayerGroup,
  FaCalendar,
  IoMdFemale,
  IoMdMale,
  FaEye,
  FaEyeSlash,
} from "../../../../components/icons";
import { FlConverter } from "../../../../utilities";
import {
  Container,
  Error,
  Image,
  Loader,
  Menu,
  PieChartUsage,
  Row,
} from "../../../../components";

const ViewClient = ({ intialImage }) => {
  const { user, loading, error } = useSelector((state) => state.users);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const date = new Date(user?.date);
  const created = date.toLocaleDateString();

  useEffect(() => {
    dispatch(userDetails(id));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  const getData = (d) => {
    const root = d?.idd?.root ? String(d?.idd?.root) : "+0";
    const suffixes = d?.idd?.suffixes ? String(d?.idd?.suffixes) : "";
    const combined = root + suffixes.slice(0, 2);
    return combined;
  };

  return (
    <div className="grid gap-8 p-6">
      <div className="grid gap-8 sm:grid-cols-3 grid-cols-1">
        <Container>
          <div className="flex p-3 justify-between">
            <Image
              src={user?.profile}
              alt="avatar"
              className="w-20 h-24"
              onError={() => intialImage}
            />

            <div>
              <p className="text-sm font-bold">{FlConverter(user?.name)}</p>
              <p className="text-xs">{user?.jobType}</p>
            </div>

            <Menu>
              <li onClick={() => navigate(`/crm_project/clients/${id}/edit`)}>
                Edit
              </li>
            </Menu>
          </div>
        </Container>

        <Container>
          <div className="flex h-full justify-between items-center p-6">
            <div className="flex h-full flex-col justify-between">
              <h1 className="text-base">Total Projects</h1>
              <p className="text-xl font-bold text-blue-500">
                {user?.projects?.length}
              </p>
            </div>
            <FaLayerGroup size={30} className="text-slate-400" />
          </div>
        </Container>

        <Container>
          <div className="flex h-full justify-between items-center p-6">
            <div className="flex h-full flex-col justify-between">
              <h1 className="text-base">Total Events</h1>
              <p className="text-xl font-bold text-blue-500">
                {user?.events?.length}
              </p>
            </div>
            <FaCalendar size={30} className="text-slate-400" />
          </div>
        </Container>
      </div>

      <div className="grid sm:grid-cols-[1fr_auto] grid-cols-1 gap-8">
        <Container className="flex gap-5 flex-col p-4">
          <p className="font-bold text-xl">Profile Info</p>

          <Row text="Name" data={user?.name} />
          <div className="flex gap-2 items-center">
            <Row text="Password" data={show ? user?.password : "**********"} />
            {show ? (
              <FaEye
                size={20}
                className="text-slate-500 cursor-pointer hover:text-black"
                onClick={() => setShow(false)}
              />
            ) : (
              <FaEyeSlash
                size={20}
                className="text-slate-500 cursor-pointer hover:text-black"
                onClick={() => setShow(true)}
              />
            )}
          </div>
          <Row text="Email" data={user?.email} />
          <Row text="Login Allowed" data={user?.login} />
          <Row
            text="Country"
            data={
              <div className="flex items-center gap-2">
                {user?.country ? (
                  <>
                    <img
                      loading="lazy"
                      className="w-6 h-6"
                      src={user?.country?.flags?.svg}
                      alt={`${user?.country?.name}`}
                    />
                    <span>{user?.country?.name?.common}</span>
                  </>
                ) : (
                  "--"
                )}
              </div>
            }
          />
          <Row
            text="Mobile no"
            data={
              user?.phoneNumber &&
              `${getData(user?.countryCode)} ${user?.phoneNumber}`
            }
          />

          <Row text="Age" data={user?.age} />
          <Row text="Created" data={created} />

          <Row
            text="Gender"
            data={
              <div className="flex gap-2">
                {user?.gender !== "Other" && (
                  <span
                    className={`text-lg ${
                      user?.gender === "Male"
                        ? "text-blue-700"
                        : "text-pink-700"
                    }`}
                  >
                    {user?.gender === "Male" ? <IoMdMale /> : <IoMdFemale />}
                  </span>
                )}
                {FlConverter(user?.gender)}
              </div>
            }
          />
          <Row text="Visits" data={user?.visits} />

          <Row
            text="Status"
            data={
              <p className="flex gap-2 items-center">
                <span
                  className="w-3 h-3 rounded-full block"
                  style={{ backgroundColor: user?.status?.color }}
                ></span>
                {user?.status?.name}
              </p>
            }
          />

          <Row text="Company Name" data={user?.company} />
          <Row text="Office Phone" data={user?.officePhone} />
          <Row text="Address" data={user?.address} />
          <Row
            text="Note"
            data={
              user?.note ? (
                <div dangerouslySetInnerHTML={{ __html: user?.note }} />
              ) : (
                "--"
              )
            }
          />
        </Container>

        <div className="grid gap-8 grid-rows-2">
          <Container>
            <div className="border-b border-slate-300 p-4">
              <h2 className="text-xl font-bold">Projects</h2>
            </div>
            <div className="p-4">
              <PieChartUsage data={user?.projects} label="Project" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
