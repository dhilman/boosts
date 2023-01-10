
/**
 * getUniqueClass returns the first class name that does not occur on any other HTML elements.
 *
 * @param {Node} node - The HTML Node to check for unique class names
 * @return {String | null} uniqueClass - The first unique class name found or an empty string if none exist
 */
function getUniqueClass(node) {
    const allElements = document.getElementsByTagName("*");
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
            return currentClass;
        }
    }

    return null;
}

/**
 * getUniqueClassOnNodeOrParents checks if the node has a unique class name, if not checks the parent node.
 *
 * @param {Node} node
 * @returns {[String, Node] | null} - [uniqueClassName, node] or null if no unique class name exists on any of the parents
 */
function getUniqueClassOnNodeOrParents(node) {
    const uniqueClass = getUniqueClass(node)
    if (uniqueClass) {
        return [uniqueClass, node]
    }
    if (node.parentElement) {
        return getUniqueClassOnNodeOrParents(node.parentElement)
    }
    return null
}

/**
 * getLeadingClass returns the class name that if used to query the HTML document
 * will contain the node in the 0th index of the HTMLCollection.
 *
 * @param node
 * @returns {string | null}
 */
function getLeadingClass(node) {
    const nodeClasses = node.classList;
    for (let i = 0; i < nodeClasses.length; i++) {
        const currentClass = nodeClasses[i];
        const allElements = document.getElementsByClassName(currentClass);
        if (allElements.length === 1) {
            return currentClass
        }
        if (allElements[0] === node) {
            return currentClass
        }
    }
    return null
}

function getLeadingClassOnNodeOrParents(node) {
    const leadingClass = getLeadingClass(node)
    if (leadingClass) {
        return [leadingClass, node]
    }
    if (node.parentElement) {
        return getLeadingClassOnNodeOrParents(node.parentElement)
    }
    return null
}