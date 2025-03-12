document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const categoryButtons = document.querySelectorAll(".category-filter");
    const posts = document.querySelectorAll(".post-item");

    function filterPosts() {
        let searchText = searchInput.value.toLowerCase();
        let activeCategory = document.querySelector(".category-filter.active")?.dataset.category || "all";

        posts.forEach(post => {
            let title = post.dataset.title.toLowerCase();
            let content = post.dataset.content.toLowerCase();
            let category = post.dataset.category.toLowerCase(); // Use category field

            let matchesSearch = title.includes(searchText) || content.includes(searchText);
            let matchesCategory = (activeCategory === "all" || category === activeCategory.toLowerCase());

            post.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
        });
    }

    // Listen for search input
    searchInput.addEventListener("input", filterPosts);

    // Handle category buttons
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterPosts();
        });
    });
});
