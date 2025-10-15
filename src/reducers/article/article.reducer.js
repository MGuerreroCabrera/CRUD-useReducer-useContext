// Definir estados iniciales
export const ARTICLE_INITIAL_STATE = {
    articles: [],
    pagintation: {
        currentPage: 1,
        limit: 10,
        totalArticles
    }
}

// Crear el reducer
export const articleReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ARTICLES_SUCCESS":
            return { ...state, articles: action.payload.articles, pagination: {
                ...state.pagination, 
                currentPage: action.payload.currentPage,
                limit: action.payload.limit,
                totalArticles: action.payload.totalArticles
            } };
        case "UPDATE_ARTICLE_SUCCESS":
            return { ...state, articles: state.articles.map(article => article._id === action.payload._id ? action.payload : article ) };
        case "DELETE_ARTICLE_SUCCESS":            
            return { ...state, articles: state.articles.filter(article => article._id !== action.payload.id) };
        default:
            return state;
    }
}