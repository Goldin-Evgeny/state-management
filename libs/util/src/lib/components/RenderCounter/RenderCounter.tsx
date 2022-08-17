import styles from './RenderCounter.module.scss';

const useCounter = process.env['NX_USE_COUNT_FEATURE'] === 'true';

export default function RenderCounter({count}: {count: number}) {
  if (!useCounter) {
    return null;
  }
  return <span className={styles['root']}>{count}</span>;
}
