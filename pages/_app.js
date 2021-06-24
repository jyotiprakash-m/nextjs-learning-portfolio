import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';


function MyApp({ Component, pageProps }) {
  const isHomePage = () => Component.name === 'Home'
  return (

    <div className="portfolio-app">
      <Navbar />
      {isHomePage() && <Hero />}
      <Component {...pageProps} />

      {/* FOOTER STARTS */}
      {isHomePage() &&
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>}
      {/* FOOTER ENDS */}


    </div>
  )

}


export default MyApp
