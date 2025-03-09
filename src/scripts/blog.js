document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const blogList = document.getElementById("blog-list");
    const categoryButtons = document.querySelectorAll(".category-filter");

    function filterPosts() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector(".category-filter.active")?.getAttribute("data-category") || "all";
        
        document.querySelectorAll(".post-item").forEach(post => {
            const title = post.getAttribute("data-title").toLowerCase();
            const content = post.getAttribute("data-content").toLowerCase();
            const category = post.getAttribute("data-category");

            const matchesSearch = title.includes(searchQuery) || content.includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

            post.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
        });
    }

    searchInput.addEventListener("input", filterPosts);

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterPosts();
        });
    });
});
