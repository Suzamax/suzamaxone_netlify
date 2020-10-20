import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'

export default function Meta(props) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>{props.siteTitle}</title>
                <meta name="Description" content={props.description}></meta>
            </Head>
            <style jsx global>
                {`
                    * {
                        box-sizing: inherit;
                    }
                    html {
                        box-sizing: border-box;
                        overflow-y: scroll;
                    }
                    body {
                        margin: 0;
                        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
                        overflow-x: hidden;
                        font-size: 16px;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    body.dark-mode {
                        background-color: #1a202c;
                        color: #f7fafc;
                    }
                    body.light-mode {
                        color: #2d3748;
                        background-color: #f7fafc;
                    }
                    a {
                        text-decoration: none;
                        color: inherit;
                        transition: opacity 0.2s ease;
                    }
                    a:hover {
                    transition: opacity 0.2s ease;
                    opacity: 0.5;
                    text-decoration-color: inherit;
                    }
                    
                    img {
                    max-width: 100%;
                    }
                    img, figure, table, fieldset  {
                    margin-left: 0;
                    margin-right: 0;
                    margin-top: 0;
                    padding-bottom: 0;
                    padding-left: 0;
                    padding-right: 0;
                    padding-top: 0;
                    margin-bottom: 1.45rem;
                    }
                    pre {
                    margin-left: 0;
                    margin-right: 0;
                    margin-top: 0;
                    margin-bottom: 1.45rem;
                    font-size: 0.85rem;
                    line-height: 1.42;
                    background: hsla(0, 0%, 0%, 0.04);
                    border-radius: 3px;
                    overflow: auto;
                    word-wrap: normal;
                    padding: 1.45rem;
                    }
                    table {
                    font-size: 1rem;
                    line-height: 1.45rem;
                    border-collapse: collapse;
                    width: 100%;
                    }
                    blockquote {
                    margin-left: 1.45rem;
                    margin-right: 1.45rem;
                    margin-top: 0;
                    padding-bottom: 0;
                    padding-left: 0;
                    padding-right: 0;
                    padding-top: 0;
                    margin-bottom: 1.45rem;
                    }
                    strong {
                    font-weight: bold;
                    }
                    
                    code {
                    font-size: 0.85rem;
                    line-height: 1.45rem;
                    }
                    {/* //TYPOGRAPHY------------------------------------- */}
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    p {
                        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
                        margin-left: 0;
                        margin-right: 0;
                        margin-top: 0;
                        padding-bottom: 0;
                        padding-left: 0;
                        padding-right: 0;
                        padding-top: 0;
                        margin-bottom: 1.45rem;
                        color: inherit;
                        text-rendering: optimizeLegibility;
                    }
                    h1,
                    h2 {
                    font-weight: 500;
                    }
                    h1 {
                    font-size: 2rem;
                    letter-spacing: -1px;
                    line-height: 1.1875;
                    }
                    h2 {
                    font-size: 1.7rem;
                    letter-spacing: -0.75px;
                    line-height: 1.2;
                    }
                    h3 {
                    font-size: 1.2rem;
                    letter-spacing: -0.5px;
                    line-height: 1.1875;
                    font-weight: normal;
                    }
                    p {
                    font-size: 1.2rem;
                    letter-spacing: -0.5px;
                    line-height: 1.5;
                    }
                    @media (min-width: 1280px) {
                        h1 {
                            font-size: 2rem;
                            letter-spacing: -1px;
                            line-height: 1.1875;
                        }
                        h2 {
                            font-size: 1.5rem;
                            letter-spacing: -0.75px;
                            line-height: 1.1667;
                        }
                        h3 {
                            font-size: 1rem;
                            letter-spacing: -0.5px;
                            line-height: 1.1875;
                            font-weight: normal;
                        }
                        p {
                            line-height: 1.4375;
                        }
                    }
                 `}
            </style>
        </>
    )
}