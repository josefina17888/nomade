import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "./CarouselHome.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLodgings } from "../../Redux/Actions/index";
import Card from "../Card/Card";

export default function TopRated() {
  const selector = useSelector((state) => state.allLodgings);
  const dispatch = useDispatch();
  const lodgingVisibility = selector.filter((e) => e.Visibility === true);

  useEffect(() => {
    dispatch(getLodgings());
  }, [dispatch]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomLodging =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging1 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging2 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];
  const randomLodging3 =
    lodgingVisibility[getRandomInt(lodgingVisibility.length)];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={style.containerTopRated}>
      <div>
        <h2 className={style.tarifa}>Mejores tarifas</h2>
      </div>
      <Carousel
        className={style.carousel}
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging ? `detail/${randomLodging._id}` : ""}
          >
            <Card
              picture={randomLodging ? randomLodging.picture[0] : ""}
              city={randomLodging ? randomLodging.city : ""}
              country={randomLodging ? randomLodging.country : ""}
              guests={randomLodging ? randomLodging.guests : ""}
              price={randomLodging ? randomLodging.price : ""}
              currency={randomLodging ? randomLodging.currency : ""}
            ></Card>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging ? `detail/${randomLodging._id}` : ""}
          >
            <Card
              picture={randomLodging1 ? randomLodging1.picture[0] : ""}
              city={randomLodging1 ? randomLodging1.city : ""}
              country={randomLodging1 ? randomLodging1.country : ""}
              guests={randomLodging1 ? randomLodging1.guests : ""}
              price={randomLodging1 ? randomLodging1.price : ""}
              currency={randomLodging1 ? randomLodging1.currency : ""}
            ></Card>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging ? `detail/${randomLodging._id}` : ""}
          >
            <Card
              picture={randomLodging2 ? randomLodging2.picture[0] : ""}
              city={randomLodging2 ? randomLodging2.city : ""}
              country={randomLodging2 ? randomLodging2.country : ""}
              guests={randomLodging2 ? randomLodging2.guests : ""}
              price={randomLodging2 ? randomLodging2.price : ""}
              currency={randomLodging2 ? randomLodging2.currency : ""}
            ></Card>
          </Link>
        </div>
        <div className={style.container}>
          <Link
            className={style.link}
            to={randomLodging ? `detail/${randomLodging._id}` : ""}
          >
            <Card
              picture={randomLodging3 ? randomLodging3.picture[0] : ""}
              city={randomLodging3 ? randomLodging3.city : ""}
              country={randomLodging3 ? randomLodging3.country : ""}
              guests={randomLodging3 ? randomLodging3.guests : ""}
              price={randomLodging3 ? randomLodging3.price : ""}
              currency={randomLodging3 ? randomLodging3.currency : ""}
            ></Card>
          </Link>
        </div>
      </Carousel>
    </div>
  );
}
