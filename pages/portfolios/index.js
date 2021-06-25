import { useState } from 'react';
import axios from 'axios'
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';

// For testing
const apiCall = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                testingData: 'Just some testing Data'
            })
        }, 200)
    })
}

// Create portfolio
const graphCreatePortfolio = () => {
    const query = `
      mutation CreatePortfolio {
        createPortfolio(input: {
          title: "New Job"
          company: "New Company"
          companyWebsite: "New Website"
          location: "New Location"
          jobTitle: "New Job Title"
          description: "New Desc"
          startDate: "12/12/2012"
          endDate: "14/11/2013"
        }) {
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
        .then(data => data.createPortfolio)
}

// Update portfolio
const graphUpdatePortfolio = (id) => {
    const query = `
      mutation UpdatePortfolio {
        updatePortfolio(id: "${id}",input: {
          title: "UPDATE Job"
          company: "UPDATE Company"
          companyWebsite: "UPDATE Website"
          location: "UPDATE Location"
          jobTitle: "UPDATE Job Title"
          description: "UPDATE Desc"
          startDate: "12/12/2012 UPDATE"
          endDate: "14/11/2013 UPDATE"
        }) {
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
        .then(data => data.updatePortfolio)
}


// Delete portfolio
const graphDeletePortfolio = (id) => {
    const query = `
      mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
      }
    `

    return axios.post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.deletePortfolio)
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


const Portfolios = ({ data }) => {
    const [portfolios, setPortfolios] = useState(data.portfolios);

    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolio();
        const newPortfolios = [...portfolios, newPortfolio];
        setPortfolios(newPortfolios);
    }

    const updatePortfolio = async (id) => {
        const updatedPortfolio = await graphUpdatePortfolio(id);
        const index = portfolios.findIndex(p => p._id === id);
        const newPortfolios = portfolios.slice();
        newPortfolios[index] = updatedPortfolio;
        setPortfolios(newPortfolios);
    }
    const deletePortfolio = async (id) => {
        const deletedId = await graphDeletePortfolio(id);
        const index = portfolios.findIndex(p => p._id === deletedId);
        const newPortfolios = portfolios.slice();
        newPortfolios.splice(index, 1);
        setPortfolios(newPortfolios);
    }

    return (
        <>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>Portfolios</h1>
                        </div>
                    </div>
                    {/* Button to create new portfolo */}
                    <button
                        onClick={createPortfolio}
                        className="btn btn-primary">Create Portfolio</button>
                </section>
                <section className="pb-5">
                    <div className="row">
                        {portfolios.map(portfolio =>

                            <div key={portfolio._id} className="col-md-4">
                                <Link
                                    href='/portfolios/[id]'
                                    as={`/portfolios/${portfolio._id}`}>
                                    <a className="card-link">
                                        <PortfolioCard portfolio={portfolio} />
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => updatePortfolio(portfolio._id)}>Update Portfolio</button>
                                <button
                                    onClick={() => deletePortfolio(portfolio._id)}
                                    className="btn btn-danger">
                                    Delete Portfolio
                                </button>
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
    return { data: { portfolios } };
}

export default Portfolios;