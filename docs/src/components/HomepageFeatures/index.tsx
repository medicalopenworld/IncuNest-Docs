import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Diseño de Código Abierto',
    image: require('@site/static/img/izquierda.png').default,
    description: (
      <>
        El hardware y software de IncuNest son abiertos, documentados y
        reproducibles para que cualquier comunidad pueda construir y mejorar la
        incubadora.
      </>
    ),
  },
  {
    title: 'Colaboración Clínica y Maker',
    image: require('@site/static/img/centro.png').default,
    description: (
      <>
        Equipos médicos, ingenieros y makers aportan experiencia conjunta para
        validar requisitos neonatales, seguridad y mantenimiento en campo.
      </>
    ),
  },
  {
    title: 'Enfoque en Seguridad Neonatal',
    image: require('@site/static/img/derecha.png').default,
    description: (
      <>
        Protocolos de control térmico, alarmas y redundancias están documentados
        para priorizar la seguridad del recién nacido en entornos de recursos
        limitados.
      </>
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
