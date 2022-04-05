export const carSpaceFormReducer = (state, action) => {
  const newState = { ...state };

  if (action.type === "FETCH") {
    return {
      isFormValid: true,
      images: { value: action.image, isValid: true },
      streetAddress: {
        value: action.streetAddress,
        isValid: true,
        disabled: true,
      },
      city: { value: action.city, isValid: true, disabled: true },
      state: { value: action.state, isValid: true, disabled: true },
      postcode: { value: action.postcode, isValid: true, disabled: true },
      price: { value: action.price, isValid: true },
      maxVehicleSize: { value: action.size, isValid: true },
      notes: { value: action.notes, isValid: true },
    };
  }

  if (action.type === "RESET") {
    return getCarSpaceFormInitialState();
  }

  if (action.type === "IMAGES_INPUT") {
    newState.images.value = action.value;
    newState.images.isValid = action.value.length > 0;
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
    newState.notes.isValid = action.value !== "";
  }

  newState.isFormValid =
    newState.images.isValid &&
    newState.streetAddress.isValid &&
    newState.city.isValid &&
    newState.state.isValid &&
    newState.postcode.isValid &&
    newState.price.isValid &&
    newState.maxVehicleSize.isValid &&
    newState.notes.isValid;

  return newState;
};

export const getCarSpaceFormInitialState = () => {
  return {
    isFormValid: false,
    images: { value: [], isValid: false },
    streetAddress: { value: "", isValid: false, disabled: false },
    city: { value: "", isValid: false, disabled: false },
    state: { value: "", isValid: false, disabled: false },
    postcode: { value: "", isValid: false, disabled: false },
    price: { value: "", isValid: false },
    maxVehicleSize: { value: "", isValid: false },
    notes: { value: "", isValid: false },
  };
};
