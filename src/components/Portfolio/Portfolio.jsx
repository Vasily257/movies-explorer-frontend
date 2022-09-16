import React from 'react';
import CustomLink from '../CustomLink/CustomLink';
import './Portfolio.css';
import portfolioLinkIcon from '../../images/portfolio-link-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <CustomLink className="portfolio__link">
            Статичный сайт
            <img className="portfolio__link-icon" src={portfolioLinkIcon} alt="Значок ссылки" />
          </CustomLink>
        </li>
        <li className="portfolio__item">
          <CustomLink className="portfolio__link">
            Адаптивный сайт
            <img className="portfolio__link-icon" src={portfolioLinkIcon} alt="Значок ссылки" />
          </CustomLink>
        </li>
        <li className="portfolio__item">
          <CustomLink className="portfolio__link">
            Одностраничное приложение
            <img className="portfolio__link-icon" src={portfolioLinkIcon} alt="Значок ссылки" />
          </CustomLink>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
