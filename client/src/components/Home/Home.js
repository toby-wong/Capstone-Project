import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.body}>
      <FormGroup row>
        <StyledTextField variant="outlined" placeholder="username" />
        <StyledButton variant="contained" disableElevation>
          @example.com
        </StyledButton>
      </FormGroup>
    </div>
  );
};

export default Home;
