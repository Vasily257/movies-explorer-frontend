import React from 'react';
import Timeline from '../Timeline/Timeline';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О&nbsp;проекте</h2>
      <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
      <p className="about-project__text">
        Составление плана, работу над бэкендом, вёрстку, добавление функциональности
        и&nbsp;финальные доработки.
      </p>
      <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
      <p className="about-project__text">
        У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы
        успешно защититься.
      </p>
      <Timeline />
    </section>
  );
}

export default AboutProject;
