import { redirect } from 'next/navigation'
// import { NEXT_PUBLIC_URL } from '../../server-constants'
import { Post } from '../../../lib/notion/interfaces'
import GoogleAnalytics from '../../../components/google-analytics'
import {
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
} from '../../../components/blog-parts'
// import SocialButtons from '../../../components/social-buttons'
import styles from '../../../styles/blog.module.css'
// import { getBlogLink } from '../../../lib/blog-helpers'
import {
  getAllPosts,
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../../../lib/notion/client'

export const revalidate = 30

export async function generateStaticParams() {
  const posts :Post[]= await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const BlogSlugPage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    redirect('/blog')
  }

  const [
    blocks,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId)
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.post}>
            {/* <PostDate post={post} /> */}
            <PostTags post={post} />
            <PostTitle post={post} enableLink={false} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />

            {/* <footer>
              {NEXT_PUBLIC_URL && (
                <SocialButtons
                  title={post.Title}
                  url={new URL(
                    getBlogLink(post.Slug),
                    NEXT_PUBLIC_URL
                  ).toString()}
                  id={post.Slug}
                />
              )}
            </footer> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogSlugPage
