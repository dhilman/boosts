const DEBUG = false

function parseTwitterNumber(num) {
    if (num.endsWith("K")) {
        return parseFloat(num.slice(0, -1)) * 1000
    }
    if (num.endsWith("M")) {
        return parseFloat(num.slice(0, -1)) * 1000000
    }
    return parseInt(num.replaceAll(",", ""))
}

function formatNumber(num) {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 10000) {
        return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(0)
}

function calculateRatio(views, likes) {
    const numViews = parseTwitterNumber(views)
    const numLikes = parseTwitterNumber(likes)
    return `1/${formatNumber(numViews / numLikes)}`
}

function createRatioSpan(ratio) {
    const ratioSpan = document.createElement("span")
    ratioSpan.innerHTML = ratio
    ratioSpan.style.fontSize = '10px'
    ratioSpan.style.paddingLeft = '4px'
    return ratioSpan
}

/**
 * Parses number of views and likes, if both are available, calculates the ratio and appends
 * to the like count element.
 *
 * @param {Element} el - Element containing all tweet metrics as child divs (views, comments, retweets, likes).
 *                    Example: <div aria-label="14 replies, 7 Retweets... ">
 */
function addLikeRatio(el) {
    const children = el.children
    if (children.length < 3) {
        if (DEBUG) console.log(`Not enough children: ${children.length}`)
        return
    }
    const views = children[0].textContent
    if (!views || views === "") {
        if (DEBUG) console.log(`No view count found for element: ${el.id}`)
        return
    }
    if ((children[3]?.textContent || "") === "") {
        if (DEBUG) console.log(`No like count found for element: ${el.id}`)
        return
    }
    const likesEl = children[3].firstChild.firstChild?.childNodes[1]?.firstChild?.firstChild
    if (!likesEl) {
        if (DEBUG) console.log(`No like element found for element: ${el.id}`)
        return
    }
    const likes = likesEl.firstChild.textContent
    const ratio = calculateRatio(views, likes)
    if (likesEl.childElementCount === 1) {
        const ratioSpan = createRatioSpan(ratio)
        likesEl.appendChild(ratioSpan)
    } else {
        likesEl.children[1].innerHTML = ratio
    }
}

function addLikeRatios() {
    const elements = document.querySelectorAll(".r-1ta3fxp")
    if (DEBUG) console.log(`Found ${elements.length} elements`)
    elements.forEach(addLikeRatio)
}

setInterval(addLikeRatios, 4000)
