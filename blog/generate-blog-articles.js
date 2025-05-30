// Script to generate blog article HTML files

const fs = require('fs');
const path = require('path');

// Blog article data
const blogArticles = [
  {
    slug: 'monetization-strategies',
    title: '10 Proven YouTube Monetization Strategies Beyond AdSense',
    description: 'Learn how YouTube\'s latest algorithm changes affect your channel growth and what strategies work best in 2025.',
    date: 'May 20, 2025',
    author: 'Priya Patel',
    category: 'Monetization',
    tags: ['monetization', 'youtube-revenue', 'brand-deals', 'sponsorships', 'merchandise'],
    image: 'monetization.jpg'
  },
  {
    slug: 'content-strategy',
    title: 'Developing a Winning Content Strategy for YouTube in 2025',
    description: 'Create a content plan that attracts viewers, builds your audience, and keeps them coming back for more.',
    date: 'May 15, 2025',
    author: 'Vikram Singh',
    category: 'Content Strategy',
    tags: ['content-strategy', 'content-planning', 'youtube-growth', 'audience-building'],
    image: 'content-strategy.jpg'
  },
  {
    slug: 'youtube-shorts',
    title: 'YouTube Shorts: How to Leverage Short-Form Content for Channel Growth',
    description: 'Maximize the potential of YouTube Shorts to drive subscribers and views to your main content.',
    date: 'May 10, 2025',
    author: 'Ananya Gupta',
    category: 'Video Strategy',
    tags: ['youtube-shorts', 'short-form-content', 'vertical-video', 'tiktok-alternative'],
    image: 'youtube-shorts.jpg'
  },
  {
    slug: 'seo-for-youtube',
    title: 'Advanced SEO Techniques for YouTube: Ranking Higher in Search Results',
    description: 'Optimize your videos to appear in both YouTube and Google search results with these proven SEO tactics.',
    date: 'May 5, 2025',
    author: 'Rahul Sharma',
    category: 'YouTube SEO',
    tags: ['youtube-seo', 'video-optimization', 'search-ranking', 'keywords'],
    image: 'youtube-seo.jpg'
  },
  {
    slug: 'audience-retention',
    title: 'Mastering Audience Retention: Keep Viewers Watching Longer',
    description: 'Learn the psychological principles and editing techniques that keep viewers engaged throughout your videos.',
    date: 'April 30, 2025',
    author: 'Neha Kapoor',
    category: 'Video Optimization',
    tags: ['audience-retention', 'watch-time', 'engagement', 'video-editing'],
    image: 'audience-retention.jpg'
  },
  {
    slug: 'youtube-analytics',
    title: 'Mastering YouTube Analytics: Key Metrics Every Creator Should Track',
    description: 'Learn which metrics matter most and how to use data to make informed content decisions.',
    date: 'April 25, 2025',
    author: 'Arjun Mehta',
    category: 'Analytics',
    tags: ['youtube-analytics', 'metrics', 'data-analysis', 'channel-growth'],
    image: 'youtube-analytics.jpg'
  },
  {
    slug: 'thumbnail-design',
    title: 'Thumbnail Design Psychology: Create Thumbnails That Get Clicks',
    description: 'The science behind effective thumbnails and how to design ones that stand out in a crowded feed.',
    date: 'April 20, 2025',
    author: 'Divya Sharma',
    category: 'Video Optimization',
    tags: ['thumbnails', 'click-through-rate', 'graphic-design', 'psychology'],
    image: 'thumbnail-design.jpg'
  },
  {
    slug: 'youtube-community',
    title: 'Building a Loyal YouTube Community: Beyond Subscribers and Views',
    description: 'Strategies to foster a dedicated community that supports your channel for the long term.',
    date: 'April 15, 2025',
    author: 'Vikram Singh',
    category: 'Community Building',
    tags: ['community', 'audience-engagement', 'loyalty', 'membership'],
    image: 'youtube-community.jpg'
  },
  {
    slug: 'video-equipment',
    title: 'Essential Video Equipment for YouTube Creators in 2025',
    description: 'The must-have cameras, microphones, lighting, and accessories for professional-quality videos.',
    date: 'April 10, 2025',
    author: 'Rahul Sharma',
    category: 'Production',
    tags: ['equipment', 'cameras', 'microphones', 'lighting', 'video-quality'],
    image: 'video-equipment.jpg'
  },
  {
    slug: 'youtube-sponsorships',
    title: 'How to Land Your First YouTube Sponsorship Deal',
    description: 'A step-by-step guide to attracting brand partnerships and negotiating favorable terms.',
    date: 'April 5, 2025',
    author: 'Priya Patel',
    category: 'Monetization',
    tags: ['sponsorships', 'brand-deals', 'negotiations', 'monetization'],
    image: 'youtube-sponsorships.jpg'
  },
  {
    slug: 'youtube-copyright',
    title: 'Navigating Copyright on YouTube: Protect Your Content and Avoid Strikes',
    description: 'Understanding fair use, content ID, and how to deal with copyright claims on your videos.',
    date: 'March 30, 2025',
    author: 'Ananya Gupta',
    category: 'Legal',
    tags: ['copyright', 'fair-use', 'content-id', 'legal-issues'],
    image: 'youtube-copyright.jpg'
  },
  {
    slug: 'video-editing',
    title: 'Video Editing Techniques That Keep Viewers Engaged',
    description: 'Learn professional editing tricks to create dynamic, engaging videos that viewers watch to the end.',
    date: 'March 25, 2025',
    author: 'Neha Kapoor',
    category: 'Production',
    tags: ['video-editing', 'post-production', 'engagement', 'pacing'],
    image: 'video-editing.jpg'
  },
  {
    slug: 'youtube-niches',
    title: 'Profitable YouTube Niches for 2025: Finding Your Perfect Content Category',
    description: 'Discover untapped and high-potential niches that offer growth opportunities on YouTube.',
    date: 'March 20, 2025',
    author: 'Arjun Mehta',
    category: 'Strategy',
    tags: ['niches', 'content-categories', 'market-research', 'competition'],
    image: 'youtube-niches.jpg'
  },
  {
    slug: 'youtube-titles',
    title: 'Crafting Irresistible YouTube Titles: The Science of Getting Clicks',
    description: 'Learn the psychological triggers and formulas for creating titles that drive views and engagement.',
    date: 'March 15, 2025',
    author: 'Divya Sharma',
    category: 'Video Optimization',
    tags: ['titles', 'click-through-rate', 'copywriting', 'psychology'],
    image: 'youtube-titles.jpg'
  },
  {
    slug: 'youtube-descriptions',
    title: 'Optimizing YouTube Descriptions for Search and Conversion',
    description: 'How to write descriptions that rank in search and drive viewers to take action.',
    date: 'March 10, 2025',
    author: 'Rahul Sharma',
    category: 'YouTube SEO',
    tags: ['descriptions', 'seo', 'calls-to-action', 'metadata'],
    image: 'youtube-descriptions.jpg'
  },
  {
    slug: 'youtube-studio',
    title: 'Setting Up a Professional YouTube Studio on Any Budget',
    description: 'Create a dedicated recording space that produces professional results, whether you have $500 or $5,000.',
    date: 'March 5, 2025',
    author: 'Vikram Singh',
    category: 'Production',
    tags: ['studio-setup', 'home-studio', 'recording-space', 'equipment'],
    image: 'youtube-studio.jpg'
  },
  {
    slug: 'youtube-collaborations',
    title: 'Strategic YouTube Collaborations: Finding the Right Partners for Growth',
    description: 'How to identify, approach, and collaborate with other creators to expand your audience.',
    date: 'February 28, 2025',
    author: 'Priya Patel',
    category: 'Growth Strategy',
    tags: ['collaborations', 'partnerships', 'networking', 'cross-promotion'],
    image: 'youtube-collaborations.jpg'
  },
  {
    slug: 'youtube-live',
    title: 'YouTube Live Streaming: Building Real-Time Engagement with Your Audience',
    description: 'Strategies and best practices for successful live streams that build community and generate revenue.',
    date: 'February 25, 2025',
    author: 'Ananya Gupta',
    category: 'Live Streaming',
    tags: ['live-streaming', 'real-time-engagement', 'super-chat', 'live-events'],
    image: 'youtube-live.jpg'
  },
  {
    slug: 'youtube-automation',
    title: 'YouTube Workflow Automation: Tools to Save Time and Increase Productivity',
    description: 'Streamline your content creation process with these time-saving tools and techniques.',
    date: 'February 20, 2025',
    author: 'Arjun Mehta',
    category: 'Productivity',
    tags: ['automation', 'workflow', 'productivity', 'tools'],
    image: 'youtube-automation.jpg'
  },
  {
    slug: 'youtube-storytelling',
    title: 'The Art of Storytelling on YouTube: Crafting Compelling Narratives',
    description: 'How to use storytelling techniques to create emotionally engaging videos that resonate with viewers.',
    date: 'February 15, 2025',
    author: 'Neha Kapoor',
    category: 'Content Creation',
    tags: ['storytelling', 'narrative', 'emotional-engagement', 'script-writing'],
    image: 'youtube-storytelling.jpg'
  },
  {
    slug: 'youtube-trends',
    title: 'Capitalizing on YouTube Trends Without Compromising Your Brand',
    description: 'How to leverage trending topics while staying authentic to your channel\'s identity.',
    date: 'February 10, 2025',
    author: 'Divya Sharma',
    category: 'Content Strategy',
    tags: ['trends', 'viral-content', 'timeliness', 'relevance'],
    image: 'youtube-trends.jpg'
  },
  {
    slug: 'youtube-channel-audit',
    title: 'Conducting a YouTube Channel Audit: Identify Growth Opportunities',
    description: 'A comprehensive guide to evaluating your channel\'s performance and finding areas for improvement.',
    date: 'February 5, 2025',
    author: 'Rahul Sharma',
    category: 'Channel Growth',
    tags: ['channel-audit', 'performance-analysis', 'optimization', 'growth-strategy'],
    image: 'youtube-channel-audit.jpg'
  },
  {
    slug: 'youtube-branding',
    title: 'Building a Distinctive YouTube Brand That Stands Out',
    description: 'Create a memorable channel identity with consistent visual elements, voice, and content themes.',
    date: 'January 30, 2025',
    author: 'Priya Patel',
    category: 'Branding',
    tags: ['branding', 'channel-identity', 'visual-identity', 'consistency'],
    image: 'youtube-branding.jpg'
  },
  {
    slug: 'youtube-subscribers',
    title: 'From 0 to 10,000 Subscribers: A Roadmap for New YouTube Creators',
    description: 'Strategic milestones and actionable tactics to help new creators build their first substantial audience.',
    date: 'January 25, 2025',
    author: 'Vikram Singh',
    category: 'Channel Growth',
    tags: ['subscribers', 'new-creators', 'growth-strategy', 'milestones'],
    image: 'youtube-subscribers.jpg'
  },
  {
    slug: 'youtube-merchandise',
    title: 'Creating and Selling Merchandise for Your YouTube Channel',
    description: 'A complete guide to designing, producing, and marketing merchandise that your audience will love.',
    date: 'January 20, 2025',
    author: 'Ananya Gupta',
    category: 'Monetization',
    tags: ['merchandise', 'merch', 'product-design', 'e-commerce'],
    image: 'youtube-merchandise.jpg'
  },
  {
    slug: 'youtube-burnout',
    title: 'Preventing Creator Burnout: Sustainable Content Creation Strategies',
    description: 'How to maintain a consistent upload schedule without sacrificing your mental health and creativity.',
    date: 'January 15, 2025',
    author: 'Neha Kapoor',
    category: 'Creator Lifestyle',
    tags: ['burnout', 'mental-health', 'work-life-balance', 'sustainability'],
    image: 'youtube-burnout.jpg'
  },
  {
    slug: 'youtube-thumbnails',
    title: 'A/B Testing YouTube Thumbnails: Data-Driven Design Decisions',
    description: 'How to systematically test and improve your thumbnails to maximize click-through rates.',
    date: 'January 10, 2025',
    author: 'Arjun Mehta',
    category: 'Video Optimization',
    tags: ['a/b-testing', 'thumbnails', 'data-analysis', 'click-through-rate'],
    image: 'youtube-thumbnails.jpg'
  },
  {
    slug: 'youtube-comments',
    title: 'Leveraging YouTube Comments for Content Ideas and Community Building',
    description: 'Turn your comment section into a valuable resource for engagement and future video topics.',
    date: 'January 5, 2025',
    author: 'Divya Sharma',
    category: 'Community Building',
    tags: ['comments', 'engagement', 'community', 'content-ideas'],
    image: 'youtube-comments.jpg'
  },
  {
    slug: 'youtube-case-studies',
    title: '5 YouTube Success Stories: Channels That Exploded in 2024 (And Why)',
    description: 'Analysis of breakout YouTube channels and the strategies that fueled their rapid growth.',
    date: 'January 1, 2025',
    author: 'Rahul Sharma',
    category: 'Case Studies',
    tags: ['case-studies', 'success-stories', 'channel-analysis', 'growth-strategies'],
    image: 'youtube-case-studies.jpg'
  },
  {
    slug: 'youtube-future',
    title: 'The Future of YouTube: Predictions and Trends for 2026 and Beyond',
    description: 'Expert forecasts on how the platform will evolve and how creators can prepare for coming changes.',
    date: 'December 25, 2024',
    author: 'Vikram Singh',
    category: 'Industry Trends',
    tags: ['future-trends', 'predictions', 'platform-changes', 'creator-economy'],
    image: 'youtube-future.jpg'
  }
];

// HTML template for blog articles
function generateArticleHTML(article) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <base href="/">
  <title>${article.title} | Social Brains YouTube Agency</title>
  <meta name="description" content="${article.description}">
  <meta name="keywords" content="${article.tags.join(', ')}, youtube growth, social media marketing">
  <link rel="stylesheet" href="styles.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
  <link rel="stylesheet" href="blog/blog-styles.css">
</head>
<body>
  <header class="custom-header">
    <div class="brand-logo">
      <a href="/">
        <img src="assets/brand-logo_cleaned.png" alt="YouTube Agency Logo" class="logo-img">
      </a>
    </div>

    <nav class="site-nav">
      <input type="checkbox" id="nav-trigger" class="nav-trigger" />
      <label for="nav-trigger">
        <span></span>
        <span></span>
        <span></span>
      </label>
      
      <ul class="nav-links">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/#who-we-are" class="nav-link">Who We Are</a></li>
        <li><a href="/#why-social-media" class="nav-link">Why Social Media?</a></li>
        <li><a href="/#how-we-work" class="nav-link">How We Work</a></li>
        <li><a href="/#why-choose-us" class="nav-link">Why Choose Us</a></li>
        <li><a href="/blog" class="nav-link active">Blog</a></li>
        <li><a href="/#contact" class="nav-link">Contact</a></li>
      </ul>
    </nav>
  </header>

  <div class="blog-post">
    <div class="blog-post-header">
      <div class="blog-post-meta">
        <div><i class="far fa-calendar"></i> ${article.date}</div>
        <div><i class="far fa-user"></i> By ${article.author}</div>
        <div><i class="far fa-folder"></i> ${article.category}</div>
      </div>
      <h1 class="blog-post-title">${article.title}</h1>
    </div>

    <div class="blog-post-featured-image">
      <img src="blog/images/${article.image}" alt="${article.title}">
    </div>

    <div class="blog-post-content">
      <p>${article.description}</p>

      <h2>Key Points About ${article.category}</h2>
      
      <p>As a YouTube creator or brand looking to grow on the platform, understanding the best practices for ${article.category.toLowerCase()} is crucial for your success. In this comprehensive guide, we'll break down the essential strategies and provide actionable tips to help you improve your channel.</p>
      
      <h3>Why ${article.category} Matters for Your YouTube Channel</h3>
      <p>Effective ${article.category.toLowerCase()} can significantly impact your channel's growth and success. Here's why it's important:</p>
      <ul>
        <li>Increases visibility and discoverability</li>
        <li>Improves audience engagement and retention</li>
        <li>Helps build a loyal community around your content</li>
        <li>Creates opportunities for monetization and partnerships</li>
        <li>Sets your channel apart from competitors</li>
      </ul>
      
      <h3>Best Practices for ${article.category} in 2025</h3>
      <p>The YouTube landscape continues to evolve, and staying updated with the latest best practices is essential. Here are some key strategies to implement:</p>
      <ul>
        <li>Research your target audience thoroughly to understand their preferences</li>
        <li>Analyze successful channels in your niche for inspiration</li>
        <li>Create a consistent posting schedule that works for your workflow</li>
        <li>Focus on quality over quantity to build a strong reputation</li>
        <li>Utilize analytics to refine and improve your approach</li>
      </ul>
      
      <blockquote>
        "The most successful YouTube creators are those who consistently implement effective ${article.category.toLowerCase()} strategies while staying true to their unique voice and perspective." - YouTube Creator Academy
      </blockquote>
      
      <h2>Implementing ${article.category} Strategies for Your Channel</h2>
      
      <p>Now that you understand the importance of ${article.category.toLowerCase()}, let's explore how to implement these strategies for your specific channel:</p>
      
      <h3>1. Assess Your Current Approach</h3>
      <p>Before making changes, evaluate your current ${article.category.toLowerCase()} strategy:</p>
      <ul>
        <li>Review your channel analytics to identify strengths and weaknesses</li>
        <li>Gather feedback from your audience about what they enjoy</li>
        <li>Compare your performance metrics to industry benchmarks</li>
        <li>Identify content themes that resonate most with your viewers</li>
      </ul>
      
      <h3>2. Develop a Strategic Plan</h3>
      <p>Based on your assessment, create a comprehensive plan:</p>
      <ul>
        <li>Set specific, measurable goals for your channel</li>
        <li>Create a content calendar to organize your publishing schedule</li>
        <li>Plan for seasonal trends and important events in your niche</li>
        <li>Allocate resources effectively based on what performs best</li>
      </ul>
      
      <h3>3. Execute and Optimize</h3>
      <p>Implement your strategy with a focus on continuous improvement:</p>
      <ul>
        <li>Monitor performance metrics closely after implementing changes</li>
        <li>A/B test different approaches to find what works best</li>
        <li>Stay flexible and adapt to platform changes and audience feedback</li>
        <li>Regularly update your strategy based on results and new trends</li>
      </ul>

      <h2>Case Studies: Successful ${article.category} Implementation</h2>
      
      <p>Let's examine how successful YouTube channels have implemented effective ${article.category.toLowerCase()} strategies:</p>
      
      <h3>Channel Example #1</h3>
      <p>This channel in the ${article.category.toLowerCase()} space saw significant growth by:</p>
      <ul>
        <li>Creating highly targeted content based on audience research</li>
        <li>Implementing a consistent visual style across all videos</li>
        <li>Engaging actively with viewers in comments and community posts</li>
        <li>Collaborating strategically with complementary channels</li>
      </ul>
      
      <h3>Channel Example #2</h3>
      <p>Another successful channel approached ${article.category.toLowerCase()} differently:</p>
      <ul>
        <li>Focusing on solving specific problems for their target audience</li>
        <li>Creating content series that encourage binge-watching</li>
        <li>Optimizing metadata for search visibility</li>
        <li>Leveraging multiple platforms to drive traffic to YouTube</li>
      </ul>

      <h2>Tools and Resources for ${article.category}</h2>
      
      <p>Here are some valuable tools and resources to help you implement effective ${article.category.toLowerCase()} strategies:</p>
      
      <ul>
        <li><strong>Analytics Platforms:</strong> YouTube Studio, TubeBuddy, vidIQ</li>
        <li><strong>Content Planning:</strong> Trello, Asana, Content Calendar Templates</li>
        <li><strong>Keyword Research:</strong> Google Trends, Keyword Tool for YouTube</li>
        <li><strong>Competitive Analysis:</strong> Social Blade, Channel Crawler</li>
        <li><strong>Community Management:</strong> Community Tab, Discord, Patreon</li>
      </ul>

      <h2>Conclusion</h2>
      
      <p>Effective ${article.category.toLowerCase()} is essential for YouTube success in 2025 and beyond. By understanding your audience, creating a strategic plan, and continuously optimizing your approach, you can achieve sustainable growth for your channel.</p>
      
      <p>Remember that while implementing these strategies is important, authenticity and consistency remain the foundation of YouTube success. Stay true to your unique voice while applying these best practices.</p>
      
      <p>At Social Brains, we help YouTube creators and brands develop and implement effective ${article.category.toLowerCase()} strategies that drive sustainable growth. If you need personalized guidance for your channel, <a href="/#contact">contact us</a> for a consultation.</p>
    </div>

    <div class="blog-post-tags">
      ${article.tags.map(tag => `<a href="/blog/tag/${tag}.html">${tag.replace(/-/g, ' ')}</a>`).join('\n      ')}
    </div>

    <div class="blog-author">
      <div class="blog-author-image">
        <img src="blog/images/author-${article.author.split(' ')[0].toLowerCase()}.jpg" alt="${article.author}">
      </div>
      <div class="blog-author-info">
        <h3>${article.author}</h3>
        <p>${article.author} is a YouTube strategy expert at Social Brains with extensive experience in ${article.category.toLowerCase()}. They have helped numerous channels grow and succeed through effective content strategies.</p>
      </div>
    </div>

    <div class="blog-related-posts">
      <h2>Related Articles</h2>
      <div class="related-posts-grid">
        <!-- Related posts would be dynamically generated based on tags or category -->
      </div>
    </div>
  </div>

  <section class="blog-newsletter">
    <div class="newsletter-container">
      <h2>Get YouTube Growth Tips in Your Inbox</h2>
      <p>Subscribe to our newsletter for exclusive content, tips, and strategies</p>
      <form class="newsletter-form">
        <input type="email" placeholder="Your email address" required>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </section>

  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="assets/brand-logo_cleaned.png" alt="YouTube Agency Logo">
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="/#who-we-are">About Us</a></li>
            <li><a href="/#why-choose-us">Why Choose Us</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Services</h3>
          <ul>
            <li><a href="/#how-we-work">Channel Growth</a></li>
            <li><a href="/#how-we-work">Content Strategy</a></li>
            <li><a href="/#how-we-work">Monetization</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/blog/case-studies.html">Case Studies</a></li>
            <li><a href="/blog/youtube-tools.html">YouTube Tools</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-social">
        <a href="https://www.youtube.com" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
        <a href="https://www.twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Social Brains YouTube Agency. All rights reserved.</p>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    });
  </script>
</body>
</html>`;
}

// Generate HTML files for each article
blogArticles.forEach(article => {
  const html = generateArticleHTML(article);
  const filePath = path.join(__dirname, `${article.slug}.html`);
  
  fs.writeFileSync(filePath, html);
  console.log(`Created: ${article.slug}.html`);
});

console.log('All blog articles generated successfully!');
