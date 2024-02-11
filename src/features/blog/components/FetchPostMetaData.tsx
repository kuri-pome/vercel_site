import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetaData"

const FetchPostMetaData = (): PostMetadata[] => {
    const posts_folder = "src/features/blog/stores/posts";
    const post_files = fs.readdirSync(posts_folder);
    const md_post_files = post_files.filter((post_file) => post_file.endsWith(".md"));

    const posts = md_post_files.map((file_name) => {
        const file_content = fs.readFileSync(`${posts_folder}/${file_name}`, "utf8");
        const matterResult = matter(file_content);
        return {
            title: matterResult.data.title,
            datetime: matterResult.data.datetime,
            subtitle: matterResult.data.subtitle,
            slug: file_name.replace(".md", ""),
        };
    });
    return posts
}

export default FetchPostMetaData;