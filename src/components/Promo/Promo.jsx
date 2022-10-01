import React from 'react';
import Button from '../Button/Button';
import promoPictureWebp from '../../images/promo-picture.webp';
import promoPicturePng from '../../images/promo-picture.png';

import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <picture className="promo__picture-wrapper">
        <source srcSet={promoPictureWebp} />
        <img
          className="promo__picture"
          src={promoPicturePng}
          alt="Земной шар, где суша сделана из слов WEB"
        />
      </picture>
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.
      </p>
      <Button className="button promo__button">
        Узнать больше
      </Button>
    </section>
  );
}

export default Promo;
