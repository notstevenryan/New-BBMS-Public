<script> 
    import { onMount } from "svelte";
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";
    import { createClient } from "contentful";
    import Saos from "saos";
    import Moment from "moment";
    import img1 from "$lib/1.png";
    import img2 from "$lib/2.png";
    import img3 from "$lib/3.png";

    // START Contentful dick grabbing
    const contentfulClient = createClient({
        space: "g4027mkrwnn3",
        accessToken: "1LemAsBMnTt5PAJtk846SrUCQScy-w-eynZKx5_WpuA",
    });


    let entries = [];

    onMount(async () => {
    try {
        const response = await contentfulClient.getEntries({
        order: "-sys.createdAt",
        limit: 3,
        });
        entries = response.items;
        } 
    catch (error) {
        console.error("Error fetching content from Contentful:", error);
        }
    });
    function handleClick(link) {
        window.open(link, "_blank");
    }
    // END Contentful stuff

</script>

<style>

</style>

<head>

    <link rel="stylesheet" href="/src/lib/style.css" />
    <link
      rel="canonical"
      href="https://v5.getbootstrap.com/docs/5.0/examples/carousel/"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

</head>

<main>
    <!-- /START THE CAROUSEL|MAIN INFO -->
    <Splide
    aria-label="HomeCarousel"
    options={{ rewind: true, type: "loop", autoplay: "play" }}
  >
    <SplideSlide>
      <img style="width: 100%;" src={img1} alt="" />
    </SplideSlide>
    <SplideSlide>
      <img style="width: 100%;" src={img2} alt="" />
    </SplideSlide>
    <SplideSlide>
      <img style="width: 100%;" src={img3} alt="" />
    </SplideSlide>
  </Splide>
  <!-- /END THE CAROUSEL|MAIN INFO -->

<!-- /START THE FEATURETTES|NEWS -->

<div class="container marketing">
    <hr class="featurette-divider" />
    {#each entries as entry, index (entry.sys.id)}
      <div class="row featurette hidden">
        {#if index % 2 === 0}
          <div class="col-md-7">
            <Saos once={true} animation={"bounce-in-top 1.1s both"}>
              <!-- Content for even-indexed entries (image on the right) -->
              <h2 class="featurette-heading">{entry.fields.text}</h2>
              <p class="text-secondary">
                Published on: {Moment(entry.fields.postData).format("LL")}
              </p>
              <div style="white-space: pre-line;">
                {entry.fields.dialogue}
              </div>
              <button
                class="btn btn-danger my-2"
                on:click={() => handleClick(entry.fields.link)}
                target="_blank">Learn more.</button
              >
            </Saos>
          </div>
          <div class="col-md-5">
            <Saos
              once={true}
              animation={"tilt-in-fwd-tr .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both"}
            >
              <img
                class="featurette-image mx-auto"
                width="500"
                height="500"
                src={entry.fields.photo.fields.file.url}
                style="object-fit: cover;"
                alt={entry.fields.title}
              />
            </Saos>
          </div>
        {:else}
          <div class="col-md-5 order-md-2">
            <Saos once={true} animation={"bounce-in-top 1.1s both"}>
              <!-- Content for odd-indexed entries (image on the left) -->
              <h2 class="featurette-heading">{entry.fields.text}</h2>
              <p class="text-secondary fw-light">
                Published on: {Moment(entry.fields.postData).format("LL")}
              </p>
              <p>{entry.fields.dialogue}</p>
              <button
                class="btn btn-danger my-2"
                on:click={() => handleClick(entry.fields.link)}
                target="_blank">Learn more.</button
              >
            </Saos>
          </div>
          <div class="col-md-7 order-md-1">
            <Saos
              once={true}
              animation={"tilt-in-fwd-tr .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both"}
            >
              <img
                class="featurette-image mx-auto"
                width="500"
                height="500"
                src={entry.fields.photo.fields.file.url}
                style="object-fit: cover;"
                alt={entry.fields.title}
              />
            </Saos>
          </div>
        {/if}
      </div>
      <hr class="featurette-divider" />
    {/each}
  </div>
  <!-- END FEATURETTES|NEWS -->'
</main>