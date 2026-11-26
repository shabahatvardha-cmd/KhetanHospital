// scripts/fetchBlogs.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchAllBlogs() {
  console.log("Fetching all blogs from drvatsalkhetan.com WordPress REST API...");

  const url = "https://drvatsalkhetan.com/wp-json/wp/v2/posts?per_page=100&_embed=true";
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const posts = await res.json();
    console.log(`Successfully fetched ${posts.length} posts!`);

    const formattedBlogs = posts.map(post => {
      // Extract categories from _embedded if available
      let categories = [];
      if (post._embedded && post._embedded['wp:term']) {
        post._embedded['wp:term'].forEach(termGroup => {
          termGroup.forEach(term => {
            if (term.taxonomy === 'category') {
              categories.push(term.name);
            }
          });
        });
      }

      // Featured image if available
      let featuredImage = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        featuredImage = post._embedded['wp:featuredmedia'][0].source_url || null;
      }

      // Clean HTML helper
      const cleanHtml = (html) => {
        if (!html) return '';
        return html
          .replace(/<[^>]*>?/gm, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&#8217;/g, "'")
          .replace(/&#8216;/g, "'")
          .replace(/&#8220;/g, '"')
          .replace(/&#8221;/g, '"')
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .replace(/&amp;/g, '&')
          .trim();
      };

      const title = cleanHtml(post.title?.rendered || '');
      const excerpt = cleanHtml(post.excerpt?.rendered || '');
      const rawHtmlContent = post.content?.rendered || '';
      const textContent = cleanHtml(rawHtmlContent);

      // Estimate read time
      const wordCount = textContent.split(/\s+/).length;
      const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

      // Format date
      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });

      return {
        id: post.id,
        slug: post.slug,
        title: title,
        date: formattedDate,
        rawDate: post.date,
        readTime: readTime,
        category: categories[0] || 'Orthopedics',
        allCategories: categories,
        featuredImage: featuredImage,
        excerpt: excerpt.length > 220 ? excerpt.slice(0, 220) + '...' : excerpt,
        rawHtml: rawHtmlContent,
        textContent: textContent
      };
    });

    const outputPath = path.join(__dirname, '../frontend/src/data/blogsData.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedBlogs, null, 2), 'utf-8');
    console.log(`Saved ${formattedBlogs.length} blogs to: ${outputPath}`);

  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    process.exit(1);
  }
}

fetchAllBlogs();
