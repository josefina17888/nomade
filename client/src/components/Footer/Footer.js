import React from "react";
import style from "./Footer.module.css";
import CopyRight from "../../assets/letra-c.png";
import Instagram from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";
import Facebook from "../../assets/facebook.png";
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className={style.footerContainer}>
      <div className={style.copyContainer}>
        <img className={style.imgCopy} src={CopyRight}></img>
        <p className={style.pNomade}>2022 Nomade</p>
      </div>
      <div>
        <div className={style.point}></div>
      </div>
      <div>
        <Link className={style.link} to='/nosotros'>
          <p className={style.aboutUs}>Sobre nosotros</p>
        </Link>
      </div>
      <div>
        <div className={style.point}></div>
      </div>
      <div>
      <Link className={style.link} to='/terminos'>
        <p className={style.TyC}>Terminos y condiciones</p>
        </Link>
      </div>
      <div className={style.containerSocials}>
        <a href="https://www.facebook.com/" target='__BLANK'><img className={style.facebook} src={Facebook} alt='Img Facebook'></img></a>
        <a href="https://twitter.com/" target='__BLANK'><img className={style.twitter} src={Twitter} alt='Img Twitter'></img></a>
        <a href="https://www.instagram.com/" target='__BLANK'><img className={style.instagram} src={Instagram} alt='Img Instagram'></img></a>
      </div>
    </div>
  );
}
