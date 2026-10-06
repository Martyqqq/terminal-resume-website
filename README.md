# terminal-resume-website

This is essentially a copy of my [simple-resume-website](https://github.com/Martyqqq/simple-resume-website.git) that I am hosting, but with a terminal design instead. It is meant to serve as a professional portfolio.

The website has the traditional "hacker terminal" aesthetic, as seen in movies. It has green text on a black background, a blinking block cursor, and a prompt that types `welcome` when the page loads. Each section is shown as the output of a shell command.

I don't plan on hosting this, as this was just something I thought was cool and decided to create it.

Anybody can use it, but obviously use their own information and resume. 

## Features
- **Terminal Look:** Colors taken from a screen recording of macOS Terminal (`#30FD21` on `#050505`), Menlo font, and a faint CRT overlay.
- **Command Bar:** Links at the top jump to each section and stay visible while you scroll.
- **Working Prompt:** The prompt at the bottom of the page accepts commands. Try `help`.
- **Minimal JavaScript:** All content is plain HTML, so recruiters, search engines and screen readers see everything. The script only adds the typing intro and the prompt.
- **Mobile Optimization:** Responsive layout, keyboard focus styles, a skip link, and no animation for visitors who turn on reduced motion.
- **No Dependencies:** No framework, no build step, and nothing loaded from other sites.

## Sections
| Command | Section |
| --- | --- |
| `whoami` | About |
| `experience` | AWS, Indiana Tech IT and Indiana Tech Cyber Warriors |
| `projects` | Home labs and the Insight Analyst app |
| `skills` | Security, sysadmin, tools, and networking |
| `education` | Degree and coursework |
| `accolades` | CCDC placements and awards |
| `contact` | Phone, email, LinkedIn, GitHub, resume, and gallery |

## Other Commands
- `resume`
- `github`
- `linkedin`
- `gallery`
- `ls`
- `cat <file>`
- `cd <section>`
- `date`
- `echo`
- `history`
- `clear`

Up and Down arrows go through command history, and Tab completes a command.

## Files
```
├── index.html                 # all page content
├── style.css                  # terminal theme
├── main.js                    # typing intro and interactive prompt
└── MartinQuintanaResume.pdf   # resume, linked from the page (add it yourself)
```

## Editing Content
- **Text:** Every section is in `index.html`, inside a `<section>` with the same id as its command (for example `id="experience"`).
- **Colors and font:** Edit the variables at the top of `style.css`.
- **New section:** Add a `<section id="name">` to `index.html`, a link in the `<nav class="cmdbar">`, and the name to the `sections` list in `main.js` so that it all properly works.
