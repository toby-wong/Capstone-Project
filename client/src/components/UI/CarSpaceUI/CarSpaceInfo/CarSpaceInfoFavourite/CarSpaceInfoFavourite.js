import classes from "./CarSpaceInfoFavourite.module.css";

import { useContext } from "react";
import AuthContext from "../../../../../contexts/auth-context";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Icon, Typography } from "@mui/material";

import * as config from "../../../../../config";
import * as utility from "../../../../../utility";

const CarSpaceInfoFavourite = ({ modalContext, setIsLoading, setError }) => {
  const authContext = useContext(AuthContext);

  const clickFavouriteHandler = async () => {
    try {
      const authToken = localStorage.getItem("parkItAuthToken");
      let url = `${config.SERVER_URL}/api/consumer/favourite`;
      let options = {
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      };
      let response;
      if (modalContext.favourite.value) {
        url += `/${modalContext.favourite.id}`;
        options.method = "DELETE";
      } else {
        options.method = "POST";
        options.body = {
          consumer: authContext.userInfo.pk,
          parkingSpace: modalContext.carSpaceId,
        };
      }

      response = await utility.sendRequest(url, options, setIsLoading);
      if (response.status >= 300 || !response.status) throw Error;

      if (!modalContext.favourite.value) {
        const favouriteId = response.data.pk;
        modalContext.setFavourite({
          id: favouriteId,
          value: !modalContext.favourite.value,
        });
      } else {
        modalContext.setFavourite({
          id: null,
          value: !modalContext.favourite.value,
        });
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className={classes.favourite} onClick={clickFavouriteHandler}>
      {modalContext.favourite.value ? (
        <Icon
          color="warning"
          variant="modalSubIcon"
          fontSize="medium"
          component={FavoriteIcon}
        />
      ) : (
        <Icon
          color="warning"
          variant="modalSubIcon"
          fontSize="medium"
          component={FavoriteBorderIcon}
        />
      )}
      <Typography variant="carSpaceModalSubContent" className={classes.content}>
        Favourite
      </Typography>
    </div>
  );
};

export default CarSpaceInfoFavourite;
