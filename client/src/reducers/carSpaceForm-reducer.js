export const carSpaceFormReducer = (state, action) => {
  const newState = { ...state };

  if (action.type === "RESET") {
    return getCarSpaceFormInitialState();
  }

  if (action.type === "STREET_ADDRESS_INPUT") {
    newState.streetAddress.value = action.value;
    newState.streetAddress.isValid = action.value !== "";
  }

  if (action.type === "CITY_INPUT") {
    newState.city.value = action.value;
    newState.city.isValid = action.value !== "";
  }

  if (action.type === "STATE_INPUT") {
    newState.state.value = action.value;
    newState.state.isValid = action.value !== "";
  }

  if (action.type === "POSTCODE_INPUT") {
    newState.postcode.value = action.value;
    newState.postcode.isValid = action.value !== "";
  }

  if (action.type === "PRICE_INPUT") {
    newState.price.value = action.value;
    newState.price.isValid = action.value !== "";
  }

  if (action.type === "MAX_VEHICLE_SIZE_INPUT") {
    newState.maxVehicleSize.value = action.value;
    newState.maxVehicleSize.isValid = action.value !== "";
  }

  if (action.type === "NOTES_INPUT") {
    newState.notes.value = action.value;
  }

  newState.isFormValid =
    newState.streetAddress.isValid &&
    newState.city.isValid &&
    newState.state.isValid &&
    newState.postcode.isValid &&
    newState.price.isValid &&
    newState.maxVehicleSize.isValid;

  return newState;
};

export const getCarSpaceFormInitialState = () => {
  return {
    isFormValid: false,
    streetAddress: { value: "", isValid: true },
    city: { value: "", isValid: false },
    state: { value: "", isValid: false },
    postcode: { value: "", isValid: false },
    price: { value: "", isValid: false },
    maxVehicleSize: { value: "", isValid: false },
    notes: { value: "" },
  };
};
