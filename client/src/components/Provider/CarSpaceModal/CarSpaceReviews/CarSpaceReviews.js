import classes from "./CarSpaceReviews.module.css";

import { DataGrid } from "@mui/x-data-grid";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

const CarSpaceReviews = ({ onClose, onBack }) => {
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
        <DataGrid rows={rows} columns={cols} />
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
