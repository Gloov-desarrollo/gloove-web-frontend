export const getAccomodations = async () => {
  // const url = `https://bird-rested-wombat.ngrok-free.app/accommodations`;
  const url = `https://gloove-api-avantio.onrender.com/get-accommodations`;
  const res = await fetch(url, { method: "get",
  headers: {
    "Content-Type": "application/json",
  }, });
  if (res) {
    return await res.json();
  } else return null;
};

export const getDescriptions = async () => {
  // const url = `https://bird-rested-wombat.ngrok-free.app/descriptions`;
  const url = `https://gloove-web-back-test.vercel.app/descriptions`;
  const res = await fetch(url, { method: "get",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }, });
  if (res) {
    return await res.json();
  } else return null;
};

export const getServices = async () => {
  // const url = `https://bird-rested-wombat.ngrok-free.app/descriptions`;
  const url = `http://localhost:8080/services`;
  const res = await fetch(url, { method: "get",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }, });
  if (res) {
    return await res.json();
  } else return null;
};

export const openBooking = async (adaptedURI) => {
  // const url = `https://bird-rested-wombat.ngrok-free.app/booking/open`;
  const url = `http://localhost:8080/booking/open`;
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      adaptedURI,
    }),
  });
  if (res) {
    return await res.json();
  } else return null;
};

export const deleteBooking = async (adaptedURI) => {
  console.log(adaptedURI);
  // const url = `https://bird-rested-wombat.ngrok-free.app/booking/delete`;
  const url = `http://localhost:8080/booking/delete`;
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      adaptedURI,
    }),
  });
  if (res) {
    return await res.json();
  } else return null;
};

export const openAllBooking = async () => {
  // const url = `https://bird-rested-wombat.ngrok-free.app/booking/openAll`;
  const url = `http://localhost:8080/booking/openAll`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (res) {
    return await res.json();
  } else return null;
};

export const insertBooking = async (bookingDataMenu) => {
  console.log("bookingData>>", bookingDataMenu);
  // const url = `https://bird-rested-wombat.ngrok-free.app/booking/insert`;
  const url = `http://localhost:8080/booking/insert`;
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      ...bookingDataMenu,
    }),
  });
  if (res) {
    return await res.json();
  } else return null;
};
