import React from 'react'
import Layout from '../components/Layout'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Container, Tailwind } from '../components/styles'

export default function Info({ frontmatter, markdownBody, title }) {
  return (
    <Tailwind>
        <Layout
        pathname="about"
        bgColor={frontmatter.background_color}
        siteTitle={title}
      >
        <Container>

          <section className="info_blurb">
            <ReactMarkdown source={markdownBody} />
          </section>
        </Container>
      </Layout>      
    </Tailwind>
  )
}

export async function getStaticProps() {
  const content = await import(`../data/info.md`)
  const config = await import(`../data/config.json`)
  const data = matter(content.default)

  return {
    props: {
      title: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}
