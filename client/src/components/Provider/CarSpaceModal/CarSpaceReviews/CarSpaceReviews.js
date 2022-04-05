import classes from "./CarSpaceReviews.module.css";

import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";
import { CircularProgress } from "@mui/material";

const CarSpaceReviews = ({ carSpaceId, onClose, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/parking/reviews/${carSpaceId}`;
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
            col1: review.consumer,
            col2: review.rating,
            col3: review.comment,
            col4: review.publishDate,
          });
        }
        setReviews(newReviews);
      } catch (e) {
        console.log(e.message);
        setError({
          value: true,
          message:
            "Failed to fetch review data. Check your Internet connection.",
        });
      }
    };

    fetchData();
  }, [carSpaceId]);

  const rows = [
    {
      id: 1,
      col1: "Younggil#123",
      col2: "3.5/5.0",
      col3: "So so",
      col4: "2022-03-22",
    },
    {
      id: 2,
      col1: "Muhammad#777",
      col2: "4.0/5.0",
      col3: "Nice",
      col4: "2022-03-22",
    },
    {
      id: 3,
      col1: "Toby#999",
      col2: "3.0/5.0",
      col3: "It's k",
      col4: "2022-03-22",
    },
    {
      id: 4,
      col1: "Andrew#321",
      col2: "3.0/5.0",
      col3: "Just ok",
      col4: "2022-03-22",
    },
  ];

  const cols = [
    { field: "col1", headerName: "Consumer", width: 150 },
    { field: "col2", headerName: "Rating", width: 150 },
    { field: "col3", headerName: "Review", flex: 1 },
    { field: "col4", headerName: "Date", width: 180 },
  ];

  return (
    <div className={classes.body}>
      <CarSpaceCardHeader title="Reviews" onClose={onClose} onBack={onBack} />
      <CarSpaceCardContent>
        {isLoading && (
          <div className={classes["center-container"]}>
            <CircularProgress color="primary" />
          </div>
        )}
        {!isLoading && !error.value && <DataGrid rows={rows} columns={cols} />}
        {/* {!isLoading && <DataGrid rows={reviews} columns={cols} />} */}
        {!isLoading && error.value && (
          <div className={classes["center-container"]}>error.message</div>
        )}
      </CarSpaceCardContent>
    </div>
  );
};

export default CarSpaceReviews;
/*
  [
    {
      "parkingSpace": 0,
      "consumer": 0,
      "rating": "5.",
      "comment": "string",
      "publishDate": "2022-04-05T04:57:51.541Z",
      "pk": 0
    }
  ]
*/
