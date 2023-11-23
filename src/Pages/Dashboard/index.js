import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import {
  useAuthDispatch,
  logout,
  editSeatNo,
  useAuthState,
} from "../../Context";

function Dashboard(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const [open, setOpen] = useState(false);
  const [setupForm, setSetupForm] = useState({});
  const [userList, setUserList] = useState(userDetails.userList);
  const [filterText, setFilterText] = useState("");

  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (filterText === "") return;
    setUserList(() =>
      userList.filter((item) =>
        item.fullName.toLowerCase().match(filterText.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [filterText]);

  function handleChange(event) {
    setFilterText(event);
    if (!event.lengtn > 0) {
      setUserList(userDetails.userList);
    }
  }

  const getData = () => {
    if (sortColumn && sortType) {
      return userList
        .filter((item) =>
          item.fullName.toLowerCase().match(filterText.toLowerCase())
        )
        ?.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        });
    }
    return userList;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleOpen = (rowData) => {
    setSetupForm({
      ...setupForm,
      id: rowData.id || "",
      fullName: rowData.fullName || "",
      phoneNumber: rowData.phoneNumber || "",
      seatNo: rowData.seatNo || "",
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleUpdateSeatNo = (id, seatNo) => {
    const updateIndex = userList.findIndex((e) => e.id === id);
    if (userList[updateIndex]) {
      userList[updateIndex].seatNo = seatNo;
      editSeatNo(dispatch, userDetails);
    }
    handleClose();
  };

  const { Column, HeaderCell, Cell } = Table;
  const handleLogout = () => {
    logout(dispatch);
    props.history.push(userDetails.userType === "admin" ? "/admin" : "/");
  };

  return (
    <div className="p-1">
      <div className={"flex w-full justify-between"}>
        {userDetails.userType === "admin" ? (
          <p>
            <b>Admin:</b> {userDetails.username}
          </p>
        ) : (
          <p>
            <b>Welcome</b> {userDetails.username} <b>| Your Seat No. :</b>{" "}
            {userList.find((e) => e.id === userDetails.id)?.seatNo || "TDB"}
          </p>
        )}
        <Button
          className={"h-8 w-24"}
          color="red"
          appearance="ghost"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <h1>
        <b>
          Guest list | Number of seats remaining ( {userList.length}/
          {userDetails.guestLimit})
        </b>
      </h1>
      <InputGroup className="w-80">
        <Input
          size="md"
          placeholder="Search..."
          maxLength={100}
          id="filterText"
          value={filterText}
          onChange={handleChange}
          disabled={loading}
        />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
      <Table
        height={500}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
      >
        <Column width={150} sortable>
          <HeaderCell>Full Name</HeaderCell>
          <Cell dataKey="fullName" />
        </Column>
        {userDetails.userType === "admin" && (
          <Column width={150} sortable>
            <HeaderCell>Phone number</HeaderCell>
            <Cell dataKey="phoneNumber" />
          </Column>
        )}
        {userDetails.userType === "admin" && (
          <Column width={100} sortable>
            <HeaderCell>Seat No.</HeaderCell>
            <Cell dataKey="seatNo">
              {(rowData) => (rowData.seatNo ? rowData.seatNo : "TBD")}
            </Cell>
          </Column>
        )}
        {userDetails.userType === "admin" && (
          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>
            <Cell>
              {(rowData) => (
                <Button className="p-0" appearance="link" onClick={() => handleOpen(rowData)}>
                  Edit
                </Button>
              )}
            </Cell>
          </Column>
        )}
      </Table>
      <Modal backdrop={true} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-3xl font-bold">
            Set user seat No.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-3">
          <p className="m-0">
            <b>Full name:</b> {setupForm.fullName || "-"}
          </p>
          <p className="m-0">
            <b>Phone number:</b> {setupForm.phoneNumber || "-"}
          </p>
          <div>
            <label htmlFor="seatNo">Seat No.</label>
            <Input
              className="w-24"
              size="md"
              placeholder=""
              maxLength={10}
              id="seatNo"
              value={setupForm.seatNo || ""}
              onChange={(e) => setSetupForm({ ...setupForm, seatNo: e })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleUpdateSeatNo(setupForm.id, setupForm.seatNo)}
            appearance="ghost"
          >
            SET
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
