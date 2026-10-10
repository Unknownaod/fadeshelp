"use client";

import { useMemo, useState } from "react";
import "./support.css";

const LOGO_SRC = "/logo.png";

const CATEGORIES = [
  { id: "getting-started", icon: "✦", title: "Getting Started", description: "New to Fades? Start here and get everything set up.", count: "6 articles", color: "violet" },
  { id: "account", icon: "♙", title: "Fades Account", description: "Login, profile settings, verification, and account security.", count: "8 articles", color: "blue" },
  { id: "mail", icon: "✉", title: "Fades Mail", description: "Email, inbox organization, attachments, and delivery.", count: "7 articles", color: "green" },
  { id: "ai", icon: "✧", title: "Fades AI", description: "Get help with conversations, models, and your workspace.", count: "5 articles", color: "gold" },
  { id: "browser", icon: "◉", title: "Fades Browser", description: "Installation, updates, browsing, and troubleshooting.", count: "6 articles", color: "cyan" },
  { id: "privacy", icon: "⬡", title: "Privacy & Security", description: "Learn how to protect your account and your information.", count: "5 articles", color: "pink" },
];

const ARTICLES = [
  { title: "How do I create and secure my Fades account?", category: "Fades Account", categoryId: "account", description: "Set up your account, review your details, and keep your sign-in secure.", time: "3 min read", popular: true },
  { title: "I can't sign in to my Fades account", category: "Fades Account", categoryId: "account", description: "Steps to try if your password or sign-in session isn't working.", time: "4 min read", popular: true },
  { title: "Getting started with Fades Mail", category: "Fades Mail", categoryId: "mail", description: "Learn the basics of your inbox, folders, and message settings.", time: "3 min read", popular: true },
  { title: "Install or update Fades Browser", category: "Fades Browser", categoryId: "browser", description: "Find the latest version and troubleshoot common installation issues.", time: "4 min read", popular: true },
  { title: "Manage your account sessions", category: "Privacy & Security", categoryId: "privacy", description: "Review active sessions and sign out of devices you no longer use.", time: "2 min read", popular: false },
  { title: "How to get started with Fades AI", category: "Fades AI", categoryId: "ai", description: "Start a conversation and learn the basics of the Fades AI workspace.", time: "2 min read", popular: false },
  { title: "Troubleshoot missing email attachments", category: "Fades Mail", categoryId: "mail", description: "What to check when an attachment won't load or appear in a message.", time: "3 min read", popular: false },
  { title: "Reset your password", category: "Fades Account", categoryId: "account", description: "Recover access if you've forgotten your password.", time: "2 min read", popular: false },
];

function Logo({ size = 32 }) {
  return <img className="fs-logo" src={LOGO_SRC} width={size} height={size} alt="Fades" />;
}

function SearchIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}

function ArrowIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
}

function BookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 5.5v16M8 7h8M8 11h7" /></svg>;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === "all" || article.categoryId === activeCategory;
      const matchesSearch = !query || `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const popularArticles = filteredArticles.filter((article) => article.popular);

  function selectCategory(id) {
    setActiveCategory(id);
    document.getElementById("help-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="support-page">
      <header className="support-nav">
        <a href="/" className="support-brand" aria-label="Fades Support home">
          <span className="support-brand-logo"><Logo size={29} /></span>
          <span className="support-brand-name">Fades <span>Support</span></span>
        </a>
        <nav className="support-nav-links" aria-label="Main navigation">
          <a className="nav-current" href="#help-categories">Help center</a>
          <a href="#help-articles">Guides</a>
          <a href="https://fades.lol" target="_blank" rel="noreferrer">Fades home <span className="nav-external">↗</span></a>
        </nav>
        <a className="nav-contact" href="mailto:support@fades.lol">Contact support <ArrowIcon /></a>
      </header>

      <section className="support-hero">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-content">
          <div className="support-pill"><span className="pill-dot" /> THE FADES HELP CENTER</div>
          <h1>How can we<br /><span>help you today?</span></h1>
          <p>Find answers, explore guides, and get back to what you were doing.</p>
          <label className="support-search">
            <SearchIcon />
            <input value={search} onChange={(event) => { setSearch(event.target.value); if (event.target.value) setActiveCategory("all"); }} placeholder="Search for answers..." aria-label="Search help articles" />
            {search ? <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button> : <kbd>⌘ K</kbd>}
          </label>
          <div className="search-suggestions"><span>Popular:</span><button onClick={() => setSearch("sign in")}>Can't sign in</button><i>·</i><button onClick={() => setSearch("password")}>Reset password</button><i>·</i><button onClick={() => setSearch("Fades Mail")}>Fades Mail</button></div>
        </div>
        <div className="hero-bottom-note"><span className="note-line" /> A little help goes a long way <span className="note-line" /></div>
      </section>

      <div className="support-container">
        <section className="category-section" id="help-categories">
          <div className="section-heading">
            <div><span className="section-kicker">BROWSE BY TOPIC</span><h2>What do you need help with?</h2><p>Choose a category to find the right answers.</p></div>
            <span className="heading-mark">01 <span>/ 03</span></span>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((category) => (
              <button type="button" key={category.id} className={`category-card ${category.color} ${activeCategory === category.id ? "category-selected" : ""}`} onClick={() => selectCategory(category.id)}>
                <span className="category-top"><span className="category-icon">{category.icon}</span><span className="category-arrow"><ArrowIcon /></span></span>
                <span className="category-title">{category.title}</span>
                <span className="category-description">{category.description}</span>
                <span className="category-bottom"><span>{category.count}</span><span className="category-open">Explore <ArrowIcon /></span></span>
              </button>
            ))}
          </div>
        </section>

        <section className="articles-section" id="help-articles">
          <div className="section-heading article-heading">
            <div><span className="section-kicker">THE KNOWLEDGE BASE</span><h2>{search ? "Search results" : activeCategory === "all" ? "Popular help articles" : `${CATEGORIES.find((item) => item.id === activeCategory)?.title || "Help"} guides`}</h2><p>{search ? `Answers matching “${search}”.` : "Quick answers to questions people ask most."}</p></div>
            <button className="view-all" onClick={() => { setActiveCategory("all"); setSearch(""); }}>View all articles <ArrowIcon /></button>
          </div>
          {filteredArticles.length ? <div className="article-list">{(search || activeCategory !== "all" ? filteredArticles : popularArticles).map((article, index) => (
            <a className="article-row" href={`mailto:support@fades.lol?subject=${encodeURIComponent(`Help request: ${article.title}`)}`} key={article.title}>
              <span className="article-icon"><BookIcon /></span>
              <span className="article-copy"><span className="article-category">{article.category}</span><strong>{article.title}</strong><span className="article-description">{article.description}</span></span>
              <span className="article-time">{article.time}</span><span className="article-arrow"><ArrowIcon /></span>
            </a>
          ))}</div> : <div className="empty-results"><span className="empty-search"><SearchIcon size={24} /></span><h3>No matching articles</h3><p>Try another search term or browse a category above.</p><button onClick={() => { setSearch(""); setActiveCategory("all"); }}>Clear filters</button></div>}
        </section>

        <section className="contact-banner">
          <div className="contact-art"><span className="art-ring art-ring-one" /><span className="art-ring art-ring-two" /><span className="art-star">✦</span><Logo size={54} /></div>
          <div className="contact-copy"><span className="section-kicker">STILL NEED A HAND?</span><h2>We're here to help.</h2><p>Couldn't find what you were looking for? Get in touch with the Fades support team.</p></div>
          <a className="contact-button" href="mailto:support@fades.lol?subject=Fades%20Support%20Request">Contact support <ArrowIcon /></a>
        </section>

        <section className="status-strip">
          <span className="status-indicator"><span /> Service status</span>
          <span className="status-copy">Having trouble? Check back here for help or contact our team.</span>
          <a href="mailto:support@fades.lol?subject=Service%20issue">Report an issue <ArrowIcon /></a>
        </section>
      </div>

      <footer className="support-footer">
        <a href="/" className="footer-brand"><Logo size={25} /><span>Fades <b>Support</b></span></a>
        <span className="footer-copyright">© {new Date().getFullYear()} Fades. Made to make things easier.</span>
        <div className="footer-links"><a href="https://fades.lol" target="_blank" rel="noreferrer">Fades home</a><a href="mailto:support@fades.lol">Contact</a><a href="https://fades.lol" target="_blank" rel="noreferrer">Privacy</a></div>
      </footer>


    </main>
  );
}
