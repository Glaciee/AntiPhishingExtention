document.getElementById('ratingForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;

    const score = await rateWebsite(url); // Wait for the score to be calculated

    const progressBarFill = document.getElementById('progress-bar-fill');
    const scoreText = document.getElementById('score-text');

    progressBarFill.style.width = score + '%';
    progressBarFill.textContent = score + '%';
    scoreText.textContent = `The suspicion score for ${url} is: ${score}`;
});

async function rateWebsite(url) {
    let score = 0;

    // Check if URL starts with http
    if (url.startsWith('http://')) {
        score += 20;
    }

    // Check for certain TLDs
    const suspiciousTLDs = ['.xyz', '.top', '.club', '.info', '.biz'];
    for (const tld of suspiciousTLDs) {
        if (url.includes(tld)) {
            score += 30;
            break;
        }
    }

    // Check for URL length
    if (url.length > 30) {
        score += 20;
    }

    // Check for specific keywords
    const suspiciousKeywords = ['free', 'win', 'cheap', 'bonus', 'prize', 'click', 'giveaway', 'more', 'fast', 'risk-free', 'unlimited', 'premium', 'money'];
    for (const keyword of suspiciousKeywords) {
        if (url.includes(keyword)) {
            score += 20;
            break;
        }
    }

    // Check for special characters
    if (url.includes('$$$') || url.includes('!!!') || url.includes('###')) {
        score += 10;
    }

    // Fetch the content of the URL and check for suspicious keywords
    try {
        const response = await fetch(url);
        const content = await response.text();
        const contentSuspiciousKeywords = ['urgent', 'sus', 'win', 'scam', 'free', 'enable', 'allow', 'win', 'giveaway', 'IP', 'threat', 'download', 'money', 'premium', 'unlimited', 'click', 'bonus', 'claim', 'prize'];
        const isSuspicious = contentSuspiciousKeywords.some(keyword => content.includes(keyword));
        if (isSuspicious) {
            score += 50;
        }
    } catch (error) {
        alert (`Error fetching link: ${url}`, error);
    }

    return Math.min(score, 100);
}
