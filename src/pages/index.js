import React from 'react'
import matter from 'gray-matter'
import Layout from '../components/MainLayout'
import BlogList from '../components/BlogList'
import { Tailwind, Container } from '../components/styles'
import Footer from '../components/Footer'

const Index = props => {
  return (
    <Tailwind>
      <Layout
        pathname="/"
        siteTitle={props.title}
        siteDescription={props.description}
      >
        <Container>
        <h1>¡Hola! 👋</h1>
        <p>Soy un estudiante de ingeniería informática en la Universidad de Murcia.</p>
        <p>También soy administrador de sistemas. Desarrollo webs, y me preparo para ser desarrollador y operador de sistemas (DevOps).</p>
        <p>Esta web tiene mi blog y un CV actualizado (clic en Sobre mí).</p>
          <section>
            <h1>Últimas entradas</h1>
            <BlogList allBlogs={props.allBlogs} />
          </section>
        </Container>
      </Layout>
      <Footer />
    </Tailwind>
  )
}

export default Index

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)
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
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
