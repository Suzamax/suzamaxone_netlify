import React from 'react'
import matter from 'gray-matter'
import Layout from '../../components/MainLayout'
import BlogList from '../../components/BlogList'
import { Tailwind, Container } from '../../components/styles'

const BlogIndex = props => {
  return (
    <Tailwind>
      <Layout
        pathname="/blog"
        siteTitle={props.title}
        siteDescription={props.description}
      >
        <Container>
          <section>
            <h1>Entradas del blog</h1>
            <BlogList allBlogs={props.allBlogs} />
          </section>
        </Container>
      </Layout>
    </Tailwind>
  )
}

export default BlogIndex

export async function getStaticProps() {
  const siteConfig = await import(`../../data/config.json`)
  //get posts & context from folder
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../../posts', true, /\.md$/))

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
