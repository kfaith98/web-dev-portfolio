const posts = [
  {
    title: "My Journey into Web Development",
    date: "April 1, 2026",
    content: `
    <p>As I reflect on the past few months, I’m struck by how much I’ve grown—not just as a professional, but as a learner and a person. My journey into full-stack web development didn’t start in a classroom, nor did it begin with code. It began with curiosity, a desire to reskill, and the belief that growth is holistic: professional, intellectual, and personal.</p>
    <br />
    <p>Before diving into web development, I was working as an events producer. Planning and executing events taught me organizational skills, creativity, and how to think on my feet. Yet, I felt a pull toward something different—something that would allow me to create digital experiences rather than physical ones. I wanted to build tools, design interfaces, and ultimately craft products that could reach anyone, anywhere, on their screens.</p>
    <br />
    <p>Starting out, the world of code felt both exciting and overwhelming. HTML, CSS, JavaScript—each line seemed like learning a new language, both literally and conceptually. But I reminded myself that learning doesn’t have to be perfect, and progress matters more than speed. I began with small projects: creating a simple calculator, a to-do list, or a mini shopping list app. These projects were more than just exercises—they were proof that I could translate ideas into tangible results.</p>
    <br />
    <p>One of the things I quickly realized was how important structure is when learning programming. At first, my code was functional but messy. Variables scattered, functions nested in ways that made my head spin, and my projects felt brittle. But as I practiced, I learned about organizing code: creating reusable functions, separating concerns, and leveraging modern tools and frameworks. This process taught me patience and the value of thoughtful design—skills that extend beyond code into how I approach problems in life.</p>
    <br />
    <p>Working on my portfolio site was a turning point. It was the first project where I combined everything I’d learned so far. From designing a responsive layout to implementing smooth scroll navigation and creating a simple hero typing effect, every detail mattered. I experimented with CSS variables, grid and flex layouts, and even animated elements to make the site feel alive. Each tweak and iteration was a lesson in perseverance and attention to detail. I realized that building a portfolio isn’t just about showing off work—it’s about demonstrating how I think and learn.</p>
    <br />
    <p>Another layer of this journey has been embracing feedback and iteration. Early on, I learned that it’s easy to get attached to a particular way of doing something, whether it’s a design choice or a piece of code. But the most growth comes from being open to refining, adjusting, and sometimes starting over. Whether it’s fixing a bug in JavaScript or reworking a responsive layout, iteration is where learning truly happens.</p>
    <br />
    <p>A particularly exciting part of my learning has been exploring JavaScript. From simple functions to more complex concepts like DOM manipulation and dynamic rendering, every small success fueled my confidence. For example, creating a dynamic blog page that injects posts using JavaScript was a small challenge that paid off in a big way. It taught me how code can interact with content dynamically, rather than being static. And it reminded me that coding isn’t just about syntax—it’s about problem-solving, logic, and creativity.</p>
    <br />
    <p>I’ve also started thinking about how to bridge my web development skills with my professional background. Event planning and web development might seem unrelated at first glance, but both require attention to detail, timing, and user experience. I see opportunities to build tools that help planners, streamline workflows, or enhance client engagement. It’s exciting to realize that skills from one field can complement and enhance growth in another.</p>
    <br />
    <p>Through this journey, I’ve discovered that learning is not linear. Some days I feel like I’m making huge strides, and other days it feels like I’m stuck in loops of debugging. But each experience, whether frustrating or triumphant, contributes to growth. I’ve learned to embrace mistakes as part of the process and to celebrate small wins along the way.</p>
    <br />
    <p>Looking forward, my goal is to continue building meaningful projects while deepening my understanding of both front-end and back-end technologies. I aim to contribute to full-stack projects that solve real problems and provide value to users. And beyond the technical, I want to continue fostering habits that support holistic growth: curiosity, patience, resilience, and the willingness to keep learning.</p>
    <br />
    <p>In writing this, I hope to inspire others who might be on a similar path. Whether you’re reskilling, learning a new field, or exploring a passion, remember that growth is multi-dimensional. It’s not just about mastering a language, framework, or tool—it’s about developing the mindset to tackle challenges, adapt, and persevere. And perhaps most importantly, it’s about enjoying the journey, not just the destination.</p>
    <br />
    <p>As I continue building my portfolio, projects, and blog, I am reminded daily that every line of code, every small project, and every new concept is part of a bigger story: the story of becoming a well-rounded developer and a lifelong learner. And for me, that story is just beginning.</p>
    `,
    preview: "Know more about my journey in this post...",
  },
  {
    title: "Building EventMatch AI: My First AI-Powered Web App",
    date: "May 12, 2026",
    content: `
    <p>For the past few years, my work has been about matching events to the people behind them — venues to vibes, caterers to dietary needs, photographers to budgets. Every event I produce starts with a brief: someone describing what they want in plain language, and me figuring out which suppliers can actually deliver it. So when my bootcamp's Project 3 asked us to build a web app that integrates an AI API, I knew exactly what I wanted to build.</p>
    <br />
    <p>EventMatch AI is a web app that does a version of what I do at work, but in seconds. A user describes their event — type, size, location, budget, dietary restrictions, vibe — in plain language, and the app returns a list of matched suppliers from a curated database, each with reasoning for why they fit. The frontend is vanilla JavaScript, the backend is a single Netlify serverless function, and the reasoning comes from Google's Gemini API. It's deployed live, and anyone can try it.</p>
    <br />
    <p>The first few days were about plumbing. Setting up the serverless function, hiding the API key in environment variables, getting the AI to return JSON instead of prose, parsing it on the client. None of it was glamorous, and most of it was me reading documentation, trying something, watching it break, and reading more documentation. But somewhere around day three, the first end-to-end response came back — a real list of suppliers with real reasoning — and the project stopped feeling like an exercise and started feeling like a product.</p>
    <br />
    <p>The harder work came after. Getting AI to do something is easy; getting it to do the right thing consistently is not. My first prompts were too lenient — the AI would invent suppliers that didn't exist in my database, or skip the reasoning, or return ten matches when I asked for three. My next prompts were too strict — if a user's brief didn't have a perfect match, the AI would return an empty list, which was technically correct but useless. My instructor flagged this during the checkpoint demo: it should still suggest something.</p>
    <br />
    <p>That feedback led to the most interesting design decision of the build. I rewrote the prompt to split constraints into two categories. Hard constraints — allergies, dietary needs, guest count — should never be bent. If a guest has a peanut allergy and a caterer can't accommodate that, that caterer is out. Soft constraints — preferred location, budget ceiling — should be relaxed when no exact match exists, but the AI has to acknowledge the substitution in its summary. It mirrors how I'd actually think about a brief at work: there are deal-breakers, and there are preferences, and the difference matters.</p>
    <br />
    <p>A smaller but satisfying piece: I added a feature where users can ask for multiple options per category in plain English. "Give me 3 venues to choose from" or "show me a few catering options" returns up to three matches in that category instead of one. No UI change, no toggle, no setting — just the natural way someone would actually ask. That's the kind of detail that doesn't show up on a feature list but makes the app feel like it's listening.</p>
    <br />
    <p>Not everything went smoothly. I hit the Gemini API's free-tier quota in the middle of recording a demo video and had to wait for it to reset. My error messages used to say "Something went wrong, please try again" no matter what actually went wrong, so I couldn't tell a quota error from a network failure from a malformed response. I spent an afternoon rewiring the error pipeline so that the real upstream message propagates all the way from Gemini through the Netlify function to the UI. It's a small change with a big quality-of-life payoff — both for users and for me when debugging.</p>
    <br />
    <p>What surprised me most about this project was how much of it wasn't code. The prompt engineering was design work. The constraint hierarchy was product thinking. The error surfacing was UX. The years I've spent in events — reading briefs, managing expectations, knowing when to push back and when to substitute — turned out to be more useful than I expected. I'd been told that career-changers bring their old skills with them, but I didn't really understand what that meant until I was prompting an AI to behave like a thoughtful supplier coordinator.</p>
    <br />
    <p>EventMatch AI isn't perfect. The supplier database is mock data. The AI sometimes still hedges when it shouldn't, or rushes a summary when it should slow down. But it's live, it works, and it does something a static list of suppliers can't. More importantly, it taught me that building with AI is less about wrangling the model and more about defining, carefully and patiently, what you actually want it to do. That lesson — that clarity is the real skill — feels like it'll show up again in everything I build next.</p>
  `,
    preview:
      "How I built my first AI-powered web app — and what events work taught me about prompt engineering.",
  },
];
