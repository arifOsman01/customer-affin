import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import {
  getAllCustomer,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./services";
import { Paper, Button, Dialog, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const App = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const [openDialog, setOpenDialog] = useState(null);
  useEffect(() => {
    getAllCustomer().then((res) => setList(res));
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const tempData = data;
    tempData[input.name] = input.value;
    setData({ ...tempData });
  };

  const dialogRenderer = {
    view: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div>Customer Detail</div>
        <TextField
          margin={"normal"}
          disabled
          label="First Name"
          value={data.firstName || ""}
          name="firstName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          disabled
          label="Last Name"
          value={data.lastName || ""}
          name="lastName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          disabled
          label="Age"
          value={data.age || ""}
          name="age"
          onChange={handleChange}
        />
      </div>
    ),
    add: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div>Add Customer</div>
        <TextField
          margin={"normal"}
          label="First Name"
          value={data.firstName || ""}
          name="firstName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          label="Last Name"
          value={data.lastName || ""}
          name="lastName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          label="Age"
          value={data.age || ""}
          name="age"
          onChange={handleChange}
        />
        <Button onClick={() => onAddCustomer()}>ADD</Button>
      </div>
    ),
    update: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div>Update Customer</div>
        <TextField
          margin={"normal"}
          label="First Name"
          value={data.firstName || ""}
          name="firstName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          label="Last Name"
          value={data.lastName || ""}
          name="lastName"
          onChange={handleChange}
        />
        <TextField
          margin={"normal"}
          label="Age"
          value={data.age || ""}
          name="age"
          onChange={handleChange}
        />
        <Button onClick={() => onUpdateCustomer()}>UPDATE</Button>
      </div>
    ),
  };
  const onAddCustomer = () => {
    addCustomer(data)
      .then((res) => {
        getAllCustomer().then((res) => setList(res));
      })
      .finally(() => {
        setData({});
        setOpenDialog(null);
      });
  };

  const onUpdateCustomer = () => {
    updateCustomer(data)
      .then((res) => {
        getAllCustomer().then((res) => setList(res));
      })
      .finally(() => {
        setData({});
        setOpenDialog(null);
      });
  };

  const onDeleteCustomer = (data) => {
    deleteCustomer(data).then((res) => {
      getAllCustomer().then((res) => setList(res));
    });
  };

  console.log("data", data);
  return (
    <div className="App">
      <header className="App-header">
        Customer List
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {list.map((item, idx) => (
            <Paper key={idx} style={{ padding: 10, width: 300, margin: 5 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => {
                    setData(item);
                    setOpenDialog("view");
                  }}
                  style={{ cursor: "pointer" }}
                >{`${item.firstName} ${item.lastName}`}</div>
                <div>
                  <Button
                    onClick={() => {
                      setData(item);
                      setOpenDialog("update");
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button onClick={() => onDeleteCustomer(item)}>
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            </Paper>
          ))}
        </div>
        <Button onClick={() => setOpenDialog("add")}>Add Customer</Button>
      </header>
      <Dialog
        open={openDialog ? true : false}
        onClose={() => {
          setData({});
          setOpenDialog(null);
        }}
      >
        {dialogRenderer[openDialog]}
      </Dialog>
    </div>
  );
};

export default App;
