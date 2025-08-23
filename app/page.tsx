import { NUMBER_OF_POSTS_PER_PAGE } from '../app/server-constants'
import GoogleAnalytics from '../components/google-analytics'
import {
  // BlogTagLink,
  NextPageLink,
  NoContents,
  PostTags,
  PostTitle
} from '../components/blog-parts'
import styles from '../styles/blog.module.css'
import {
  getPosts,
  // getAllTags,
} from '../lib/notion/client'
import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'

export const revalidate = 60

const BlogPage = async () => {
  const [posts] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    // getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          {posts.map(post => {
            return (
              <div className={styles.post} key={post.Slug}>
                {/* <PostDate post={post} /> */}
                <PostTags post={post} />
                <PostTitle post={post} />
              </div>
            )
          })}

          <footer>
            <NextPageLink posts={posts} />
          </footer>
        </div>

        {/* <div className={styles.subContent}>
          <BlogTagLink heading="Categories" tags={tags} />
        </div> */}
      </div>
    </>
  )
}

export default BlogPage
