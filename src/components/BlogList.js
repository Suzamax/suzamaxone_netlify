import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import ta from 'styled-tachyons'
import LazyLoad from 'react-lazy-load'

const BlogList = ({ allBlogs }) => {
  function truncateSummary(content) {
    return content.slice(0, 200).trimEnd()
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <>
        {allBlogs.length >= 1 &&
          allBlogs.map(post => {if (post.slug !== "undefined") return (
            <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
                <Flex>
                <article className="bt bb b--black-10">
                  <a className="db pv4 ph3 ph0-l no-underline black dim" href="#0">
                    <div className="flex flex-column flex-row-ns">
                      <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                      <LazyLoad 
                          debounce={false}
                          offsetVertical={300}
                      >
                        <img src={post.frontmatter.hero_image}
                          alt={post.frontmatter.hero_image} classNameName="db" />
                      </LazyLoad>
                      </div>
                      <div className="w-100 w-60-ns pl3-ns">
                        <h1 className="f3 fw1 baskerville mt0 lh-title">{post.frontmatter.title}</h1>
                        <p className="f6 f5-l lh-copy">
                        <ReactMarkdown
                          source={post.frontmatter.description}
                        />
                        </p>
                        <p className="f6 lh-copy mv0">{reformatDate(post.frontmatter.date)}</p>
                        <h5 className="f6 ttu tracked black-80">{post.frontmatter.language}</h5>

                      </div>
                    </div>
                  </a>
                </article>
                    
                </Flex>
            </Link>
            
          )}).reverse()}
    </>
  )
}

export default BlogList

const Flex = styled.div`
  ${ta`flex`}
`