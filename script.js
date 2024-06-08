document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;

    const score = rateWebsite(url);

    document.getElementById('result').innerText = `The suspicion score for ${url} is: ${score}`;
});



function rateWebsite(url) {
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

    return Math.min(score, 100);
}
