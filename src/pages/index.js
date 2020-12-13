import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import Layout from '../components/MainLayout'
import LastFm from '../components/lastfm'

const Index = props => {
  const [text, setText] = useState("web designer")
  const [fadeout, setFadeout] = useState(false)
  const [count, setCount] = useState(0)

  const texts = [
    "web developer",
    "computer science student",
    "system administrator",
    "curious person",
    "web designer"
  ]

  function sleep(milliseconds, interval) {
    var start = new Date().getTime()
    while ((new Date().getTime() - start) < milliseconds);
    clearInterval(interval)
  }

  useEffect(() => {
    const timer = setInterval(changeText, 3000)
    return () => clearInterval(timer);
  })

  const changeText = () => {
    setFadeout(true)
    const oneSecond = setInterval(() => {
      sleep(200, oneSecond)
      setText(texts[count])
      setFadeout(false)
    }, 250)
    const threeSeconds = setInterval(() => {
      sleep(2750, threeSeconds)
    }, 2750)
    setCount(count < texts.length - 1 ? count + 1 : 0)
  }
  

  return (
      <Layout
        pathname="/"
        siteTitle={props.title}
        siteDescription={props.description}
      >
        <section id="hello" className="tc ph4">
                
          <h1 className="f3 f2-m f1-l fw2 black-90 mv3">
            Hey, I'm <span className="blue">Carlos</span>!
          </h1>
          <h2 className="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
            I'm a <span className={"bg-navy white pa1 br2 textchange" + (fadeout ? " fadeOut" : "")}>{text}</span>.
          </h2>

        </section>
        <div class="mw9 center ph3-ns">
            <div class="flex cf ph2-ns">
              <div class="fl w-100 w-20-ns dt pa2">
                <div id="whoami" class="ba shadow-5 white dtc v-btm h5 br4 b--light-gray">
                    <h1 class="f3 ph3 measure-narrow">What do I do?</h1>
                    <p class="f6 pa3 lh-copy measure-narrow">I study at Universidad de Murcia and develop sites alongside <a class="light-gray" href="https://www.instagram.com/p/ByOGD-aCWog/">my pet</a>.
                    </p>
                </div>
              </div>
              <div class="fl w-100 w-20-ns dt pa2">
                <a href="/about" class="no-underline dim ba shadow-5 bg-blue white dtc v-btm h5 br4 b--light-gray">
                  <p className="f4 pa3 lh-copy measure-narrow">I'm a open minded and curious person, ready to learn and develop new things using the right tools. Know more about me here!</p>
                </a>
              </div>
              <div class="fl w-100 w-20-ns dt pa2">
                <a href="/blog" id="blog" class="no-underline shadow-5 dim ba white dtc v-btm h5 br4 b--light-gray">
                  <p className="f5 pa3 lh-copy measure-narrow">I do have a blog and I update it sometimes, just check it out!</p>
                </a>
              </div>
              <div class="fl w-100 w-40-ns pa2">
                <LastFm />
              </div>
            </div>
        </div>
      </Layout>
  )
}

export default Index


