# Unibui Assignment

## Introduction

Welcome to the Unibui Job Board Application! This project was created as part of an assignment to demonstrate the development of a scalable, efficient, and user-friendly job board application using modern web technologies. The goal was to build an application that provides a seamless experience for users to browse, search, and manage job listings, leveraging the power of static site generation with Next.js.

## Explanation and Thought Process

**CSV File Enhancement:**

The provided CSV file did not contain an ID for each row, which is essential for efficiently handling and referencing job listings within the application. To address this, I generated a unique ID for each row. This decision was driven by the need to:

- Ensure each job listing can be uniquely identified and accessed.
- Facilitate CRUD (Create, Read, Update, Delete) operations on the job listings.
- Improve data integrity and reduce the likelihood of duplicate entries.

**Utilizing Screen Real Estate:**

As I discussed in the video, there was a significant amount of unused white space on the right side of the job listings. To make better use of this space and enhance the user experience, I proposed rendering the student profile in this area. This design choice was motivated by several factors:

- Providing quick access to the student profile allows users to easily switch preferences for job types, making the application more interactive and user-friendly.
- Leveraging the white space effectively helps in creating a balanced and visually appealing layout.

**Technology Stack and Trade-offs:**

The application is built using a full stack Next.js framework with static site generation (SSG) for the job listing page and job details page. Here’s a breakdown of the thought process and trade-offs involved in this choice:

1. **Performance:**

   - **Benefit:** Static site generation ensures that the job listing and job details pages are pre-rendered at build time, resulting in faster page load times and improved performance for end-users.
   - **Trade-off:** Changes to job listings require a rebuild of the static pages, which can introduce a slight delay in reflecting updates. This was deemed acceptable given the performance benefits for users.

2. **SEO (Search Engine Optimization):**

   - **Benefit:** SSG enhances SEO as the content is available at build time and can be easily indexed by search engines, improving the visibility of job listings.
   - **Trade-off:** For dynamic content that changes frequently, we might need to incorporate Incremental Static Regeneration (ISR) or a hybrid approach to ensure updates are efficiently handled.

3. **Scalability:**

   - **Benefit:** By using Next.js and SSG, the application can handle a large number of concurrent users with minimal server load, as most of the content is served as static files.
   - **Trade-off:** Initial setup and build processes can be more complex, requiring careful planning and configuration to ensure optimal performance and scalability.

4. **Development Efficiency:**

   - **Benefit:** Next.js provides a robust framework with built-in support for routing, API integration, and static generation, which accelerates development and reduces the need for boilerplate code.
   - **Trade-off:** The learning curve for developers unfamiliar with Next.js or React can be steeper, but the long-term gains in productivity and maintainability outweigh this initial investment.

5. **Static File vs. Database Integration:**
   - **Decision:** Because we are reading from a static file, I did not apply asynchronous features in Next.js that are typically used for streaming data from a database.
   - **Explanation:** Utilizing a static file allows for quicker initial setup and simpler deployment. However, it means we forego certain dynamic features, such as rendering a loading UI with skeleton screens while fetching data asynchronously.
   - **Trade-off:** This decision simplifies the application architecture but at the cost of not having real-time data updates and loading states. If the project scales or requires more dynamic data handling, we can transition to a database-backed approach with Next.js’s API routes and Incremental Static Regeneration (ISR).

By carefully considering these factors, I aimed to create a job board application that is not only performant and user-friendly but also scalable and maintainable in the long run.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mynhinguyentruong/unibui-assessment.git
   cd unibui-job-board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Usage

1. **Search for Jobs:**
   Use the search bar to filter job listings by title, company, or location.

2. **View Job Details:**
   Click on a job listing to view detailed information about the job.

3. **Save/Unsave Jobs:**
   Click the save button to save a job listing or unsave it if already saved.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, please create a pull request or open an issue.

1. **Fork the repository**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-name
   ```
