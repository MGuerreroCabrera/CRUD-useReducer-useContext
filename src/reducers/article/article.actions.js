import { API } from "../../utils/api/API";

// Límite de artículos por página
const ARTICLES_PER_PAGE = 10;

// Obtener lista de artículos paginados
export const fetchArticles = async (articleDispatch, globalDispatch, page = 1) => {
    globalDispatch({ thype: "LOADING" });
    globalDispatch({ type: "CLEAR_NOTIFICATIONS" });

    try {
        const limit = ARTICLES_PER_PAGE;
        const endpoint = `/articles?page=${page}&limit=${limit}`;

        const { error, response } = await API({ endpoint: endpoint });

        if(error) {
            globalDispatch({ type: "SET_ERROR", payload: error.message || "Error al listar los registros" });
            return;
        } 

        const articles = response;

        articleDispatch({ type: "FETCH_ARTICLES_SUCCES", payload: {
            articles: articles,
            currentPage: page,
            limit: limit
        } });

        // ¡LA CLAVE! Determinamos si es la última página:
        // Si la cantidad de artículos devueltos es menor que el límite, hemos llegado al final.
        const isLastPage = articles.length < limit;
        globalDispatch({ type: "SET_IS_LAST_PAGE", payload: isLastPage }); // Usamos totalPages para guardar isLastPage

    } catch (err) {
        globalDispatch({ type: "SET_ERROR", payload: err.message });
    }
}

export const getArticleById = async (globalDispatch, id) => {
    globalDispatch({ type: "LOADING" });
    const { error, response } = await API({ endpoint: `/articles/${id}`, method: "GET" });
    if(error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        return;
    }
    return response;
}

export const saveArticle = async (articleDispatch, globalDispatch, articleData, id = null) => {
    globalDispatch({ type:"LOADING" });
    let success = false;
    
    try {
        let method, endpoint, type, message;
        
        if(id) {
            method = "PUT";
            endpoint = `/articles/:${id}`;
            type = "UPDATE_ARTICLE_SUCCESS";
            message = "Artículo actualizado con éxito";
        } else {
            method = "POST";
            endpoint = "/articles";
            type = "ADD_ARTICLE_SUCCESS";
            message = "Articulo creado con éxito";
        }

        const { error, response } = await API({ endpoint, method, body: articleData, hasBody: true });

        if(error) {
            globalDispatch({ type: "SET_ERROR", payload: error.message || "Error al guardar el registro"});
            globalDispatch({ type: "STOP_LOAGDING" });
        } else {
            articleDispatch({ type: type, payload: response });
            globalDispatch({ type: "SET_OP_RESULT", payload: message });
            globalDispatch({ type: "STOP_LOAGDING" });
            success = true;
        }
        return success;
    } catch (err) {
        globalDispatch({ type: "STOP_LOAGDING" });
        globalDispatch({ type: "SET_ERROR", payload: err.message });
    }
}

export const deleteArticle = async (articleDispatch, globalDispatch, id) => {
    globalDispatch({ type: "LOADING" });
    globalDispatch({ type: "CLEAR_NOTIFICATION" });

    try {
        const { error } = await API({ endpoint: `/articles/${id}`, method: "DELETE" });
        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: error.message || "Error eliminado el artículo" });
        } else {
            articleDispatch({ type: "DELETE_ARTICLE_SUCCESS", payload: id });
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_OP_RESULT", payload: "Artículo eliminado con éxito" });
        }

    } catch (err) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: err.message })
    }
}