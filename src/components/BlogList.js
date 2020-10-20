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
                <Flex>
                    <Column1_6 className="hero_image">
                      <Img
                        src={post.frontmatter.hero_image}
                        alt={post.frontmatter.hero_image}
                      />
                    </Column1_6>
                    <Column5_6 className="blog__info">
                      <h2>{post.frontmatter.title}</h2>
                      <h3> {reformatDate(post.frontmatter.date)}</h3>
                      <p>
                        <ReactMarkdown
                          source={post.frontmatter.description}
                        />
                      </p>
                    </Column5_6>
                </Flex>
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

const Column5_6 = styled.div`
  ${tw`w-5/6`}
`
const Column1_6 = styled.div`
  ${tw`w-1/6`}
`

const Img = styled.img`
  ${tw`p-2`}
`

const Flex = styled.div`
  ${tw`flex`}
`