document.querySelectorAll("nav a,.footer-menu a, .text a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const tabs = document.querySelectorAll('.tab');
const contentTitle = document.getElementById('content-title');
const contentText = document.getElementById('content-text');

const contents = {
  mission: {
    title: "",
    text: "To create an immersive, user-friendly platform that brings cricket enthusiasts together by simplifying tournament organization, management, and engagement for players, organizers, and fans."
  },
  vision: {
    title: "",
    text: "To be the premier digital destination for local and international cricket tournaments, fostering a dynamic community that shares the thrill and spirit of cricket worldwide."
  },
  values: {
    title: "",
    text: "At STUMPSCONNECT, We’re passionate about cricket, committed to transparent processes, and focused on delivering innovative tools for seamless tournament management."
  }
};

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.style.backgroundColor = '';
      t.style.color = '';
    });
    this.classList.add('active');

    const selectedContent = this.getAttribute('data-content');
    contentTitle.innerText = contents[selectedContent].title;
    contentText.innerText = contents[selectedContent].text;
  });

  tab.addEventListener('mouseenter', function() {
    if (!this.classList.contains('active')) {
      this.style.backgroundColor = '#009688';
      this.style.color = 'white';
    }
  });

  tab.addEventListener('mouseleave', function() {
    if (!this.classList.contains('active')) {
      this.style.backgroundColor = '';
      this.style.color = '';
    }
  });
});

const searchInput = document.querySelector('.search-input');
const blogCards = document.querySelectorAll('.blog-card');

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.toLowerCase();

  blogCards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const author = card.querySelector('.author').innerText.toLowerCase();
    const date = card.querySelector('.date').innerText.toLowerCase();


    if (title.includes(searchTerm) || author.includes(searchTerm) || date.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

const searchTerms = [
  { name: "Salford & CO" },
  { name: "VJIM ALUMNI" },
  { name: "Your Club" },
  { name: "Sports Club" }
];

const fuse = new Fuse(searchTerms, {
  keys: ["name"],
  threshold: 0.4, // Adjust this for stricter or looser matching
});

const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  const results = fuse.search(query);

  // Clear old suggestions
  suggestions.innerHTML = "";

  // Show new suggestions
  results.forEach(result => {
    const suggestionItem = document.createElement("div");
    suggestionItem.textContent = result.item.name;
    suggestionItem.classList.add("suggestion-item");


    suggestionItem.addEventListener("click", () => {
      searchInput.value = result.item.name;
      suggestions.innerHTML = "";
    });

    suggestions.appendChild(suggestionItem);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".tournament-search")) {
    suggestions.innerHTML = "";
  }
});

const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    faq.classList.toggle('active'); 
  });
});
