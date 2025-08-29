import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }

  const initialErrorState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
};

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(employeeData);
    setErrors(validation);
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      password: true,
      phone: true,
    });

    if (hasErrors(validation)) return;

    dispatch(createEmployee(employeeData, setOpen));
    setEmployeeData(initialEmployeeState)

    setErrors(initialErrorState);
    setTouched({});
  };

  const handleChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value, }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    const next = { ...errors };
    const check = validate({ ...employeeData, [field]: value });
    next[field] = check[field];
    setErrors(next);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeData(initialEmployeeState)

    setErrors(initialErrorState);
    setTouched({});
  };

//////////////////////////////////////// VALIDAYIONS /////////////////////////////////////
  const validate = (values) => {
    const e = { ...initialErrorState };
    if (!values.firstName.trim()) e.firstName = "First name is required.";
    if (!values.lastName.trim()) e.lastName = "Last name is required.";
    if (!values.username.trim()) e.username = "Username is required.";
    if (!values.password.trim()) e.password = "Password is required.";
    if (!values.phone.toString().trim()) e.phone = "Phone is required.";

    return e;
  };

  const hasErrors = (e) => Object.values(e).some((msg) => msg);

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Employee</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Employee Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    required
                    size="small"
                    fullWidth
                    value={employeeData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName ? errors.firstName : " "}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                    onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName ? errors.lastName : " "}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    required
                    onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                    error={touched.username && !!errors.username}
                    helperText={touched.username ? errors.username : " "}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={employeeData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-4">
                  <TextField
                    type="password"
                    value={employeeData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    size="small"
                    fullWidth
                    required
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    error={touched.password && !!errors.password}
                    helperText={touched.password ? errors.password : " "}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    value={employeeData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    required
                    onBlur={() => setTouched((t) => ({ ...t, pasphonesword: true }))}
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone ? errors.phone : " "}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateUser;
