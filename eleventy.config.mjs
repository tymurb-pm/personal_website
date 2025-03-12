import { DateTime } from "luxon";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function(eleventyConfig) {
    // ✅ Improved Date filter
    eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
        if (!dateObj) return ""; 
        if (typeof dateObj === "string") {
            dateObj = new Date(dateObj);
        }
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

    // ✅ Add dateISO filter for SEO-friendly timestamps
    eleventyConfig.addFilter("dateISO", (dateObj) => {
        if (!dateObj) return "";
        if (typeof dateObj === "string") {
            dateObj = new Date(dateObj);
        }
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
    });

    // ✅ Add absoluteUrl filter
    eleventyConfig.addFilter("absoluteUrl", (url, base) => {
        if (!url || !base) return url; 
        try {
            return new URL(url, base).href;
        } catch (e) {
            console.error(`Error generating absolute URL for: ${url}`, e);
            return url;
        }
    });

    // ✅ Pass through static assets
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/CV_Tymur_Buiadzhi_Project_Manager.pdf"); 
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/searchFilter.js"); 

    // ✅ Add blog post collection
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/*.md").reverse();
    });

    // ✅ RSS Feed Plugin
    eleventyConfig.addPlugin(feedPlugin, {
        type: "rss", 
        outputPath: "/feed.xml", 
        collection: {
            name: "posts", 
            limit: 10
        },
        metadata: {
            language: "en",
            title: "Tim's Blog",
            subtitle: "Thoughts on IT Project Management",
            base: "https://buiadzhi.com/", 
            author: {
                name: "Tim",
                email: "" 
            }
        }
    });

    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
};
