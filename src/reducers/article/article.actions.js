import { API } from "../../utils/api/API";

export const fetchArticles = async (globalDispatch, articleDispatch) => {
    try {
        // Activar el estado loading
        globalDispatch({ type: "LOADING" });
        
        // Hacer la llamada a la API
        const { error, response } = await API({ endpoint: `/articles` });

        // Controlar llegada de error
        if(error) {
            globalDispatch({ type: "SET_ERROR", payload: error })
        } else {
            // La API puede devolver un array o un objeto.
            const articlesPayload = Array.isArray(response) ? response : [];
            // Cargar los datos de los artículos
            articleDispatch({ type: "FETCH_ARTICLES", payload: articlesPayload });
        }

        globalDispatch({ type: "STOP_LOADING" });

    } catch (error) {
        console.log(error);
    }
}