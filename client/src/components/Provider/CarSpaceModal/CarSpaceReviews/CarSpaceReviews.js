import classes from "./CarSpaceReviews.module.css";

import { useContext, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";
import CarSpaceModalContext from "../../../../contexts/carspace-modal-context";

const CarSpaceReviews = ({ onClose, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const carSpaceModalContext = useContext(CarSpaceModalContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cols = [
    { field: "consumer", headerName: "Consumer", width: 150 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "comment", headerName: "Review", flex: 1 },
    { field: "publishDate", headerName: "Date", width: 180 },
  ];

  const changePageHandler = (newPage) => {
    setPage(newPage);
  };
  const changeRowsPerPageHandler = (e) => {
    setRowsPerPage(e);
    setPage(0);
  };

  const backToCarSpaceInfoHandler = () => {
    carSpaceModalContext.openPage("/info");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/parking/reviews/${carSpaceModalContext.carSpaceId}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        const newReviews = [];
        for (const review of response.data) {
          newReviews.push({
            id: review.pk,
            consumer: review.consumer,
            rating: review.rating,
            comment: review.comment,
            publishDate: review.publishDate,
          });
        }

        setReviews(newReviews);
      } catch (e) {
        console.log(e.message);
        setError({
          value: true,
          message: config.NETWORK_ERROR_MESSAGE,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.body}>
      <CarSpaceCardHeader
        title="Reviews"
        onClose={carSpaceModalContext.closeModal}
        onBack={backToCarSpaceInfoHandler}
      />
      <CarSpaceCardContent>
        {isLoading && (
          <div className={classes["center-container"]}>
            <CircularProgress color="primary" />
          </div>
        )}
        {!isLoading && !error.value && (
          <DataGrid
            rows={reviews}
            columns={cols}
            page={page}
            onPageChange={changePageHandler}
            pageSize={rowsPerPage}
            onPageSizeChange={changeRowsPerPageHandler}
            rowsPerPageOptions={[5, 10]}
          />
        )}
        {!isLoading && error.value && (
          <div className={classes["center-container"]}>{error.message}</div>
        )}
      </CarSpaceCardContent>
    </div>
  );
};

export default CarSpaceReviews;
