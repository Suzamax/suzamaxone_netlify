import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/MainLayout'
import { Tailwind, Container } from '../../components/styles'

export default function PostTemplate({ content, data }) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }
  
  // This holds the data between `---` from the .md file
  const frontmatter = data
  
  
  return (
    <Tailwind>
      <Layout>
        <Container>
          <h1>{frontmatter.title}</h1>
          <h2>{reformatDate(frontmatter.date)}</h2>
          <ReactMarkdown source={content} />
        </Container>
      </Layout>
    </Tailwind>
  )
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../posts/${slug}.md`)

  // Parse .md data through `matter`
  const data = matter(content.default)

  // Pass data to the component props
  return { ...data }
}
