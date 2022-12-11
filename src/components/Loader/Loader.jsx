import { RotatingLines } from 'react-loader-spinner';
import styles from 'components/Loader/Loader.module.css';

function Spinner() {
  return (
    <div className={styles.Loader}>
      <RotatingLines strokeColor="blue" strokeWidth="4" animationDuration="1" width="196" visible={true} />
    </div>
  );
}

export default Spinner;