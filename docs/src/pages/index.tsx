import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const DEFAULT_LOCALE = 'es';
const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'pt'];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Introducción
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();

  const locale = i18n?.currentLocale ?? DEFAULT_LOCALE;
  const videoLocale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const videoSrc = `/videos/${videoLocale}/user-interface.mp4`;

  const labels: Record<string, {heading: string; fallback: string; fullScreen: string}> = {
    es: {
      heading: '¿Qué es IncuNest?',
      fallback: 'Tu navegador no soporta la etiqueta de vídeo.',
      fullScreen: 'Ver en pantalla completa',
    },
    en: {
      heading: 'What is IncuNest?',
      fallback: 'Your browser does not support the video tag.',
      fullScreen: 'Watch full screen',
    },
    fr: {
      heading: "Qu'est-ce qu'IncuNest ?",
      fallback: 'Votre navigateur ne prend pas en charge la balise vidéo.',
      fullScreen: 'Regarder en plein écran',
    },
    pt: {
      heading: 'O que é o IncuNest?',
      fallback: 'Seu navegador não oferece suporte à tag de vídeo.',
      fullScreen: 'Assistir em tela cheia',
    },
  };

  const {heading, fallback, fullScreen} = labels[videoLocale] ?? labels[DEFAULT_LOCALE];

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className={clsx('container', styles.videoSection)}>
          <Heading as="h2" className="text--center">
            {heading}
          </Heading>
          <div className={styles.videoWrapper}>
            <video
              controls
              preload="none"
              width="100%"
              src={videoSrc}
              aria-label={`${heading} video`}>
              {fallback}
            </video>
            <p className={styles.videoLink}>
              <a href={videoSrc} target="_blank" rel="noopener noreferrer">
                {fullScreen}
              </a>
            </p>
          </div>
        </section>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
