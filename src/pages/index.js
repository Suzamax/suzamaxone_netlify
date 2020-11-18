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
        <section id="whoami" className="pw3 pw5-ns pb5-ns bt bb b--black-10">
                <div className="mw9 center">
                <h2 className="f3 fw4 pa3 mv0 black">Who am i?</h2>

                    <div className="cf ph2-ns">
                        <div className="fl w-100 w-50-ns pa2">
                            <p className="f5 lh-copy measure-narrow bg-near-white o-90">I'm a open minded and curious person, ready to learn and develop new things using the right tools.
                            </p>
                            <p className="f5 lh-copy measure-narrow bg-near-white o-90">I study at Universidad de Murcia and develop sites alongside <a href="https://www.instagram.com/p/CHqTPPYBj8s/">my pet</a>.
                            </p>
                        </div>
                        <div className="fl w-100 w-50-ns tr pa2">
                            <p>Meow?</p>
                        </div>
                    </div>
                </div>
            </section>
        <LastFm />
      </Layout>
  )
}

export default Index


