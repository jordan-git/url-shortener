const urlInput = document.querySelector('#url');
const shortInput = document.querySelector('#short');
const shortUrlContainer = document.querySelector('#short-url');

async function shortenUrl() {
    const url = urlInput.value;
    const short = shortInput.value;

    const response = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ url, short }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    const parsed = await response.json();

    while (shortUrlContainer.firstChild)
        shortUrlContainer.remove(shortUrlContainer.firstChild);

    const a = document.createElement('a');
    a.href = `http://localhost:4000/${parsed.short}`;
    a.setAttribute('rel', 'noreferrer');
    a.setAttribute('target', '_blank');
    a.textContent = `http://localhost:4000/${parsed.short}`;

    const span = document.createElement('span');
    span.textContent = 'Your shortened URL is: ';
    span.append(a);

    shortUrlContainer.append(span);
}

document.querySelector('#shorten-btn').addEventListener('click', async (e) => {
    e.preventDefault();

    await shortenUrl();
    console.log('done');
});
