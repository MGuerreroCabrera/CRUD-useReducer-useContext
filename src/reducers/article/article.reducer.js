export const ARTICLE_INITIAL_STATE = {
    article: {},
    articles: []
}

export const articleReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ARTICLE":
            return { ...state, article: action.payload };
        case "FETCH_ARTICLES":
            return { ...state, articles: action.payload };
        default:
            return { ...state };
    }
}