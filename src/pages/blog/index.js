import 'regenerator-runtime/runtime'
import React from 'react';
import matter from 'gray-matter'
import Layout from '../../components/MainLayout'
import BlogList from '../../components/BlogList'

const BlogIndex = props => {
  return (
    <>
      <Layout
        pathname="/blog"
        siteTitle="Blog"
        siteDescription={props.description}
      >
          <section className="mw9 center pa4 pt5-ns ph7-l center avenir">
            <a href="/" class="sans-serif black"> &lt; Back to the main page</a>
          <h1 className="baskerville fw1 ph3 ph0-l">Carlos' Blog</h1>
            <BlogList allBlogs={props.allBlogs} />
          </section>
      </Layout>
    </>
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
