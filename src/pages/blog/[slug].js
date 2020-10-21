import 'regenerator-runtime/runtime'
import React from 'react';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/MainLayout'
import { Tailwind, Container } from '../../components/styles'

export default function PostTemplate(props) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options)
  }

  return (
    <Tailwind>
      <Layout
        siteTitle={props.title}
        siteDescription={props.description}
      >
        <Container>
          <h1>{props.frontmatter.title}</h1>
          <h2>{reformatDate(props.frontmatter.date)}</h2>
          <ReactMarkdown source={props.markdownBody} />
        </Container>
      </Layout>
    </Tailwind>
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
