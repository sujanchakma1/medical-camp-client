import React from "react";

const blogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    author: "John Doe",
    date: "2025-08-10",
    image: "https://i.ibb.co.com/jZ379pgd/programming-background-with-person-working-with-codes-computer-23-2150010125.jpg",
    description:
      "Web development is evolving rapidly with frameworks, AI, and automation tools. In this article, we explore how developers can stay ahead in the coming years.",
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    author: "Jane Smith",
    date: "2025-08-12",
    image: "https://i.ibb.co.com/Cs3gVj70/React-Hooks-1024x512.webp",
    description:
      "React Hooks have changed the way we write components. Learn how useState, useEffect, and custom hooks can simplify your application logic.",
  },
  {
    id: 3,
    title: "Top 10 JavaScript Tips",
    author: "Mark Wilson",
    date: "2025-08-14",
    image: "https://i.ibb.co.com/0b36wQv/choosing-the-best-javascript-frameworks-for-your-next-project.png",
    description:
      "JavaScript is a powerful language, but there are tricks that can make your code cleaner and faster. Here are 10 tips every JS developer should know.",
  },
  {
    id: 4,
    title: "Why Tailwind CSS is Popular",
    author: "Emily Carter",
    date: "2025-08-15",
    image: "https://i.ibb.co.com/7dWmG16C/images.png",
    description:
      "Tailwind CSS has gained popularity for its utility-first approach. Find out why developers love it and how it improves productivity.",
  },
  {
    id: 5,
    title: "Getting Started with Node.js",
    author: "Alex Brown",
    date: "2025-08-16",
    image: "https://i.ibb.co.com/99t3G36d/images.jpg",
    description:
      "Node.js allows you to run JavaScript on the server. This guide will help you understand the basics and get started with building your first server.",
  },
  {
    id: 6,
    title: "The Importance of Cybersecurity",
    author: "Sophia Lee",
    date: "2025-08-16",
    image: "https://i.ibb.co.com/BKzFhwHq/cyber-security-shield-protection-concept-information-or-network-online-banking-system-binary-code-we.jpg",
    description:
      "In today's digital world, cybersecurity is more important than ever. Learn the best practices to keep your applications and data safe.",
  },
];

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-102 transition-all bg-white"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-700 mt-2">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
