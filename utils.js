
/**
 * Returns all class names of the node that do not occur on any other HTML elements.
 *
 * @param {Node} node - The HTML Node to check for unique class names
 * @return {String[]} uniqueClasses
 */
function getAllUniqueClasses(node) {
    const allElements = document.getElementsByTagName("*");
    const uniqueClasses = []
    const nodeClasses = node.classList;

    for (let i = 0; i < nodeClasses.length; i++) {
        let currentClass = nodeClasses[i];
        let isUnique = true;

        for (let j = 0; j < allElements.length; j++) {
            if (allElements[j] === node) continue;
            if (allElements[j].classList.contains(currentClass)) {
                isUnique = false;
                break;
            }
        }

        if (isUnique) {
            uniqueClasses.push(currentClass)
        }
    }

    return uniqueClasses;
}

/**
 * Attempts to find a node with unique class names up the tree from the provided node.
 * Returns the unique class names and the node that the classes are on.
 *
 * @param {Node} node
 * @returns {[String, Node] | null} - [uniqueClassName, node] or null if no unique class name exists on any of the parents
 */
function getAllUniqueClassOnNodeOrParents(node) {
    const uniqueClasses = getAllUniqueClasses(node)
    if (uniqueClasses.length > 0) {
        return [uniqueClasses, node]
    }
    if (node.parentElement) {
        return getAllUniqueClassOnNodeOrParents(node.parentElement)
    }
    return null
}

/**
 * Returns the class name that if used to query the HTML document
 * will contain the node in the 0th index of the HTMLCollection.
 *
 * @param node
 * @returns {String[]}
 */
function getAllLeadingClasses(node) {
    const nodeClasses = node.classList;
    const leadingClasses = []
    for (let i = 0; i < nodeClasses.length; i++) {
        const currentClass = nodeClasses[i];
        const allElements = document.getElementsByClassName(currentClass);
        if (allElements.length === 1) {
            leadingClasses.push(currentClass)
            continue
        }
        if (allElements[0] === node) {
            leadingClasses.push(currentClass)
        }
    }
    return leadingClasses
}

function getAllLeadingClassOnNodeOrParents(node) {
    const leadingClasses = getAllLeadingClasses(node)
    if (leadingClasses.length > 0) {
        return [leadingClasses, node]
    }
    if (node.parentElement) {
        return getLeadingClassOnNodeOrParents(node.parentElement)
    }
    return null
}