import store from '../redux/store'
import '../styles/globals.css'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}
const Store = () => store;

export default withRedux(Store)(MyApp)
