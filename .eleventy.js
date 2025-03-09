const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // ✅ Improved Date filter
    eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
        if (!dateObj) return ""; // Prevent errors on missing dates
        if (typeof dateObj === "string") {
            dateObj = new Date(dateObj); // Convert string to Date object
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
        if (!url || !base) return url; // Prevent errors on missing values
        try {
            return new URL(url, base).href;
        } catch (e) {
            console.error(`Error generating absolute URL for: ${url}`, e);
            return url; // Fallback to relative URL if error occurs
        }
    });

    // ✅ Pass through static assets
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/CV_Tymur_Buiadzhi_Project_Manager.pdf"); // Ensure correct CV path
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/searchFilter.js"); // ✅ Ensure JS file is copied

    // ✅ Add blog post collection
    eleventyConfig.addCollection("posts", function(collection) {
        let posts = collection.getFilteredByGlob("src/posts/*.md").reverse();
        console.log(`📄 Found ${posts.length} blog posts`); // Debugging output
        return posts;
    });

    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
};
