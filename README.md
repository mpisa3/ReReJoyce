# re:rejoyce - A Guided Journey Through Ulysses

A website dedicated to guiding readers through James Joyce's *Ulysses*, continuing in the spirit of Frank Delaney's beloved podcast *Re:Joyce*.

## About

This website provides comprehensive information about all 18 episodes of *Ulysses*, including:
- Homeric parallels and schema information (time, place, organ, art, color, symbol, technique)
- Episode overviews and key themes
- Historical and cultural context
- Key passages and moments from each episode

## Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with a scholarly, literary aesthetic
- `episodes-data.js` - Comprehensive data for all 18 episodes
- `script.js` - Interactive functionality and navigation
- `README.md` - This file

## Deployment

### Option 1: GitHub Pages (Recommended for Free Hosting)

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Set Source to "main" branch
5. Your site will be live at `https://yourusername.github.io/repositoryname`

### Option 2: Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Drag and drop the project folder into Netlify
3. Your site will be live instantly with a custom URL
4. You can add a custom domain in settings

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click
4. Add custom domain if desired

## Expanding the Site

The website is designed to be easily expandable. Here are some ways to enhance it:

### Adding Passage-by-Passage Annotations

You can add detailed annotations for specific passages by expanding the `episodes-data.js` file. Add an `annotations` array to each episode:

```javascript
{
    number: 1,
    title: "Telemachus",
    // ... existing data ...
    annotations: [
        {
            passage: "Stately, plump Buck Mulligan...",
            lineReference: "1:1",
            notes: [
                "The opening word 'Stately' parodies epic openings and religious ceremony",
                "Buck Mulligan is based on Oliver St. John Gogarty, Joyce's friend"
            ]
        }
        // Add more annotations...
    ]
}
```

Then update `renderEpisodeDetail()` in `script.js` to display these annotations.

### Adding Search Functionality

You could add a search feature to find specific terms, themes, or passages across all episodes:

```javascript
function searchEpisodes(query) {
    return episodesData.filter(episode => 
        episode.title.toLowerCase().includes(query.toLowerCase()) ||
        episode.overview.toLowerCase().includes(query.toLowerCase()) ||
        episode.themes.some(theme => theme.toLowerCase().includes(query.toLowerCase()))
    );
}
```

### Adding Character Tracking

Track character appearances across episodes:

```javascript
{
    number: 1,
    title: "Telemachus",
    characters: ["Stephen Dedalus", "Buck Mulligan", "Haines"],
    // ...
}
```

### Adding Images

You can enhance episodes with relevant images:
- Maps of Dublin locations
- Historical photographs from 1904
- Illustrations of key scenes
- Portraits of Joyce and scholars

### Adding Reading Progress Tracking

Implement local storage to track which episodes the user has read:

```javascript
function markEpisodeRead(episodeNumber) {
    const readEpisodes = JSON.parse(localStorage.getItem('readEpisodes') || '[]');
    if (!readEpisodes.includes(episodeNumber)) {
        readEpisodes.push(episodeNumber);
        localStorage.setItem('readEpisodes', JSON.stringify(readEpisodes));
    }
}
```

### Adding Resources Section

Create a resources page with:
- Links to online versions of *Ulysses*
- Scholarly articles and papers
- Podcasts and lectures
- Maps of Joyce's Dublin
- Recommended reading order

### Creating a Blog or Commentary Section

Add your own commentary and analysis as you read through the novel, building out the annotations over time.

## Sources & Attribution

This site draws from:
- **The Joyce Project** (Boston College) - Scholarly annotations
- **Don Gifford's *Ulysses Annotated*** - Standard reference work
- **The Linati and Gilbert Schemas** - Joyce's structural frameworks
- Historical and geographical references about 1904 Dublin

All content is presented for educational purposes with proper attribution.

## Copyright & Fair Use

- The text of *Ulysses* is in the public domain (published 1922)
- This site provides commentary, analysis, and educational context
- All scholarly sources are cited and referenced appropriately
- Use follows fair use guidelines for educational and transformative purposes

## Contributing

To expand this site:

1. Add more detailed annotations to `episodes-data.js`
2. Create additional pages for specific topics (characters, themes, Dublin geography)
3. Add visual elements and multimedia
4. Expand the "About" section with more context about Joyce, *Ulysses*, and Frank Delaney
5. Add interactive features like reading progress tracking or discussion forums

## Technical Notes

- Pure HTML/CSS/JavaScript - no build process required
- Responsive design works on all devices
- Uses CSS Grid and Flexbox for layouts
- Smooth client-side navigation with hash routing
- Easily customizable color scheme via CSS variables
- Accessibility features included (semantic HTML, proper heading hierarchy)

## Future Enhancements

Potential features to add:
- Full-text search across all episodes
- Reading group discussion questions
- Timeline visualization of the day's events
- Interactive map of Dublin locations
- Audio readings of key passages
- Comparison with Homer's *Odyssey*
- Character relationship diagrams
- Glossary of Irish terms and historical references

## Tribute

This site is created in memory of Frank Delaney (1942-2017), whose *Re:Joyce* podcast made Joyce's masterwork accessible and engaging for countless readers. His patient, enthusiastic guidance through the opening episodes of *Ulysses* remains an invaluable resource and inspiration.

## License

This project is intended for educational use. Feel free to fork, modify, and build upon it for your own Joyce studies or to create similar guides for other complex literary works.

---

*"Think you're escaping and run into yourself. Longest way round is the shortest way home."* - James Joyce, *Ulysses*
