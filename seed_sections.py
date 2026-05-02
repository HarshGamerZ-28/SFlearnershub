import asyncio
import uuid
from datetime import datetime
import sys
import os
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Add backend to path
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
from app.models.models import Category, Post, PostCategory, User

DATABASE_URL = "postgresql+asyncpg://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"

SECTIONS_CONTENT = {
    "salesforce-administration": {
        "title": "Comprehensive Guide to Salesforce Administration",
        "content": """
            <h2>Mastering Salesforce Administration</h2>
            <p>Salesforce Administration is the backbone of any successful CRM implementation. This guide covers everything from beginner basics to advanced configuration.</p>
            
            <h3>Core Topic List</h3>
            <ul>
                <li>User Management & Security (Profiles, Roles, Permission Sets)</li>
                <li>Data Modeling (Objects, Fields, Relationships)</li>
                <li>Automation (Flow Builder, Validation Rules)</li>
                <li>Data Management (Import/Export, Data Quality)</li>
                <li>Reporting & Analytics (Reports, Dashboards)</li>
            </ul>

            <h3>Step-by-Step Tutorial: Creating a Custom Object</h3>
            <ol>
                <li>Navigate to Setup > Object Manager.</li>
                <li>Click 'Create' > 'Custom Object'.</li>
                <li>Enter Label, Plural Label, and Object Name.</li>
                <li>Configure optional features like 'Allow Reports' and 'Track Field History'.</li>
                <li>Save and add Custom Fields as needed.</li>
            </ol>

            <h3>Best Practices</h3>
            <ul>
                <li>Follow the 'One Flow per Object' pattern.</li>
                <li>Always use Profiles for restrictive access and Permission Sets for additive access.</li>
                <li>Document all custom configurations in a data dictionary.</li>
            </ul>

            <h3>Certification Objectives (Admin ADM-201)</h3>
            <p>Aligns with Configuration and Setup (12%), Object Manager and Lightning App Builder (20%), and Sales and Service Cloud Applications (16%).</p>
            
            <h3>Resources</h3>
            <ul>
                <li><a href="https://trailhead.salesforce.com/en/content/learn/trails/force_com_admin_beginner">Trailhead: Admin Beginner</a></li>
                <li><a href="https://help.salesforce.com/s/articleView?id=sf.admin_setup_guide.htm&type=5">Official Setup Guide</a></li>
            </ul>
        """
    },
    "salesforce-development": {
        "title": "Mastering Salesforce Development (Apex & Beyond)",
        "content": """
            <h2>The Developer's Handbook</h2>
            <p>Transition from Admin to Developer with our comprehensive Apex and Platform development guide.</p>
            
            <h3>Topic List</h3>
            <ul>
                <li>Apex Basics (Variables, Loops, Collections)</li>
                <li>SOQL & SOSL Queries</li>
                <li>DML Operations & Error Handling</li>
                <li>Trigger Frameworks & Best Practices</li>
                <li>Asynchronous Apex (Future, Queueable, Batch, Schedulable)</li>
            </ul>

            <h3>Code Snippet: Bulkified Trigger</h3>
            <pre><code>trigger AccountTrigger on Account (before insert) {
    for (Account acc : Trigger.new) {
        if (acc.Industry == 'Technology') {
            acc.Description = 'High Tech Client';
        }
    }
}</code></pre>

            <h3>Best Practices</h3>
            <ul>
                <li>Never perform DML or SOQL inside loops.</li>
                <li>Always use a Trigger Framework (like Boilerplate or NPSP).</li>
                <li>Maintain 75%+ code coverage with meaningful assertions.</li>
            </ul>

            <h3>Resources</h3>
            <ul>
                <li><a href="https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro.htm">Apex Developer Guide</a></li>
            </ul>
        """
    },
    "lightning-web-components-lwc": {
        "title": "Lightning Web Components: The Ultimate Guide",
        "content": """
            <h2>Building Modern UIs with LWC</h2>
            <p>LWC is the modern standard for Salesforce UI development. Learn to build high-performance components.</p>
            
            <h3>Core Topics</h3>
            <ul>
                <li>Component Lifecycle Hooks</li>
                <li>Data Binding & Reactivity (@track, @api, @wire)</li>
                <li>Communication (Events, PubSub, LMS)</li>
                <li>LWC with Apex (@AuraEnabled)</li>
                <li>Testing with Jest</li>
            </ul>

            <h3>Tutorial: Basic Hello World Component</h3>
            <p>1. Create the HTML:</p>
            <pre><code>&lt;template&gt;
    &lt;lightning-card title="Hello" icon-name="custom:custom14"&gt;
        &lt;div class="slds-m-around_medium"&gt;
            Hello, {greeting}!
        &lt;/div&gt;
    &lt;/lightning-card&gt;
&lt;/template&gt;</code></pre>
            <p>2. Create the JS:</p>
            <pre><code>import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
    greeting = 'World';
}</code></pre>

            <h3>Resources</h3>
            <ul>
                <li><a href="https://developer.salesforce.com/docs/component-library/overview/components">LWC Component Library</a></li>
            </ul>
        """
    },
    "certification-preparation-materials": {
        "title": "Salesforce Certification Success Path",
        "content": """
            <h2>Your Journey to Certified Professional</h2>
            <p>Comprehensive study guides and resources for all major Salesforce certifications.</p>
            
            <h3>Available Certifications</h3>
            <ul>
                <li>Administrator (ADM-201)</li>
                <li>Platform Developer I & II</li>
                <li>App Builder</li>
                <li>Sales & Service Cloud Consultant</li>
            </ul>

            <h3>Study Strategy</h3>
            <ul>
                <li>Review the official Exam Guide for weightings.</li>
                <li>Complete all relevant Trailhead trails.</li>
                <li>Take practice exams under timed conditions.</li>
            </ul>

            <h3>Resources</h3>
            <ul>
                <li><a href="https://trailhead.salesforce.com/credentials/administrator">Official Admin Cert Page</a></li>
                <li><a href="https://www.focusonforce.com">Focus on Force (External)</a></li>
            </ul>
        """
    },
    "interview-questions-answers": {
        "title": "Salesforce Interview Masterclass: Q&A",
        "content": """
            <h2>Ace Your Next Salesforce Interview</h2>
            <p>Top questions and expert-level answers for Admins and Developers.</p>
            
            <h3>Admin Questions</h3>
            <ul>
                <li><strong>Q: What is the difference between Role and Profile?</strong><br/>A: Profile controls what a user can do (Permissions); Role controls what a user can see (Data visibility).</li>
                <li><strong>Q: What are Validation Rules?</strong><br/>A: Rules that prevent saving data if conditions aren't met.</li>
            </ul>

            <h3>Developer Questions</h3>
            <ul>
                <li><strong>Q: What is a Map in Apex?</strong><br/>A: A collection of key-value pairs where each key is unique.</li>
                <li><strong>Q: How do you handle Governor Limits?</strong><br/>A: Through bulkification, avoiding SOQL/DML in loops, and using async processing.</li>
            </ul>
        """
    }
}

# Add remaining sections with generic structured content to ensure they are populated
REMAINING_SECTIONS = [
    "salesforce-deployment-devops", "salesforce-integration", "mock-tests-quizzes",
    "real-world-projects", "practice-questions", "sales-cloud", "service-cloud",
    "marketing-cloud", "salesforce-omnistudio", "salesforce-cpq", "salesforce-release-notes",
    "salesforce-career-paths", "salesforce-events", "salesforce-tools-tips"
]

for slug in REMAINING_SECTIONS:
    name = slug.replace('-', ' ').title()
    SECTIONS_CONTENT[slug] = {
        "title": f"The Complete Guide to {name}",
        "content": f"""
            <h2>Mastering {name}</h2>
            <p>Comprehensive learning resources for {name} in the Salesforce ecosystem.</p>
            <h3>Key Topics</h3>
            <ul>
                <li>Core Concepts and Architecture</li>
                <li>Implementation Best Practices</li>
                <li>Industry Use Cases</li>
                <li>Advanced Configuration & Optimization</li>
            </ul>
            <h3>Learning Path</h3>
            <ol>
                <li>Foundation: Basic understanding and setup.</li>
                <li>Intermediate: Deep dive into features and tools.</li>
                <li>Advanced: Integration and complex scenarios.</li>
            </ol>
            <h3>Resources</h3>
            <ul>
                <li><a href='https://help.salesforce.com'>Official Documentation</a></li>
                <li><a href='https://trailhead.salesforce.com'>Trailhead Learning</a></li>
            </ul>
        """
    }

async def seed_master_guides():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        # Get admin user
        result = await session.execute(select(User).limit(1))
        admin = result.scalar()
        if not admin:
            print("No user found to assign as author!")
            return

        for slug, data in SECTIONS_CONTENT.items():
            # Check if category exists
            cat_result = await session.execute(select(Category).where(Category.slug == slug))
            cat = cat_result.scalar()
            
            if not cat:
                print(f"Category {slug} not found, skipping...")
                continue

            # Check if master guide already exists
            master_slug = f"master-guide-{slug}"
            post_result = await session.execute(select(Post).where(Post.slug == master_slug))
            post_obj = post_result.scalar_one_or_none()
            
            # Create post with relevant thumbnail
            img_url = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" # Default business/tech
            if "admin" in slug: img_url = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2340&auto=format&fit=crop"
            if "dev" in slug or "lwc" in slug: img_url = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2344&auto=format&fit=crop"
            if "cert" in slug or "prep" in slug: img_url = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2340&auto=format&fit=crop"
            if "cloud" in slug: img_url = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2344&auto=format&fit=crop"
            if "event" in slug: img_url = "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=2340&auto=format&fit=crop"

            if post_obj:
                print(f"Updating master guide for {slug} with thumbnail...")
                post_obj.featured_image = img_url
                continue

            # Create post
            post_obj = Post(
                id=uuid.uuid4(),
                title=data['title'],
                slug=master_slug,
                excerpt=f"A comprehensive master guide to {cat.name}, covering topics, tutorials, and best practices.",
                content=data['content'],
                author_id=admin.id,
                featured_image=img_url,
                difficulty="advanced",
                status="published",
                is_featured=True,
                published_at=datetime.utcnow()
            )
            session.add(post_obj)
            await session.flush()

            # Assign to category
            session.add(PostCategory(post_id=post.id, category_id=cat.id, is_primary=True))
            print(f"Created master guide for {cat.name}")

        await session.commit()
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_master_guides())
