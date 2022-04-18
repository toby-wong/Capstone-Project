import classes from "./Home.module.css";

import * as config from "../../config";
import * as utility from "../../utility";

import { useContext, useReducer, useState } from "react";

import {
  homeSearchFormInitialState,
  homeSearchFormReducer,
} from "../../reducers/home-search-form-reducer";
import AuthContext from "../../contexts/auth-context";

import SearchIcon from "@mui/icons-material/Search";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Button, Divider, Rating, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formState, dispatchFormState] = useReducer(
    homeSearchFormReducer,
    homeSearchFormInitialState()
  );
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const addressChangeHandler = (e) => {
    dispatchFormState({ type: "ADDRESS_INPUT", value: e.target.value });
  };

  const startDateTimeChangeHandler = (newDate) => {
    dispatchFormState({ type: "START_TIME_INPUT", value: newDate });
  };

  const endDateTimeChangeHandler = (newDate) => {
    dispatchFormState({ type: "END_TIME_INPUT", value: newDate });
  };

  const ratingChangeHandler = (e, newRating) => {
    dispatchFormState({ type: "RATING_INPUT", value: newRating });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      address: formState.address.value,
      startDateTime: formState.startDateTime.value,
      endDateTime: formState.endDateTime.value,
      rating: formState.rating,
    };

    authContext.setSearchInfo(formData);

    navigate("/consumer");
  };

  return (
    <div className={classes.body}>
      <div className={classes["search-container"]}>
        <Typography variant="brandName" className={classes.slogan}>
          Just Park It !
        </Typography>
        <form className={classes["search-bar"]} onSubmit={formSubmitHandler}>
          <div className={classes["input-container"]}>
            <Typography className={classes["input-label"]}>Location</Typography>
            <input
              className={classes["search-input"]}
              type="text"
              placeholder="Where do you want to go?"
              value={formState.address.value}
              onChange={addressChangeHandler}
            />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes["input-container"]}>
            <Typography className={`${classes["input-label"]}`}>
              From
            </Typography>
            <DateTimePicker
              renderInput={(params) => {
                return <TextField {...params} variant="standard" />;
              }}
              InputProps={{
                className: `${classes["search-input"]} ${classes.dateTimePicker}`,
                disableUnderline: true,
                readOnly: true,
              }}
              value={formState.startDateTime.value}
              minDateTime={new Date()}
              onChange={startDateTimeChangeHandler}
              shouldDisableTime={(timeValue, clockType) => {
                return clockType === "minutes" && timeValue % 15;
              }}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes["input-container"]}>
            <Typography className={`${classes["input-label"]}`}>
              Until
            </Typography>
            <DateTimePicker
              renderInput={(params) => {
                return <TextField {...params} variant="standard" />;
              }}
              InputProps={{
                className: `${classes["search-input"]} ${classes.dateTimePicker}`,
                disableUnderline: true,
                readOnly: true,
              }}
              value={formState.endDateTime.value}
              minDateTime={new Date()}
              onChange={endDateTimeChangeHandler}
              shouldDisableTime={(timeValue, clockType) => {
                return clockType === "minutes" && timeValue % 15;
              }}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes["input-container"]}>
            <Typography className={`${classes["input-label"]}`}>
              Ratings
            </Typography>
            <Rating
              className={`${classes["search-input"]} ${classes.rating}`}
              name="simple-controlled"
              size="small"
              value={formState.rating}
              onChange={ratingChangeHandler}
            />
            <Button
              className={classes["search-btn"]}
              type="submit"
              variant="contained"
              size="small"
              disabled={!formState.isFormValid}
            >
              <SearchIcon className={classes["search-icon"]} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
