import FetchPostMetaData from "../../features/blog/components/FetchPostMetaData";
import { PostMetadata } from "../../features/blog/components/PostMetaData"
import PostPreviews from "../../features/blog/components/PostPreviews"

const page = () => {
  const postMetaData = FetchPostMetaData();
  const postPreviews = postMetaData.map((post) => {
    return <PostPreviews key={post.slug} {...post} />
  });
  return (
    <div>
      <h1 className="italic text-5xl font-bold py-5 pb-8 border-b border-slate-400">Blog.</h1>
      <div className="grid md:grid-cols-2 gap-4 py-5">{postPreviews}</div>
    </div>
  )
}

export default page