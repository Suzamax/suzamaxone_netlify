import React from "react"
import { Link } from "gatsby"

import LastFm from '../components/lastfm'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Carlos Cañellas"

    return (
      <div>
        <LastFm />
        <Layout location={this.props.location} title={siteTitle}>
          <SEO
            title="Home"
            keywords={[`blog`, `desarrollador`, `web`,
            `murcia`, `informatica`, `umu`,
            `developer`, `universidad`, `react`]}
          />
          <h1>
            ¡Hola!{" "}
            <span role="img" aria-label="wave emoji">
              👋
            </span>
          </h1>
          <p>Soy un estudiante de ingeniería informática en la Universidad de Murcia.</p>
          <p>
            También soy administrador de sistemas. Desarrollo webs, y me preparo para ser desarrollador y operador de sistemas (DevOps).
          </p>
          <p>También tengo un blog y un CV actualizado:</p>
          <Link to="/blog/">
            <Button marginTop="35px">Mi blog</Button>
          </Link>
          <Link to="/about/">
            <Button marginTop="35px">Mi CV</Button>
          </Link>
        </Layout>
      </div>
    )
  }
}

export default IndexPage
