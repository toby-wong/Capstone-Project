import { useContext, useEffect, useState } from "react";

import ProviderModalContext from "../../../../contexts/provider-modal-context";

import CarSpaceInfo from "../../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfo";

import * as config from "../../../../config";
import * as utility from "../../../../utility";

const ProviderCarSpaceInfo = ({ status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [carSpaceInfo, setCarSpaceInfo] = useState({
    images: [],
  });
  const providerModalContext = useContext(ProviderModalContext);

  const editListHandler = () => {
    providerModalContext.openPage("/edit");
  };

  const displayReviewsHandler = () => {
    providerModalContext.openPage("/reviews");
  };

  const viewBookingsHandler = () => {
    providerModalContext.openPage("/bookings");
  };

  const bookingAction = {
    content: "View Bookings",
    color: "primary",
    onClick: viewBookingsHandler,
  };

  const editAction = {
    content: "Edit Listings",
    color: "secondary",
    onClick: editListHandler,
  };

  const actions = ["active", "pending"].includes(status)
    ? [bookingAction, editAction]
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (providerModalContext.carSpaceInfo.fetched)
          return setCarSpaceInfo(providerModalContext.carSpaceInfo);
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/parking/${providerModalContext.carSpaceId}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const response = await utility.sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        setCarSpaceInfo(response.data);
        providerModalContext.fetchCarSpaceInfo(response.data);
      } catch (e) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [providerModalContext, setIsLoading]);

  return (
    <CarSpaceInfo
      title={`${carSpaceInfo.streetAddress}, ${carSpaceInfo.city}`}
      carSpaceInfo={carSpaceInfo}
      actions={actions}
      isLoading={isLoading}
      onClose={providerModalContext.closeModal}
      onClickReview={displayReviewsHandler}
    />
  );
};

export default ProviderCarSpaceInfo;
