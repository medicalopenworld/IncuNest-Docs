import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

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

  const locale = i18n?.currentLocale ?? 'es';
  const videoLocale = ['es', 'en', 'fr', 'pt'].includes(locale) ? locale : 'es';
  const videoSrc = `/videos/${videoLocale}/user-interface.mp4`;

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className="container" style={{marginTop: '2rem'}}>
          <Heading as="h2" className="text--center">
            ¿Qué es IncuNest?
          </Heading>
          <div style={{marginTop: '1rem'}}>
            <video controls preload="metadata" width="100%" src={videoSrc}>
              Tu navegador no soporta la etiqueta de vídeo.
            </video>
            <p style={{textAlign: 'right', marginTop: '0.5rem'}}>
              <a href={videoSrc} target="_blank" rel="noopener noreferrer">
                Ver en pantalla completa
              </a>
            </p>
          </div>
        </section>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
