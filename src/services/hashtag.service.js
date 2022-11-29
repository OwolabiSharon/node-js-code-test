let regexTag = (data) => {
    let first = data.replace(/[^A-Z0-9]/ig, "");
    let toCreateBody = first.replace(/\s+/g, '');

    let createHashtag = toCreateBody.toLowerCase();

    return createHashtag
}

module.exports = {
    regexTag
}