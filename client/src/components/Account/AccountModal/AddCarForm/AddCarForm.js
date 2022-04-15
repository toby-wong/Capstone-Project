import { useContext, useState } from "react";

import * as config from "../../../../config";
import * as utility from "../../../../utility";

import AccountModalContext from "../../../../contexts/account-modal-context";
import AccountSubModalContext from "../../../../contexts/account-submodal-context";

import CarForm from "../CarForm/CarForm";

const AddCarForm = () => {
  const accountModalContext = useContext(AccountModalContext);
  const accountSubModalContext = useContext(AccountSubModalContext);
  const [isAdding, setIsAdding] = useState(false);

  const closeAllHandler = () => {
    accountSubModalContext.closeModal();
    accountModalContext.closeModal();
  };

  const submitFormHandler = async (formData) => {
    try {
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;
      const url = `${config.SERVER_URL}/api/consumer/vehicle`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: formData,
      };
      const response = await utility.sendRequest(url, options, setIsAdding);

      if (!response.status) throw Error(config.NETWORK_ERROR_MESSAGE);
      if (response.status >= 300) {
        const errorMsgs = [];
        for (const key of Object.keys(response.data)) {
          errorMsgs.push(` - Not a valid ${key}.`);
        }
        throw Error(errorMsgs);
      }

      accountSubModalContext.openModal({
        title: "Success",
        messages: [
          "A car has been successfully registered under your account.",
        ],
        actions: [
          {
            color: "primary",
            onClick: closeAllHandler,
            content: "OK",
            width: "120px",
          },
        ],
      });

      accountModalContext.togglePageRefreshStatus();
    } catch (e) {
      accountSubModalContext.openModal({
        title: "Error",
        messages: e.message.split(","),
        actions: [
          {
            color: "primary",
            onClick: accountSubModalContext.closeModal,
            content: "OK",
            width: "120px",
          },
        ],
      });
    }
  };

  return (
    <CarForm
      title="Add Car"
      onSubmit={submitFormHandler}
      actions={[
        {
          type: "submit",
          content: "Add",
          isLoading: isAdding,
          isDisable: true,
        },
      ]}
    />
  );
};

export default AddCarForm;
