import styles from './Loader.module.scss';

interface LoaderProps {
  height?: string;
  width?: string;
}

const Loader = ({ height = '32px', width = '32px' }: LoaderProps) => {
  return (
    <div className={styles.loader} style={{ height, width }} />
  );
};

export default Loader;
