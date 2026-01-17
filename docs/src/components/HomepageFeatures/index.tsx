import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'home.feature.open.title',
      message: 'Diseño de Código Abierto',
    }),
    image: require('@site/static/img/izquierda.png').default,
    description: (
      <Translate id="home.feature.open.desc">
        El hardware y software de IncuNest son abiertos, documentados y
        reproducibles para que cualquier comunidad pueda construir y mejorar la
        incubadora.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'home.feature.collaboration.title',
      message: 'Colaboración Clínica y Maker',
    }),
    image: require('@site/static/img/centro.png').default,
    description: (
      <Translate id="home.feature.collaboration.desc">
        Equipos médicos, ingenieros y makers aportan experiencia conjunta para
        validar requisitos neonatales, seguridad y mantenimiento en campo.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'home.feature.safety.title',
      message: 'Enfoque en Seguridad Neonatal',
    }),
    image: require('@site/static/img/derecha.png').default,
    description: (
      <Translate id="home.feature.safety.desc">
        Protocolos de control térmico, alarmas y redundancias están documentados
        para priorizar la seguridad del recién nacido en entornos de recursos
        limitados.
      </Translate>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={image} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
