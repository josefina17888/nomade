import React from 'react'
import style from './Nosotros.module.css'
import Footer from '../Footer/Footer'
import Linkedin from '../../assets/linkedin.png'
import Github from '../../assets/silueta-del-logo-de-github-en-un-cuadrado.png'

export default function Nostros() {
  return (
    <div>
      <div className={style.containerNosotros}>
        <div className={style.cardContainer}>
          <img className={style.image} src={"https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560700/samples/Abel%20PIC/WhatsApp_Image_2022-09-07_at_09.16.24_3_n3xr39.jpg"} alt='Image'></img>
          <h2 className={style.name}>Julio Peña</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
            <a href='https://www.linkedin.com/in/julio-cesar-pe%C3%B1a-estrada-312223213/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
            <a href='https://github.com/VelGrab' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={'https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560508/samples/Abel%20PIC/UTP_MARTINEZ_DIAZ_YULISSA_AZUCENA_fu4r49.jpg'} alt='Image'></img>
          <h2 className={style.name}>Yulissa Azucena</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/yulissamtzd/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/YulsMD' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={"https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560653/samples/Abel%20PIC/WhatsApp_Image_2022-09-07_at_09.16.24_2_i1sfhp.jpg"} alt='Image'></img>
          <h2 className={style.name}>Josefina Berro</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/josefina-garc%C3%ADa-berro-618689110/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/josefina17888' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={"https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560561/samples/Abel%20PIC/nabil_qfviyb.jpg"} alt='Image'></img>
          <h2 className={style.name}>Nabil Allis</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/nabil-allis-4b3690243/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/Nabil014' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={"https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560620/samples/Abel%20PIC/WhatsApp_Image_2022-09-07_at_09.16.24_1_qh1ggy.jpg"} alt='Image'></img>
          <h2 className={style.name}>Bruno Lauricella</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/bruno-mateo-lauricella/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/BruLau' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={'https://res.cloudinary.com/dbq85fwfz/image/upload/v1662235309/2019_08_23_HubUDEP_-_3ra_Generaci%C3%B3n_095_edu5rx.jpg'} alt='Image'></img>
          <h2 className={style.name}>Abel Acuña</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/abelacunacoronado/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/abelacco' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <div className={style.cardContainer}>
          <img className={style.image} src={"https://res.cloudinary.com/dbq85fwfz/image/upload/v1662560840/samples/Abel%20PIC/WhatsApp_Image_2022-09-07_at_09.16.24_4_rk369z.jpg"} alt='Image'></img>
          <h2 className={style.name}>Yairys Aristigueta</h2>
          <p className={style.pDeveloper}>Full Stack Developer</p>
          <div className={style.socialContainer}>
          <a href='https://www.linkedin.com/in/yairys-aristigueta-73357223a/' target='__BLANK'><img className={style.Linkedin} src={Linkedin}></img></a>
          <a href='https://github.com/Yairys' target='__BLANK'><img className={style.Github} src={Github}></img></a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
