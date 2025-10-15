// 1. Obtener URL desde la variable de entorno
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Función Genérica de conexión a la API
export const API = async({ endpoint, method = "GET", body, hasBody = false }) => {
    // Para este caso no hacen falta los headers. Únicamente para cuando hay que enviar credenciales.
    // let headers = {};
    // if(localStorage.getItem("hhToken")) {
    //     headers["Authorization"] = `Bearer ${localStorage.getItem("hhToken")}`;
    // }


    let requestBody = null;

    // Manejor del content-type
    if(hasBody) {
        headers["Content-Type"] = "application/json";
        requestBody = JSON.stringify(body);
    }

    // Construir la URL
    const url = BASE_URL + endpoint;

    try {
        const res = await fetch(url, {
            method,
            // headers,
            body: requestBody
        });
        // Comprobar error
        if(!res.ok) {
            return { error: response };
        }
        // Parsear resultado a json
        const response = await res.json();
        // Devolver resultado
        return { response };
    } catch (error) {
        return error;
    }
};