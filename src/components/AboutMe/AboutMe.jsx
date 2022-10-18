import React from 'react';

import CustomLink from '../CustomLink/CustomLink';

import photo from '../../images/about-me-photo.jpg';

import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__inner">
        <img className="about-me__photo" src={photo} alt="Фотография разработчика" />
        <h3 className="about-me__name ">Василий</h3>
        <p className="about-me__profession">Фронтенд-разработчик, 29&nbsp;лет</p>
        <p className="about-me__text">
          Родился в&nbsp;Самаре, живу примерно тут&nbsp;же. Работал по&nbsp;специальности
          на&nbsp;ТЭЦ, но&nbsp;через пару лет понял, что не&nbsp;моё. Хотел стать бизнес-тренером,
          но&nbsp;вместо этого увлекся разработкой электронных курсов. Затем осознал, что мне
          нравится вёрстка, поэтому решил изучать веб-разработку. Есть жена и&nbsp;две кошки:
          Кис-Кис и&nbsp;Мур-Мур.
        </p>
        <CustomLink className="about-me__link" path="http://github.com/Vasily257">
          Github
        </CustomLink>
      </div>
    </section>
  );
}

export default AboutMe;
