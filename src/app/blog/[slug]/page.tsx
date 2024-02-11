import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import parse from 'html-react-parser';


import FetchPostMetaData from "../../../features/blog/components/FetchPostMetaData";


const convertMarkdownFileToHtml = (content: string): string => {
    const html: string | Promise<string> = marked(content);
    return html.toString();
}

const getPostContent = (slug: string) => {
    const folder = "src/features/blog/stores/posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
};

export const generateStaticParams = async () => {
    const posts = FetchPostMetaData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
};

const page = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    const html = convertMarkdownFileToHtml(post.content);
    return (
        <div className="items-center justify-center">
            <article className="prose">
                {parse(html)};
            </article>
        </div>
    );
};

export default page;
