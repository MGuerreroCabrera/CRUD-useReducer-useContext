// Definición de los estados globales iniciales
export const GLOBAL_INITIAL_STATE = {
    loading: false,
    error: null,
    opResult: null,
    totalPages: 0
};

// Crear el reducer
export const globalReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "STOP_LOADING":
            return { ...state, loading: false };
        case "SET_ERROR":
            return { ...state, error: action.payload, opResult: null, loading: false };
        case "SET_OP_RESULT":
            return { ...state, opResult: action.payload, error: null };
        case "CLEAR_NOTIFICATION":
            return { ...state, error: null, opResult: null };
        case "SET_TOTAL_PAGES":
            return { ...state, totalPages: action.payload };
        default: 
            return state;
    }
}