import React from 'react';
import axios from 'axios'
import PortfolioCard from '@/components/portfolios/PortfolioCard';

const apiCall = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                testingData: 'Just some testing Data'
            })
        }, 200)
    })
}

// Fetch Portfolios
const fetchPortfolios = () => {
    const query = `
      query Portfolios {
        portfolios {
          _id,
          title,
          company,
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }`;
    return axios.post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.portfolios)
}


const Portfolios = ({ portfolios }) => {

    return (
        <>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>Portfolios</h1>
                        </div>
                    </div>
                </section>
                <section className="pb-5">
                    <div className="row">
                        {portfolios.map(portfolio =>

                            <div key={portfolio._id} className="col-md-4">
                                <PortfolioCard portfolio={portfolio} />
                            </div>
                        )}

                    </div>
                </section>
            </div>
        </>
    )
}

Portfolios.getInitialProps = async () => {

    const portfolios = await fetchPortfolios();
    return { portfolios }
}

export default Portfolios;