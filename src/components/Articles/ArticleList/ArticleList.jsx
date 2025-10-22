import "./ArticleList.css";
import { useReducer } from "react";
import {
  GLOBAL_INITIAL_STATE,
  globalReducer,
} from "../../../reducers/global/global.reducer";
import {
  ARTICLE_INITIAL_STATE,
  articleReducer,
} from "../../../reducers/article/article.reducer";
import { fetchArticles } from "../../../reducers/article/article.actions";
import { useEffect } from "react";

const ArticleList = () => {
  // Uso del hook useReducer para estados globales y de artículos
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    GLOBAL_INITIAL_STATE
  );
  const [articleState, articlesDispatch] = useReducer(
    articleReducer,
    ARTICLE_INITIAL_STATE
  );

  // Desestructurizar los estados de los reducers.
  const { loading, error, page, totalPages, isLastPage } = globalState;
  const { articles } = articleState;

  useEffect(() => {
    fetchArticles(globalDispatch, articlesDispatch);
  }, []);

  return (
    <div className="articles-container">
      {loading && <p>Loading....</p>}
      {Array.isArray(articles) && articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id}>
            <p>{article.name}</p>
            <p>{article.description}</p>
            <p>{article.price}€</p>
          </div>
        ))
      ) : (
        <p>No hay artículos para mostrar</p>
      )}
    </div>
  );
};

export default ArticleList;
