import { firebaseConfig } from '../firebase-config.js';
type Props = {};

const Home = (props: Props) => {
  return (
    <h1
      style={{
        fontFamily: 'sans-serif',
      }}
    >
      This is the home page, cool right?
    </h1>
  );
};

export default Home;
