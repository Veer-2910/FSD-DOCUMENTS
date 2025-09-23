let votes = {
  JavaScript: 0,
  Python: 0,
  Java: 0,
  "C++": 0,
};
function vote(language) {
  if (language === "JavaScript") {
    votes.JavaScript++;
  } else if (language === "Python") {
    votes.Python++;
  } else if (language === "Java") {
    votes.Java++;
  }
  if (language === "Reset") {
    votes.JavaScript = 0;
    votes.Python = 0;
    votes.Java = 0;
  }
  showVotes();
}

function showVotes() {
  document.getElementById("JavaScript").innerText = votes.JavaScript;
  document.getElementById("Python").innerText = votes.Python;
  document.getElementById("Java").innerText = votes.Java;
}
setInterval(() => {
  let options = ["JavaScript", "Python", "Java"];
  let random = options[Math.floor(Math.random() * options.length)];
  vote(random);
}, 2000);
