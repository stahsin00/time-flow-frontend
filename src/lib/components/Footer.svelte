<script>
    // You can add any dynamic logic if needed, such as fetching the current year.
    let currentYear = new Date().getFullYear();
  </script>
  
  <footer class="footer">
    <div class="footer-content">
      <div class="links">
        <a href="https://github.com/stahsin00/time-flow-frontend" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://devpost.com/software/timeflow-u3hjr0" target="_blank" rel="noopener noreferrer">
          Devpost
        </a>
      </div>
      <div class="copyright">
        &copy; {currentYear} TimeFlow. All rights reserved.
        <!-- &copy; 2024 - {currentYear} TimeFlow. All rights reserved. -->
      </div>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: #6200ea;
      color: #f1f1f1;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #444;
    }
  
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .links {
      margin-bottom: 10px;
    }
  
    .links a {
      color: #f1f1f1;
      margin: 0 15px;
      text-decoration: none;
      transition: color 0.3s ease;
    }
  
    .links a:hover {
      color: #00bcd4; /* Change to your preferred hover color */
    }
  
    .copyright {
      margin-top: 5px;
    }
  
    @media (min-width: 600px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto;
      }
      .links {
        margin-bottom: 0;
      }
    }
  </style>
  