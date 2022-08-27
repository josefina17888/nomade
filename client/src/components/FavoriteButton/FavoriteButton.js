import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import s from "./FavoriteButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, getFavorites, deleteFavorite } from "../../Redux/Actions";
import Favorites from "../Favorites/Favorites";

export default function Favorite(props) {
  const dispatch = useDispatch();
  let userEmail = JSON.parse(props.guestInfo).email;
  const favorites = useSelector((state) => state.userFavorites);
  console.log("favorites", favorites);
  let stateLodgings = useSelector((state) => state.lodgings);
  const [sButton, setSButton] = useState(false);

  useEffect(() => {
    dispatch(getFavorites(favData));
  }, [dispatch]);

  let favData = {
    userEmail: userEmail,
    lodgingId: props.id,
  };
  let userFavs = {
    userEmail: userEmail,
    lodgingId: props.id,
    city: props.city,
    country: props.country,
    price: props.price,
    guests: props.guests,
    picture: props.picture[0],
    currency: props.currency,
  };
  let ids = [];

  for (let e in favorites) {
    for (let i in stateLodgings) {
      if (favorites[e].lodgingId === stateLodgings[i]._id) {
        ids.push(favorites.lodginId);
      }
    }
  }

  let stateIds = stateLodgings.map((e) => e._id);

  if (favorites !== undefined) {
    console.log("favorites", favorites);
    var favoritesId = favorites.map((e) => e.lodgingId);
  }

  let isfaved = favoritesId.some((favid) => favid === props.id);

  async function handleClick(e) {
    if (isfaved) {
      await dispatch(deleteFavorite(favData));
      dispatch(getFavorites(favData));
    } else {
      await dispatch(addFavorite(favData));
      dispatch(getFavorites(favData));
    }
  }
  return (
    <div className={s.favContainer}>
      <button onClick={handleClick} className={s.favButtonF}>
        <FaHeart className={isfaved ? s.favT : s.favF} />
      </button>
    </div>
  );
}
