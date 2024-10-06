<script>
    import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
    let showVideo = false;
  
    const toggleVideo = () => {
      showVideo = !showVideo;
    }
  </script>
  
  <style>
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background-color: #f4f4f4;
    }
  
    .hero h1 {
      font-size: 3.5rem;
      color: #333;
    }
  
    .hero p {
      font-size: 1.5rem;
      margin: 1rem 0 2.5rem 0;
      color: #555;
    }
  
    .cta-buttons {
      margin-top: 2rem;
    }
  
    .cta-button, .try-now-button {
      background-color: #6200ea;
      border: none;
      color: white;
      padding: 0.9rem 2rem;
      font-size: 1.1rem;
      cursor: pointer;
      border-radius: 5px;
      margin: 0.5rem;
    }
  
    .cta-button:hover, .try-now-button:hover {
      background-color: #6200ea;
    }
  
    .features {
      display: flex;
      justify-content: space-around;
      margin-top: 3.5rem;
    }
  
    .features div {
      max-width: 300px;
      padding: 1rem;
      text-align: left;
    }
  
    .features h3 {
      color: #6200ea;
      margin-bottom: 0.75rem;
    }
  
    .features p {
      color: #444;
      font-size: 1.1rem;
    }
  
    .video {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }
  
    .video iframe {
      width: 80%;
      max-width: 700px;
      height: 400px;
    }
  
    .extended-section {
      margin-top: 4rem;
      background-color: #fafafa;
      padding: 3rem 2rem;
      text-align: center;
    }
  
    .extended-section h2 {
      color: #333;
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
  
    .extended-section p {
      font-size: 1.25rem;
      color: #666;
      max-width: 900px;
      margin: 0 auto;
      line-height: 1.75;
    }
  </style>

  <Header/>
  
  <section class="hero">
    <h1>Regain Your Sense of Time</h1>
    <p>TimeFlow helps you live in the moment without relying on your smartphone. Track your day, stay productive, and be present.</p>
  
    <div class="cta-buttons">
      <!-- <button class="cta-button" on:click={toggleVideo}>
        {showVideo ? 'Hide Demo' : 'Watch Demo'}
      </button> -->
      <a href="/dashboard">
        <button class="try-now-button">
          Try Now
        </button>
      </a>
    </div>
  
    {#if showVideo}
    <div class="video">
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
    </div>
    {/if}
  
    <div class="features">
      <div>
        <h3>Track Time Effortlessly</h3>
        <p>No need to look at your phone to know what time it is. Focus on your work, and TimeFlow will remind you.</p>
      </div>
      <div>
        <h3>Be More Productive</h3>
        <p>Set time goals, and let TimeFlow guide you through the day without the need for constant checking.</p>
      </div>
      <div>
        <h3>Stay Mindful</h3>
        <p>TimeFlow encourages mindfulness by allowing you to experience time naturally rather than digitally.</p>
      </div>
    </div>
  </section>
  
  <section class="extended-section">
    <h2>Why Choose TimeFlow?</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Ut pulvinar, urna et vulputate auctor, leo justo tempus neque, eget mollis ligula ipsum ut elit. Nam euismod, metus sed dapibus tincidunt, elit turpis vehicula tortor, at fermentum massa orci nec orci. Integer sit amet vestibulum lacus. Phasellus quis dolor ultricies, venenatis magna eget, scelerisque felis.
    </p>
  </section>
  
  <section class="extended-section">
    <h2>Regain Control Over Your Day</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut magna nec nisi facilisis lacinia. Quisque interdum mauris ut lectus fringilla, vel gravida libero luctus. Vestibulum consectetur, risus ut malesuada sodales, orci nunc viverra sem, sit amet viverra mauris lacus at metus. Praesent at libero nec neque commodo accumsan at et eros. Nam ut tincidunt dui. Cras porttitor mi vel lacus cursus, nec pulvinar eros sagittis.
    </p>
  </section>

  <Footer/>
  