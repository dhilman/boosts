const Format = {
    Percentage: 0, // e.g. 0.42%
    Ratio: 1  // e.g. 1/238
}

// Config
const CONFIG = {
    // Which metrics the view ratios should be enabled for
    Comments: true,
    Retweets: true,
    Likes: true,

    // Specifies the formatting of the metric.
    Format: Format.Percentage,
}

// Debug logging
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
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(0)
}

function calculateRatio(strNum1, strNum2) {
    const num1 = parseTwitterNumber(strNum1)
    const num2 = parseTwitterNumber(strNum2)
    if (CONFIG.Format === Format.Percentage) {
        return `${(num2 / num1 * 100).toFixed(2)}%`
    }
    return `1/${formatNumber(num1 / num2)}`
}

function createRatioSpan(ratio) {
    const ratioSpan = document.createElement("span")
    ratioSpan.innerHTML = ratio
    ratioSpan.style.fontSize = '10px'
    ratioSpan.style.paddingLeft = '4px'
    return ratioSpan
}

/**
 * Parses the count within the provided element, calculates the count/view ratio and appends to the child most element.
 *
 * @param {string} views
 * @param {Element} el - Top level metric element. Direct child of the metrics row.
 * @param {string} name - metric name
 */
function addRatio(views, el, name) {
    if (!el || !el?.textContent || el?.textContent === "") {
        if (DEBUG) console.log(`No ${name} count found for element: ${el?.id}`)
        return
    }
    const textEl = el.firstChild?.firstChild?.childNodes[1]?.firstChild?.firstChild
    if (!textEl) {
        if (DEBUG) console.log(`Necessary child element not found ${name} ${el?.id}`)
        return
    }
    const count = textEl.firstChild.textContent
    const ratio = calculateRatio(views, count)
    if (textEl.childElementCount === 1) {
        const ratioSpan = createRatioSpan(ratio)
        textEl.appendChild(ratioSpan)
    } else {
        textEl.children[1].innerHTML = ratio
    }
}

/**
 * Calculates and appends metric/view ratio to the innermost metric elements.
 *
 * @param {Element} el - Element containing all tweet metrics as child divs (views, comments, retweets, likes).
 *                    Example: <div aria-label="14 replies, 7 Retweets... ">
 */
function addMetricRatios(el) {
    const children = el.children
    if (children.length < 3) {
        if (DEBUG) console.log(`Not enough children: ${children.length} ${el.id}`)
        return
    }
    const views = children[0].textContent
    if (!views || views === "") {
        if (DEBUG) console.log(`No view count found for element: ${el.id}`)
        return
    }
    if (CONFIG.Comments) addRatio(views, children[1], "comments")
    if (CONFIG.Retweets) addRatio(views, children[2], "retweets")
    if (CONFIG.Likes) addRatio(views, children[3], "likes")
}

function addMetricRatioForMainTweet() {
    const viewNodeClass = ".r-1b43r93"
    const metricsNodeClass = ".r-1dgieki"

    const viewNode = document.querySelector(viewNodeClass)
    if (!viewNode) {
        if (DEBUG) console.log(`No view node found: ${viewNodeClass}`)
        return
    }
    const views = viewNode.textContent
    if (!views || views === "") {
        if (DEBUG) console.log(`No view count found for element: ${viewNodeClass}`)
        return
    }

    const metricsListNode = document.querySelector(metricsNodeClass)
    if (!metricsListNode) {
        if (DEBUG) console.log(`No metrics node found: ${metricsNodeClass}`)
        return
    }
    const children = metricsListNode.children
    if (children.length < 1) {
        if (DEBUG) console.log(`Not enough metrics: ${children.length} ${metricsNodeClass}`)
        return
    }
    for (let i = 0; i < children.length; i++) {
        addRatio(views, children[i], `main tweet ${i}`)
    }
}

function addMetricRatiosForAll() {
    const elements = document.querySelectorAll(".r-1ta3fxp")
    if (DEBUG) console.log(`Found ${elements.length} elements`)
    elements.forEach(addMetricRatios)
}

setInterval(addMetricRatioForMainTweet, 2000)
setInterval(addMetricRatiosForAll, 4000)
