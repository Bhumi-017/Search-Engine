# Search-Engine
# Mini Search Engine for Articles

## Overview
The **Mini Search Engine** allows users to upload and search articles efficiently. This backend application simulates the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.

## Features
1. **Add Articles**: Upload articles with a title, content, and tags.
2. **Search Articles**: Perform keyword searches in the title or content of articles.
3. **Sort Results**: Sort search results by relevance or publication date.

## Requirements

### Endpoints:
- **Add Article (POST /articles)**: Allows users to add a new article with its metadata (title, content, and tags).
- **Search Articles (GET /articles/search)**: Allows users to search articles using keywords or tags.
- **Get Article (GET /articles/:id)**: Retrieve the full details of an article by its ID.

### Indexing:
- **In-Memory Index**: The system maintains an in-memory index for fast searches.
- **Relevance Calculation**: Relevance is determined by keyword frequency within the article's content and title.

## Solution Design

### Architecture:
- **Data Storage**: Articles are stored in arrays with an in-memory index for efficient searching.
- **Search Logic**: Text matching is used for search queries. Relevance-based sorting is implemented using keyword frequency.
- **Persistence (Optional)**: Article data can be optionally persisted using the `fs` module (file system) for long-term storage.

### Example Usage:
1. **Add an Article**:
   ```bash
   POST /articles
   {
     "title": "Understanding Search Engines",
     "content": "Search engines help us find information on the internet...",
     "tags": ["search", "technology"]
   }
