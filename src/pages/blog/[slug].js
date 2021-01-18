import 'regenerator-runtime/runtime'
import React from 'react';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/MainLayout'

export default function PostTemplate(props) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options)
  }

  return (
      <Layout
        siteTitle={props.frontmatter.title}
        siteDescription={props.frontmatter.description}
      >
        <article>
          <div className="bg-blue sans-serif">
            <div className="mw9 center pa4 pt5-ns ph7-l">
              <time className="f6 mb2 dib ttu tracked"><small>{reformatDate(props.frontmatter.date)}</small></time>
              <h3 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span className="bg-black-90 lh-copy white pa1 tracked-tight">
                {props.frontmatter.title}
              </span>
              </h3>
              <h4 className="f3 fw1 georgia i">{props.frontmatter.description}</h4>
              <h5 className="f6 ttu tracked black-80">{props.frontmatter.language}</h5>
            </div>
          </div>
          <div className="pa4 ph7-l georgia mw9-l center">
            <ReactMarkdown source={props.markdownBody} />
          </div>
        </article>
      </Layout>
  )
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), 'src/posts'))
    .map((blogName) => {
      const trimmedName = blogName.substring(0, blogName.length - 3)
      return {
        params: { slug: trimmedName },
      }
    })

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  }
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params

  const content = await import(`../../posts/${slug}.md`).catch(
    () => null
  )
  const config = await import(`../../data/config.json`)

  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

