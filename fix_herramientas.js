const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'herramientas');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const scriptsToInject = `
    <script src="../assets/js/theme-toggle.js"></script>
    <script>
        // Trigger reveal animations on load for tool pages
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                document.querySelectorAll('.mc-reveal').forEach(el => el.classList.add('visible'));
            }, 100);
        });
    </script>
    <script src="../assets/js/migobot.js"></script>
`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old script if needed
    if (!content.includes('theme-toggle.js')) {
        content = content.replace(
            /<\/body>/,
            scriptsToInject + '\n</body>'
        );
        fs.writeFileSync(filePath, content);
        console.log(`Fixed scripts in ${file}`);
    }
}
