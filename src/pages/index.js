import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Layout from '../components/MainLayout'
import LastFm from '../components/lastfm'
import BlogList from '../components/BlogList'

const Index = props => {

  return (
      <Layout
        pathname="/"
        siteTitle="Carlos Cañellas"
        siteDescription={props.description}
      >
        <Header />

        <main class="bg-lightest-blue ma3 br3 shadow-4">
            <section class="pa3 pa5-ns cf">
                <div class="fl w-100 w-60-ns">
                    <h1 class="f3 f1-m f-headline-l">I'm Carlos!</h1>
                    <p class="measure lh-copy">
                        I'm an open-minded and curious guy, ready to learn and develop new things using the right tools.
                    </p> 
                    <p class="measure lh-copy">
                        I currently study at University of Murcia and I develop sites, everything alonsgide my pet.
                    </p>
                    <p class="measure lh-copy">
                        Check out my blog and my social media! Links are on the navbar below.
                    </p>
                </div>
                <div class="fl w-100 mt5 w-40-ns">
                    <img class="br3 shadow-4" src="/assets/me_and_neko.jpeg" alt="Me and Neko" />
                </div>
            </section>
            <section class="pa3 pa5-ns">
                <h1 class="f3 f1-m f-headline-l">What I'm listening to</h1>
                <p class="measure lh-copy">
                I listen to music frequently, check out my <a href="https://last.fm/user/suzamax">Last.fm</a>!
                </p> 
                <LastFm />
            </section>
        </main>
      </Layout>
  )
}

export default Index


