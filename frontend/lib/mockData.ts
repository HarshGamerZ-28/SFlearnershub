// lib/mockData.ts — Static mock data for SF Learners Hub preview

import { Category, Tag, Post, Author } from "./api";

// ─── Author ─────────────────────────────────────────────────────────────────
export const mockAuthor: Author = {
  id: "author-sf-learners-hub",
  username: "harsh_developer",
  full_name: "Harsh Soni",
  avatar_url: "/logo.jpg",
};

// ─── Categories ─────────────────────────────────────────────────────────────
export const mockCategories: Category[] = [
  {
    id: "cat-admin",
    name: "Salesforce Administration",
    slug: "salesforce-administration",
    description: "Core admin config, objects, users, flows, security, data security, profiles, OWD, and basic settings.",
    color: "#3b82f6",
    icon: "Settings",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-dev",
    name: "Salesforce Development",
    slug: "salesforce-development",
    description: "Apex development, triggers, classes, asynchronous Apex, SOQL, SOSL, and server-side logic.",
    color: "#10b981",
    icon: "Code2",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-lwc",
    name: "Lightning Web Components",
    slug: "lightning-web-components-lwc",
    description: "Modern UI development using Lightning Web Components (LWC), Aura, reactivity, lifecycle, and component communication.",
    color: "#8b5cf6",
    icon: "Layers",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-cert",
    name: "Certification Prep",
    slug: "certification-preparation-materials",
    description: "Study guides, tips, resources, and checklists to help you pass Salesforce certifications.",
    color: "#f59e0b",
    icon: "Award",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-interview",
    name: "Interview Q&A",
    slug: "interview-questions-answers",
    description: "Top developer and admin interview questions with detailed, expert-level answers.",
    color: "#ec4899",
    icon: "MessageSquare",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-devops",
    name: "Salesforce DevOps",
    slug: "salesforce-deployment-devops",
    description: "Version control, change sets, CI/CD, Copado, and release management in Salesforce.",
    color: "#06b6d4",
    icon: "GitBranch",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-integration",
    name: "Salesforce Integration",
    slug: "salesforce-integration",
    description: "REST APIs, SOAP APIs, OAuth 2.0, web services, Named Credentials, and external systems connection.",
    color: "#ef4444",
    icon: "Link2",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-mock",
    name: "Mock Tests & Quizzes",
    slug: "mock-tests-quizzes",
    description: "Test your knowledge with Salesforce practice mock exams and quizzes.",
    color: "#14b8a6",
    icon: "ClipboardCheck",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-projects",
    name: "Real-World Projects",
    slug: "real-world-projects",
    description: "Build real business solutions on Salesforce using end-to-end projects and scenarios.",
    color: "#6366f1",
    icon: "Briefcase",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-practice",
    name: "Practice Questions",
    slug: "practice-questions",
    description: "Daily practice questions to sharpen your admin and developer skills.",
    color: "#84cc16",
    icon: "HelpCircle",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-sales-cloud",
    name: "Sales Cloud",
    slug: "sales-cloud",
    description: "Leads, Opportunities, Accounts, Contacts, Forecasting, and standard Sales workflows.",
    color: "#3b82f6",
    icon: "BarChart2",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-service-cloud",
    name: "Service Cloud",
    slug: "service-cloud",
    description: "Cases, Service Console, Omni-Channel, Knowledge, and Service Cloud configuration.",
    color: "#f43f5e",
    icon: "Headphones",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-marketing-cloud",
    name: "Marketing Cloud",
    slug: "marketing-cloud",
    description: "Journey Builder, Email Studio, Automation Studio, and digital marketing integrations.",
    color: "#e11d48",
    icon: "Mail",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-omnistudio",
    name: "OmniStudio",
    slug: "salesforce-omnistudio",
    description: "OmniScripts, Flexcards, Integration Procedures, and DataRaptors (Data Mappers).",
    color: "#a855f7",
    icon: "Package",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-cpq",
    name: "Salesforce CPQ",
    slug: "salesforce-cpq",
    description: "Configure, Price, Quote, product bundles, pricing rules, and contract renewals.",
    color: "#d97706",
    icon: "DollarSign",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-releases",
    name: "Release Notes",
    slug: "salesforce-release-notes",
    description: "Summaries and key highlights of Spring, Summer, and Winter Salesforce releases.",
    color: "#3b82f6",
    icon: "Megaphone",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-career",
    name: "Career Paths",
    slug: "salesforce-career-paths",
    description: "Tips, career routes, resumes, and advice for landing a Salesforce job.",
    color: "#6b7280",
    icon: "Briefcase",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-events",
    name: "Salesforce Events",
    slug: "salesforce-events",
    description: "Dreamforce, TrailblazerDX, community groups, and local events.",
    color: "#f43f5e",
    icon: "Megaphone",
    parent_id: undefined,
    children: [],
  },
  {
    id: "cat-tools",
    name: "Tools & Tips",
    slug: "salesforce-tools-tips",
    description: "VS Code extensions, Salesforce Inspector, Chrome extensions, and productivity hacks.",
    color: "#10b981",
    icon: "Settings",
    parent_id: undefined,
    children: [],
  },
];

// ─── Tags ───────────────────────────────────────────────────────────────────
export const mockTags: Tag[] = [
  { id: "tag-apex", name: "Apex", slug: "apex" },
  { id: "tag-flows", name: "Flows", slug: "flows" },
  { id: "tag-lwc", name: "LWC", slug: "lwc" },
  { id: "tag-integration", name: "Integration", slug: "integration" },
  { id: "tag-devops", name: "DevOps", slug: "devops" },
  { id: "tag-security", name: "Security", slug: "security" },
  { id: "tag-copado", name: "Copado", slug: "copado" },
  { id: "tag-soql", name: "SOQL", slug: "soql" },
];

// Helper to find category/tag by slug
const getCat = (slug: string) => mockCategories.find((c) => c.slug === slug) as Category;
const getTag = (slug: string) => mockTags.find((t) => t.slug === slug) as Tag;

// ─── Blog Posts ──────────────────────────────────────────────────────────────
export const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Mastering Salesforce Flows: Best Practices & Design Patterns",
    slug: "mastering-salesforce-flows",
    excerpt: "Learn how to build scalable, high-performance Flows in Salesforce. We cover naming conventions, the 'One Flow per Object' model, error handling, subflows, and avoiding common pitfalls.",
    difficulty: "intermediate",
    reading_time: 8,
    view_count: 12530,
    is_featured: true,
    published_at: "2026-05-28T10:00:00Z",
    categories: [getCat("salesforce-administration")],
    tags: [getTag("flows"), getTag("security")],
    author: mockAuthor,
    youtube_url: "https://www.youtube.com/watch?v=y83e6U3k5Y0",
    featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    meta_title: "Mastering Salesforce Flows: Best Practices Guide",
    meta_description: "Build robust and optimized flows. Discover design patterns, the one record-triggered flow per object framework, and how to avoid governor limits in Flow Builder.",
    content: `
      <h2>The Rise of Declarative Development in Salesforce</h2>
      <p>Salesforce Flow is now the primary tool for declarative automation. With the deprecation of Process Builder and Workflow Rules, learning Flow Builder is no longer optional—it is a critical requirement for every Salesforce Administrator and Developer.</p>
      
      <h2>Core Flow Types & Use Cases</h2>
      <p>Before building, you must select the appropriate type of Flow. Building the wrong type of Flow can lead to performance degradation or poor user experiences.</p>
      <ul>
        <li><strong>Screen Flows:</strong> Used when user interaction is required. It displays guided screens to accept user input.</li>
        <li><strong>Record-Triggered Flows:</strong> Runs in the background when a record is created, updated, or deleted. These are extremely fast.</li>
        <li><strong>Schedule-Triggered Flows:</strong> Runs at a specified time and frequency (daily or weekly) for a set of records.</li>
        <li><strong>Autolaunched Flows:</strong> Runs in the background and can be called from Apex, REST API, or other Flows (Subflows).</li>
      </ul>

      <h2>Best Practices for Flow Builder</h2>
      <h3>1. Use the 'One Flow per Object and Type' Strategy</h3>
      <p>Just like trigger handler frameworks, having multiple Record-Triggered Flows on the same object can cause unpredictable execution orders. While Salesforce now supports Flow Trigger Ordering, keeping your flows consolidated makes troubleshooting much easier. Consider separating your logic into subflows.</p>
      
      <h3>2. Keep DML and Queries Outside of Loops</h3>
      <p>This is the cardinal rule of Salesforce programming, and it applies to Flows just as much as Apex. <strong>Never</strong> put a Get Records, Create Records, Update Records, or Delete Records element inside a Loop element. Doing so will rapidly hit your 100-SOQL query limit or DML row governor limits.</p>
      
      <blockquote>
        <strong>Flow Bulkification:</strong> When multiple records are modified at once, Salesforce automatically bulkifies Flows. However, if your Flow contains queries or DML inside a loop, Salesforce cannot bulkify those elements, resulting in a <code>LimitExceededException</code>.
      </blockquote>

      <h3>3. Implement Fault Paths</h3>
      <p>Every data element (Create, Update, Delete, Get) should have a Fault Path. A fault path allows you to catch errors and handle them gracefully—such as sending an email notification to the administrator, logging the error in a custom object, or showing a friendly message to the end-user in a Screen Flow.</p>
      
      <h2>Step-by-Step: Adding a Fault Path</h2>
      <ol>
        <li>Drag an element (e.g., Update Records) onto your canvas.</li>
        <li>Connect it to the next step.</li>
        <li>Hover over the element and drag a second arrow. This second connector automatically becomes a <strong>Fault Path</strong>.</li>
        <li>Connect the Fault Path to an Action element that logs the error or sends an email.</li>
      </ol>

      <pre><code>// Example of what happens behind the scenes during Flow execution:
try {
    update recordsToUpdate;
} catch(DmlException e) {
    // Flow Fault Path takes over here!
    sendAdminEmailAlert(e.getMessage());
}</code></pre>

      <h2>Conclusion</h2>
      <p>Flow Builder is a powerful automation tool. By adhering to bulkification principles, implementing fault paths, and consolidating your logic, you can ensure that your Salesforce org remains clean, fast, and maintainable.</p>
    `
  },
  {
    id: "post-2",
    title: "Bulkification in Apex: Writing High-Performance Triggers",
    slug: "apex-trigger-bulkification-guide",
    excerpt: "Master the art of bulkifying Apex code. Learn to handle collections, avoid SOQL and DML inside loops, and write scalable trigger handler frameworks that easily pass governor limits.",
    difficulty: "advanced",
    reading_time: 10,
    view_count: 9820,
    is_featured: true,
    published_at: "2026-05-27T14:30:00Z",
    categories: [getCat("salesforce-development")],
    tags: [getTag("apex"), getTag("soql")],
    author: mockAuthor,
    youtube_url: "https://www.youtube.com/watch?v=eD3FhQ5xWig",
    featured_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
    meta_title: "Apex Bulkification Guide: Trigger Best Practices",
    meta_description: "Learn how to write bulkified Apex code. Explore lists, sets, maps, SOQL queries, and trigger handler patterns in Salesforce.",
    content: `
      <h2>Why Bulkification is Critical</h2>
      <p>Salesforce runs in a multi-tenant environment, meaning resources are shared among multiple companies. To prevent any single organization from monopolizing resources, Salesforce enforces strict **Governor Limits**. If your Apex code exceeds these limits, the entire transaction is rolled back, and users encounter disruptive errors.</p>
      
      <p><strong>Bulkification</strong> refers to the practice of designing your Apex code so that it can handle more than one record at a time. In production, triggers can be invoked with up to 200 records in a single batch (and even more during Data Loader operations).</p>

      <h2>The Golden Rules of Apex</h2>
      <ul>
        <li><strong>Rule #1:</strong> Never write SOQL queries inside loops.</li>
        <li><strong>Rule #2:</strong> Never perform DML statements (insert, update, delete) inside loops.</li>
        <li><strong>Rule #3:</strong> Always use Apex collections (Lists, Sets, and Maps) to store and process data.</li>
      </ul>

      <h2>A Bad Practice Example (Non-Bulkified)</h2>
      <p>Let's examine a common developer mistake: writing a query and DML inside a loop.</p>
      <pre><code>trigger AccountTrigger on Account (after update) {
    for (Account acc : Trigger.new) {
        // BAD: SOQL inside loop. Will fail if > 100 accounts are updated.
        List&lt;Contact&gt; contacts = [SELECT Id, LastName FROM Contact WHERE AccountId = :acc.Id];
        
        for (Contact con : contacts) {
            con.Description = 'Parent account updated: ' + acc.Name;
            // BAD: DML inside loop. Will fail if > 150 contacts are updated.
            update con;
        }
    }
}</code></pre>

      <h2>The Solution: Bulkified Apex Trigger Handler</h2>
      <p>To bulkify this, we gather all parent account IDs, perform a single SOQL query outside the loop to fetch all related contacts, update them in memory, and then perform a single DML operation.</p>
      <pre><code>trigger AccountTrigger on Account (after update) {
    Set&lt;Id&gt; accountIds = new Set&lt;Id&gt;();
    for (Account acc : Trigger.new) {
        accountIds.add(acc.Id);
    }
    
    // Fetch all related contacts in a single SOQL query
    List&lt;Contact&gt; contactsToUpdate = [SELECT Id, AccountId, Description 
                                      FROM Contact 
                                      WHERE AccountId IN :accountIds];
                                      
    if (!contactsToUpdate.isEmpty()) {
        for (Contact con : contactsToUpdate) {
            // Retrieve the parent account record using Trigger.newMap
            Account parentAcc = Trigger.newMap.get(con.AccountId);
            con.Description = 'Parent account updated: ' + parentAcc.Name;
        }
        
        // Single DML statement to update all contacts
        update contactsToUpdate;
    }
}</code></pre>

      <h2>Summary Table: Governor Limits to Remember</h2>
      <table className="w-full text-sm border-collapse my-6">
        <thead>
          <tr className="border-b border-white/20 bg-dark-700/50">
            <th className="p-3 text-left font-bold text-white">Limit Category</th>
            <th className="p-3 text-left font-bold text-white">Synchronous Limit</th>
            <th className="p-3 text-left font-bold text-white">Asynchronous Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/10">
            <td className="p-3 text-slate-300">Total SOQL Queries Allowed</td>
            <td className="p-3 text-emerald-400 font-semibold">100</td>
            <td className="p-3 text-emerald-400">200</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="p-3 text-slate-300">Total SOQL Rows Retrieved</td>
            <td className="p-3 text-emerald-400">50,000</td>
            <td className="p-3 text-emerald-400">50,000</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="p-3 text-slate-300">Total DML Statements Issued</td>
            <td className="p-3 text-emerald-400 font-semibold">150</td>
            <td className="p-3 text-emerald-400">150</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="p-3 text-slate-300">Total DML Rows Processed</td>
            <td className="p-3 text-emerald-400">10,000</td>
            <td className="p-3 text-emerald-400">10,000</td>
          </tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>Bulkifying Apex code is essential for maintaining a healthy Salesforce instance. Always write code assuming that your trigger will receive a collection of records. Write test methods that insert or update 200+ records to ensure your triggers are resilient.</p>
    `
  },
  {
    id: "post-3",
    title: "LWC Lifecycle Hooks Demystified",
    slug: "lwc-lifecycle-hooks-demystified",
    excerpt: "Understand the exact order of component instantiation and execution. Learn how to handle constructor, connectedCallback, renderedCallback, and errorCallback in Lightning Web Components.",
    difficulty: "intermediate",
    reading_time: 7,
    view_count: 8400,
    is_featured: true,
    published_at: "2026-05-26T08:15:00Z",
    categories: [getCat("lightning-web-components-lwc")],
    tags: [getTag("lwc")],
    author: mockAuthor,
    youtube_url: "https://www.youtube.com/watch?v=y83e6U3k5Y0",
    featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    meta_title: "LWC Lifecycle Hooks Tutorial & Code Examples",
    meta_description: "Guide to Lightning Web Component lifecycle hooks. Explore component setup, rendering phases, disconnected callbacks, and error boundaries.",
    content: `
      <h2>What are Lifecycle Hooks?</h2>
      <p>A lifecycle hook is a callback method triggered at a specific stage of a component's lifecycle. In Lightning Web Components (LWC), the framework manages the creation, insertion, updating, and removal of components in the DOM. By understanding these hooks, you can execute code at the precise moment it is needed.</p>

      <h2>LWC Lifecycle Sequence</h2>
      <p>The lifecycle hooks run in the following strict order:</p>
      <ol>
        <li><code>constructor()</code></li>
        <li><code>connectedCallback()</code></li>
        <li><code>renderedCallback()</code></li>
        <li><code>disconnectedCallback()</code> (when component is removed)</li>
        <li><code>errorCallback()</code> (when an error occurs in a child component)</li>
      </ol>

      <h2>Deep Dive Into Each Hook</h2>
      
      <h3>1. constructor()</h3>
      <p>The constructor fires when the component is created. It flows from the parent component to the child component. In the constructor, you must call <code>super()</code> to initialize the class correctly.</p>
      <ul>
        <li><strong>Do:</strong> Initialize variables, bind methods.</li>
        <li><strong>Do Not:</strong> Access component properties (they are not available yet), access child elements, or call APIs.</li>
      </ul>

      <h3>2. connectedCallback()</h3>
      <p>Fires when the component is inserted into the DOM. This hook flows from parent to child.</p>
      <ul>
        <li><strong>Do:</strong> Fetch data using apex, call external services, set page-level attributes, register event listeners.</li>
        <li><strong>Do Not:</strong> Access child elements in the DOM (use <code>renderedCallback</code> for DOM manipulation).</li>
      </ul>

      <h3>3. renderedCallback()</h3>
      <p>Fires after the component has finished rendering on screen. This hook flows from **child to parent**. It can execute multiple times whenever a reactive property updates.</p>
      <ul>
        <li><strong>Do:</strong> Perform DOM manipulation, initialize external libraries (like D3 or Chart.js).</li>
        <li><strong>Caution:</strong> Avoid updating reactive properties inside this hook without guardrails, as it will trigger another render and lead to an **infinite rendering loop**.</li>
      </ul>

      <pre><code>import { LightningElement } from 'lwc';

export default class LifecycleExample extends LightningElement {
    hasRendered = false;

    constructor() {
        super();
        console.log('Constructor executed');
    }

    connectedCallback() {
        console.log('ConnectedCallback: Component inserted into DOM');
    }

    renderedCallback() {
        console.log('RenderedCallback: DOM rendered');
        if (!this.hasRendered) {
            // Guardrail to prevent infinite loop
            this.hasRendered = true;
            this.initializeThirdPartyLibrary();
        }
    }

    disconnectedCallback() {
        console.log('DisconnectedCallback: Clean up event listeners');
    }
}</code></pre>

      <h2>Conclusion</h2>
      <p>By leveraging LWC lifecycle hooks, you can control the load order of your data, optimize UI rendering, and prevent memory leaks by cleaning up listeners when components are unmounted.</p>
    `
  },
  {
    id: "post-4",
    title: "Salesforce Platform Developer I (PDI) Exam Prep Guide",
    slug: "salesforce-pdi-study-guide",
    excerpt: "Passing the PDI exam requires a solid understanding of Apex, LWC, and programmatic customization. Here is our direct preparation checklist, exam weightings, and mock resources.",
    difficulty: "intermediate",
    reading_time: 6,
    view_count: 14500,
    is_featured: false,
    published_at: "2026-05-25T11:00:00Z",
    categories: [getCat("certification-preparation-materials")],
    tags: [getTag("apex"), getTag("lwc")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Ace Your Salesforce PDI Certification</h2>
      <p>The Salesforce Platform Developer I (PDI) credential is designed for developers who want to validate their programmatic skills on the Force.com platform. It tests you on standard customization, Apex development, Visualforce, and Lightning Web Components.</p>

      <h2>Exam Overview</h2>
      <ul>
        <li><strong>Number of Questions:</strong> 60 multiple-choice questions</li>
        <li><strong>Time Limit:</strong> 105 minutes</li>
        <li><strong>Passing Score:</strong> 68% (approx. 41 correct answers)</li>
      </ul>

      <h2>Topics Breakdown</h2>
      <h3>1. Developer Fundamentals (23%)</h3>
      <p>Focus on data modeling, multi-tenant architecture, and MVC patterns. Make sure you understand the difference between master-detail and lookup relationships, and how roll-up summaries work.</p>

      <h3>2. Process Automation & Logic (30%)</h3>
      <p>This is the largest section of the exam. Expect questions about Apex triggers, trigger execution order, exception handling, custom metadata, and asynchronous Apex (Future, Queueable, Batch, and Schedulable).</p>

      <h3>3. User Interface (25%)</h3>
      <p>Requires familiarity with Aura Components and LWC. Focus on how components handle events, wire service, and Apex integration.</p>

      <h3>4. Testing, Debugging, and Integration (22%)</h3>
      <p>Know how to write test classes, test data setup using @TestSetup, testing mock callouts (WebServiceMock and HttpCalloutMock), and how to read debug logs.</p>
    `
  },
  {
    id: "post-5",
    title: "Top 50 Salesforce Developer Interview Questions (2026 Edition)",
    slug: "top-50-salesforce-developer-interview-questions",
    excerpt: "Get prepared for your next technical round. We've compiled 50 must-know interview questions with detailed, expert-level answers covering Apex, LWC, security, and integrations.",
    difficulty: "advanced",
    reading_time: 12,
    view_count: 22100,
    is_featured: true,
    published_at: "2026-05-24T09:00:00Z",
    categories: [getCat("interview-questions-answers")],
    tags: [getTag("apex"), getTag("lwc"), getTag("integration")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1521737711867-e3b90473bd58?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>The Definitive Salesforce Developer Interview Q&A</h2>
      <p>Landing a Salesforce Developer job requires showing both programmatic proficiency and a deep understanding of Salesforce architecture. Here are some of the most frequently asked questions and how to answer them.</p>

      <h3>Q1: What is the difference between a trigger and a process builder/flow?</h3>
      <p><strong>Answer:</strong> Triggers run on the server side and are written in Apex code, making them capable of handling highly complex, high-volume transactions and advanced logic. Flows are declarative tools that run on a visual canvas, making them easier to maintain for non-developers, though they are still bound by governor limits and best suited for standard business workflows.</p>

      <h3>Q2: Explain the difference between database.insert() and insert.</h3>
      <p><strong>Answer:</strong> The <code>insert</code> statement is an all-or-nothing operation. If one record in your collection fails to insert, the entire batch fails and an exception is thrown. <code>Database.insert()</code> allows for partial success. By passing a second parameter of <code>false</code> (e.g., <code>Database.insert(records, false)</code>), Salesforce will insert all valid records and return save results detailing which ones failed.</p>

      <h3>Q3: What is the purpose of the @AuraEnabled annotation?</h3>
      <p><strong>Answer:</strong> The <code>@AuraEnabled</code> annotation exposes Apex controller methods to Lightning components (Aura and LWC). Using <code>(cacheable=true)</code> enables client-side caching of the returned data, improving component loading times and reducing server requests.</p>
    `
  },
  {
    id: "post-6",
    title: "Setting Up Salesforce CI/CD with GitHub Actions",
    slug: "salesforce-cicd-github-actions",
    excerpt: "Transition to modern development operations. Learn how to authenticate with Salesforce CLI using JWT, validate deployments, and automate tests using GitHub Actions.",
    difficulty: "advanced",
    reading_time: 9,
    view_count: 7430,
    is_featured: false,
    published_at: "2026-05-23T15:00:00Z",
    categories: [getCat("salesforce-deployment-devops")],
    tags: [getTag("devops"), getTag("copado")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Introduction to Salesforce DevOps</h2>
      <p>Manually deploying changes via Change Sets is time-consuming and error-prone. Modern Salesforce development leverages Git as the source of truth, enabling automated deployments, code validation, and continuous testing.</p>

      <h2>Prerequisites</h2>
      <ul>
        <li>A GitHub repository containing your Salesforce DX project.</li>
        <li>A Salesforce Developer Edition or Sandbox org.</li>
        <li>The Salesforce CLI (SFDX) installed on your local machine.</li>
      </ul>

      <h2>Step 1: JWT Authentication Setup</h2>
      <p>To authorize GitHub Actions to log into Salesforce without user interaction, you must use a Connected App and a digital certificate. Generate a certificate and upload the public key to your Connected App, then add the private key as a GitHub secret.</p>

      <pre><code># Generate digital certificate:
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt</code></pre>
    `
  },
  {
    id: "post-7",
    title: "Salesforce REST API Integration via Named Credentials",
    slug: "salesforce-rest-api-named-credentials",
    excerpt: "Securely connect Salesforce with external web services. This step-by-step tutorial covers REST callouts, OAuth 2.0 configuration, and parsing JSON in Apex controllers.",
    difficulty: "advanced",
    reading_time: 8,
    view_count: 11200,
    is_featured: false,
    published_at: "2026-05-22T13:00:00Z",
    categories: [getCat("salesforce-integration")],
    tags: [getTag("integration"), getTag("apex")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>The Power of Named Credentials</h2>
      <p>Integrating Salesforce with third-party web services historically required developers to hardcode endpoints, manage complex authentication headers, and store client secrets in custom settings or metadata. Named Credentials solve all of these problems by consolidating security settings and endpoints in a declarative setup.</p>

      <h2>Implementing a REST Callout in Apex</h2>
      <p>Once your Named Credential is configured, calling the API in Apex is incredibly simple and clean. You don't need to specify the endpoint URL or add authentication headers in your code—Salesforce handles that automatically.</p>

      <pre><code>public class IntegrationService {
    public static String fetchUserData() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        // Call credential directly using callout:NameOfCredential
        request.setEndpoint('callout:MyExternalService/users');
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            return response.getBody();
        }
        return null;
    }
}</code></pre>
    `
  },
  {
    id: "post-8",
    title: "Salesforce Associate Practice Exam: Test Your Admin Basics",
    slug: "salesforce-admin-mock-exam-practice-test-1",
    excerpt: "Get ready for your certification exam. This practice test contains 10 highly realistic exam questions, detailed answers, and references to official help documents.",
    difficulty: "beginner",
    reading_time: 15,
    view_count: 16900,
    is_featured: false,
    published_at: "2026-05-21T10:00:00Z",
    categories: [getCat("mock-tests-quizzes")],
    tags: [getTag("security")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Salesforce Practice Exam</h2>
      <p>Practice makes perfect. Below is a mock test focusing on Data Modeling, Security, and Analytics. Test your skills and review the answers at the bottom.</p>

      <h3>Question 1</h3>
      <p><strong>A system administrator needs to grant edit access to a custom object to only 5 users out of 100 who share the same Profile. What is the best practice?</strong></p>
      <ul>
        <li>A. Create a new Profile and assign it to the 5 users.</li>
        <li>B. Grant edit access in the shared Profile and restrict others using validation rules.</li>
        <li>C. Create a Permission Set with edit access and assign it to the 5 users. (Correct)</li>
        <li>D. Change the Organization-Wide Defaults (OWD) of the custom object.</li>
      </ul>
    `
  },
  {
    id: "post-9",
    title: "Building an End-to-End Customer Support Portal on Salesforce",
    slug: "salesforce-customer-support-portal-project",
    excerpt: "Step-by-step blueprint of a real business project. Build a customer-facing support site using Experience Cloud, Lightning Web Components, and automated Case queues.",
    difficulty: "advanced",
    reading_time: 14,
    view_count: 9100,
    is_featured: false,
    published_at: "2026-05-20T16:00:00Z",
    categories: [getCat("real-world-projects")],
    tags: [getTag("lwc"), getTag("flows")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Project Blueprint: Customer Support Portal</h2>
      <p>This project guide covers how to design and build an enterprise-level customer service experience. We integrate Experience Cloud for the frontend, Apex controllers for secure data access, and Record-Triggered Flows to alert support reps.</p>

      <h2>System Architecture</h2>
      <p>The solution comprises three main layers:</p>
      <ol>
        <li><strong>UI Layer:</strong> LWC custom component embedded in an Experience Cloud page, accepting service requests.</li>
        <li><strong>Logic Layer:</strong> Apex controllers verifying active SLAs and inserting Case records.</li>
        <li><strong>Automation Layer:</strong> Flow Builder running Omni-channel queues to assign cases to support specialists.</li>
      </ol>
    `
  },
  {
    id: "post-10",
    title: "Top 10 VS Code Extensions for Salesforce Developers",
    slug: "vs-code-extensions-salesforce-developers",
    excerpt: "Boost your productivity with the ultimate desktop setup. We list the most useful extensions for debugging, logging, linting, and inspecting Salesforce orgs.",
    difficulty: "beginner",
    reading_time: 5,
    view_count: 18200,
    is_featured: false,
    published_at: "2026-05-19T11:00:00Z",
    categories: [getCat("salesforce-tools-tips")],
    tags: [getTag("apex"), getTag("lwc")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Boost Your Development Productivity</h2>
      <p>Visual Studio Code is the official IDE for Salesforce development. To supercharge your workflow, you should equip VS Code with extension suites that assist in formatting code, exploring orgs, and checking syntax limits.</p>

      <h3>1. Salesforce Extension Pack</h3>
      <p>The mandatory pack containing Apex debugger, LWC tools, Aura components, and CLI interactions directly inside the IDE.</p>

      <h3>2. Salesforce Inspector / Inspector MTR</h3>
      <p>A browser extension and VS Code plugin that allows you to easily query data, view field metadata, and inspect records directly without loading full Salesforce setup pages.</p>
    `
  },
  {
    id: "post-11",
    title: "Understanding Sales Cloud: Lead Conversion & Opportunity Pipelines",
    slug: "understanding-sales-cloud-pipelines",
    excerpt: "A deep dive into standard Sales Cloud features. Learn how lead mapping works, how to configure sales stages, and how to use forecasting tools.",
    difficulty: "beginner",
    reading_time: 7,
    view_count: 6720,
    is_featured: false,
    published_at: "2026-05-18T10:00:00Z",
    categories: [getCat("sales-cloud")],
    tags: [getTag("security")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>The Sales Funnel in Salesforce</h2>
      <p>Sales Cloud is the foundation of Salesforce CRM. We explore how Leads convert into Accounts, Contacts, and Opportunities, ensuring your sales pipeline operates smoothly and analytics are clean.</p>
    `
  },
  {
    id: "post-12",
    title: "A Deep Dive into Service Cloud Omni-Channel Routing",
    slug: "service-cloud-omni-channel-routing",
    excerpt: "Learn how to distribute service cases, chats, and calls based on agent presence, capacity, and expertise using Omni-Channel routing rules.",
    difficulty: "intermediate",
    reading_time: 8,
    view_count: 7300,
    is_featured: false,
    published_at: "2026-05-17T09:00:00Z",
    categories: [getCat("service-cloud")],
    tags: [getTag("flows")],
    author: mockAuthor,
    featured_image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Omni-Channel Routing Strategies</h2>
      <p>Distribute work items efficiently. Learn how to route Cases, Leads, or Custom Object records to the right agents at the right time based on their real-time availability and workload.</p>
    `
  }
];
