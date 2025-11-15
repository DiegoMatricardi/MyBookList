import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const model = "gemini-2.5-flash";

async function curiosidadeLivro(livroNome) {
    if (!livroNome || livroNome.trim() === "") {
        return { Livro: "Nenhum Livro selecionado", Curiosidade: "Nenhuma curiosidade disponível" };
    }

    const prompt = `
        Você é um assistente especializado em procurar curiosidades interessantes sobre livros.
        Dado o nome de um livro, sua tarefa é encontrar uma curiosidade única e interessante sobre ele.

        A curiosidade deve ser algo que a maioria das pessoas não saiba, mas que seja relevante para o livro.
        
        Responda estritamente em formato JSON, SEM NENHUM TEXTO ANTES OU DEPOIS. 
        É CRÍTICO QUE VOCÊ NÃO USE NENHUMA FORMATAÇÃO DE CÓDIGO MARKDOWN, INCLUINDO BLOCOS 'json'.

        O formato JSON deve ser: { "Livro": "...", "Curiosidade": "..." }

        LIVRO:
        ---
        ${livroNome}
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });

        const jsonText = (response.text || response.output || JSON.stringify(response)).toString().trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Erro na chamada da API Gemini:", error);
        return { Livro: livroNome, Curiosidade: "Não foi possível gerar a curiosidade. Tente novamente mais tarde." };
    }
}

export default curiosidadeLivro;
