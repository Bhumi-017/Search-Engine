# Search-Engine
Mini Search Engine for Articles
Overview
The Mini Search Engine enables users to upload and search articles efficiently. This backend mimics
the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.
Features
1. Add articles with a title, content, and tags.
2. Search articles by keywords in the title or content.
3. Sort search results by relevance or date.
Requirements
● Endpoints:
○ Add Article (POST /articles): Add a new article with metadata.
○ Search Articles (GET /articles/search): Search articles by keyword or tag.
○ Get Article (GET /articles/:id): Retrieve full article details by ID.
● Indexing:
○ Maintain an in-memory index for quick searches.
○ Calculate relevance using keyword frequency.

Solution Design
● Use arrays to store articles with indexing for fast searches.
● Implement search logic with text matching and sorting by relevance.
● Use fs for optional persistence of articles.
