import { NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  // ReadMoreLink,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'
import { NEXT_PUBLIC_SITE_TITLE } from '../server-constants'

export const revalidate = 60

const BlogPage = async () => {
  const [posts,rankedPosts, tags] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getRankedPosts(),
    getAllTags(),
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
                <PostDate post={post} />
                <PostTags post={post} />
                <PostTitle post={post} />
                <PostExcerpt post={post} />
                {/* <ReadMoreLink post={post} />  */}
              </div>
            )
          })}

          <footer>
            <NextPageLink posts={posts} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogPage
