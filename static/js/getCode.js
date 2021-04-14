// returns a promise

async function getCode(difficulty) {
    try {
    max_param= {
                "easy": 4,
                "normal": 7,
                "hard": 9
    }
    const num = max_param[difficulty]
    const result = await fetch(`https://www.random.org/integers/?num=4&min=0&max=${num}&col=1&base=10&format=plain&rnd=new`, {});
    const data = await result.text();
    html = data.replace(/\n/g,'');
    localStorage.setItem('code', JSON.stringify(html));
    return html
} catch (e) {
    console.log(e)
    return null;
}

}



module.exports = getCode;