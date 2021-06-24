import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';

import App from 'next/app';

function MyApp({ Component, pageProps }) {
  return (

    <div className="portfolio-app">
      <Navbar />
      {pageProps.appData}
      {Component.name === 'Home' && <Hero />}
      <Component {...pageProps} />
    </div>
  )

}

MyApp.getInitialProps = async (context) => {
  console.log('GET INITIAL PROPS _APP')
  const initialProps = App.getInitialProps && await App.getInitialProps(context);

  return { pageProps: { appData: 'Hello _App Component', ...initialProps.pageProps } }
}

export default MyApp
