import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ReservationContext = React.createContext();

export const ReservationConsumer = ReservationContext.Consumer;

const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  const getAllReservations = (restaurantId) => {
    axios
      .get(`/api/restaurants/${restaurantId}/reservations`)
      .then((res) => setReservations(res.data))
      .catch((err) => console.log(err));
  };

  const addReservation = (restaurantId, reservation) => {
    axios
      .post(`/api/restaurantes/${restaurantId}/reservations`, { reservation })
      .then((res) => setReservations([...reservations, res.data]))
      .catch((err) => console.log(err));
  };

  const updateReservation = (restaurantId, id, reservation) => {
    axios
      .put(`/api/restaurants/${restaurantId}/reservations/${id}`, {
        reservation,
      })
      .then((res) => {
        const newUpdateReservation = reservations.map((r) => {
          if (r.id === id) {
            return res.data;
          }
          return r;
        });
        setReservations(newUpdateReservation);
        navigate(`/${restaurantId}/reservations`);
      })
      .catch((err) => console.log(err));
  };

  const deleteReservation = (restaurantId, id) => {
    axios
      .delete(`/api/restaurants/${restaurantId}/reservations/${id}`)
      .then((res) => {
        setReservations(reservations.filter((r) => r.id !== id));
        navigate(`/${restaurantId}/reservations`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        getAllReservations,
        addReservation,
        updateReservation,
        deleteReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
