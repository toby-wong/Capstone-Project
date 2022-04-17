import classes from "./Home.module.css";

import { Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateTimePicker from "@mui/lab/DateTimePicker";

// start, end, rating
const Home = () => {
  return (
    <div className={classes.body}>
      <div className={classes["search-container"]}>
        <Typography variant="brandName" className={classes.slogan}>
          Just Park it !
        </Typography>
        <div className={classes.search}>
          <div className={classes["input-container"]}>
            <Typography className={classes["input-label"]}>Location</Typography>
            <input
              className={classes["search-input"]}
              type="text"
              placeholder="Where do you want to go?"
            />
          </div>
          <div className={classes["input-container"]}>
            <Typography
              variant="sectionSubContent"
              className={`${classes["input-label"]} ${classes.datetime}`}
            >
              From
            </Typography>
            <DateTimePicker
              renderInput={(params) => {
                console.log(params);
                return (
                  <TextField
                    {...params}
                    variant="standard"
                    className={classes.text}
                    inputProps={{
                      style: {
                        color: "black",
                        fontSize: "13.5px",
                        margin: 0,
                        marginTop: "15px",
                        marginLeft: "4px",
                        borderRadius: "32px",
                        WebkitBoxShadow: "0 0 0 1000px var(--light) inset",
                      },
                    }}
                  />
                );
              }}
              InputProps={{
                disableUnderline: true,
              }}
              // value={formState.startDateTime.value}
              minDateTime={new Date()}
              onChange={(newDate) => {}}
              shouldDisableTime={(timeValue, clockType) => {
                return clockType === "minutes" && timeValue % 15;
              }}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </div>
          <div className={classes["input-container"]}>
            <Typography
              variant="sectionSubContent"
              className={`${classes["input-label"]} ${classes.datetime}`}
            >
              Until
            </Typography>
            <DateTimePicker
              renderInput={(params) => {
                console.log(params);
                return (
                  <TextField
                    {...params}
                    variant="standard"
                    className={classes.text}
                    inputProps={{
                      style: {
                        color: "black",
                        fontSize: "13.5px",
                        margin: 0,
                        marginTop: "15px",
                        marginLeft: "4px",
                        borderRadius: "32px",
                        WebkitBoxShadow: "0 0 0 1000px var(--light) inset",
                      },
                    }}
                  />
                );
              }}
              InputProps={{
                disableUnderline: true,
              }}
              // value={formState.startDateTime.value}
              minDateTime={new Date()}
              onChange={(newDate) => {}}
              shouldDisableTime={(timeValue, clockType) => {
                return clockType === "minutes" && timeValue % 15;
              }}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
            <Button
              className={classes["search-btn"]}
              variant="contained"
              size="small"
            >
              <SearchIcon className={classes["search-icon"]} />
            </Button>
          </div>
          {/* <div className={classes["input-container"]}>
            <Typography
              variant="sectionSubContent"
              className={classes["input-label"]}
            >
              Until
            </Typography>
            <input
              className={classes["search-input"]}
              type="text"
              placeholder="Where do you want to go?"
            />
            <Button
              className={classes["search-btn"]}
              variant="contained"
              size="small"
            >
              <SearchIcon className={classes["search-icon"]} />
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
