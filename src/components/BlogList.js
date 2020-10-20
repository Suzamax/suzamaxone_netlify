import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import tw from 'twin.macro'

const BlogList = ({ allBlogs }) => {
  function truncateSummary(content) {
    return content.slice(0, 200).trimEnd()
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <>
      <Reverse className="list">
        {allBlogs.length > 1 &&
          allBlogs.map(post => {if (post.slug !== "undefined") return (
            <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
                <div>
                  <div className="hero_image">
                    <img
                      src={post.frontmatter.hero_image}
                      alt={post.frontmatter.hero_image}
                    />
                  </div>
                  <div className="blog__info">
                    <h2>{post.frontmatter.title}</h2>
                    <h3> {reformatDate(post.frontmatter.date)}</h3>
                    <p>
                      <ReactMarkdown
                        source={truncateSummary(post.markdownBody)}
                      />
                    </p>
                  </div>
                </div>
            </Link>
          )})}
      </Reverse>
    </>
  )
}

export default BlogList

const Reverse = styled.div`
  ${tw`flex flex-col-reverse`}
`