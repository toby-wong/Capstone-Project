import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import classes from "./CarSpaceBookings.module.css";

// const CarSpaceBookings = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState({
//     value: false,
//     message: "",
//   });

//   return (
//     <div className={classes.body}>
//       <CarSpaceCardHeader title="Reviews" onClose={onClose} onBack={onBack} />
//       <CarSpaceCardContent>
//         {isLoading && (
//           <div className={classes["center-container"]}>
//             <CircularProgress color="primary" />
//           </div>
//         )}
//         {!isLoading && !error.value && <DataGrid rows={rows} columns={cols} />}
//         {/* {!isLoading && <DataGrid rows={reviews} columns={cols} />} */}
//         {!isLoading && error.value && (
//           <div className={classes["center-container"]}>error.message</div>
//         )}
//       </CarSpaceCardContent>
//     </div>
//   );
// };

// export default CarSpaceBookings;
