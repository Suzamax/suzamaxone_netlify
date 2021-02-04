import 'regenerator-runtime/runtime';
import React from 'react';
import Layout from '../components/MainLayout';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function Info({ frontmatter, markdownBody }) {
  return (
        <Layout
          pathname="about"
          bgColor={frontmatter.background_color}
          siteTitle={frontmatter.title}
        >

        <article class="mw9 center pa4 pt5-ns ph7-l">
        <a href="/" class="sans-serif black"> &lt; Back to the main page</a>

          <h1 class="f3 f1-m f-headline-l">Who am I?</h1>
          <section className="lh-copy measure mt4 mt0-ns info_blurb">
            <ReactMarkdown source={markdownBody} />

          </section>
        </article>
      </Layout>
  )
}

export async function getStaticProps() {
    const content = await import(`../data/info.md`);
    const config = await import(`../data/config.json`);
    const data = matter(content.default);

    return {
        props: {
            title: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}
