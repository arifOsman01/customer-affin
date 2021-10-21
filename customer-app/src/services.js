import axios from "axios";

const getAllCustomer = () => {
  return axios
    .get("http://localhost:9000/custAPI/api/customers")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const getCustomer = (data) => {
  return axios
    .get(`http://localhost:9000/custAPI/api/customers/${data.id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const addCustomer = (data) => {
  return axios
    .post("http://localhost:9000/custAPI/api/customers", data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const updateCustomer = (data) => {
  return axios.put(
    `http://localhost:9000/custAPI/api/customers/${data.id}`,
    data
  );
};

const deleteCustomer = (data) => {
  return axios.delete(`http://localhost:9000/custAPI/api/customers/${data.id}`);
};

export {
  getAllCustomer,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
