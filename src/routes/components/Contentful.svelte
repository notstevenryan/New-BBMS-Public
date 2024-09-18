<script>
  import { onMount } from 'svelte';
  import Moment from 'moment';

  let entries = [];
  let currentPage = 1;
  const itemsPerPage = 3;
  let errorMessage = '';
  let contentfulClient;
  let loading = false; // Add loading state

  async function initializeContentful() {
    const { createClient } = await import('contentful');
    contentfulClient = createClient({
      space: 'g4027mkrwnn3',
      accessToken: '1LemAsBMnTt5PAJtk846SrUCQScy-w-eynZKx5_WpuA',
    });
  }

  async function fetchEntries(page = 1) {
    if (!contentfulClient) return;

    loading = true; // Show loading overlay

    try {
      const response = await contentfulClient.getEntries({
        order: '-sys.createdAt',
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
      });
      entries = response.items;
      errorMessage = ''; // Clear any previous errors
    } catch (error) {
      console.error('Error fetching content from Contentful:', error);
      errorMessage = 'An error occurred while fetching content. Please try again later.';
    } finally {
      loading = false; // Hide loading overlay
    }
  }

  function handlePageChange(page) {
    if (page > 0) {
      currentPage = page;
      fetchEntries(page);
    }
  }

  onMount(async () => {
    await initializeContentful();
    fetchEntries(currentPage);
  });
</script>

<style>
  .news-container {
    position: relative;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .entry {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    padding: 1.5rem;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .entry:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .entry img {
    border-radius: 8px;
    max-width: 150px;
    height: auto;
    flex-shrink: 0;
  }

  .entry .text-content {
    flex: 1;
  }

  .entry h2 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: #333;
  }

  .entry p {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: #666;
  }

  .entry .date {
    font-style: italic;
    color: #999;
  }

  .entry button {
    background-color: #D50000;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-align: center;
    transition: background-color 0.3s;
  }

  .entry button:hover {
    background-color: #9d0000;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .page-link {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 50%;
    text-decoration: none;
    color: #D50000;
    cursor: pointer;
    margin: 0 0.5rem;
    transition: background-color 0.3s, color 0.3s;
  }

  .page-link:hover {
    background-color: #980000;
    color: #fff;
  }

  .page-link:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }

  .error-message {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 8px;
  }
</style>

<main>
  <div class="container news-container">
    {#if loading}
      <div class="loading-overlay">Loading...</div>
    {/if}

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}

    {#each entries as entry}
      <div class="entry">
        {#if entry.fields.photo}
          <img src={entry.fields.photo.fields.file.url} alt={entry.fields.title} />
        {/if}
        <div class="text-content">
          <h2>{entry.fields.text}</h2>
          <p class="date">Published on: {Moment(entry.fields.postDate).format('LL')}</p>
          <p>{entry.fields.dialogue}</p>
          <button on:click={() => window.open(entry.fields.link, '_blank')}>Learn more</button>
        </div>
      </div>
    {/each}

    <!-- Pagination Controls -->
    <div class="pagination">
      <button
        class="page-link"
        on:click={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      <span>Page {currentPage}</span>
      <button
        class="page-link"
        on:click={() => handlePageChange(currentPage + 1)}
        disabled={entries.length < itemsPerPage}
      >
        &raquo;
      </button>
    </div>
  </div>
</main>
