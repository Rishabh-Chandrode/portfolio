import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoClientPromise from '@/lib/mongodb';

export async function POST(req) {
  const client = await mongoClientPromise;
  const dbName = "Chatbot_Data";
  const collectionName = "embedded_data";
  const collection = client.db(dbName).collection(collectionName);
  
  const question = await req.text();

  const vectorStore = new MongoDBAtlasVectorSearch(
    new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-ada-002',
      stripNewLines: true,
    }), {
    collection,
    indexName: "vector_index",
    textKey: "text", 
    embeddingKey: "embedding",
  });

  const retriever = vectorStore.asRetriever({
    searchType: "mmr",
    searchKwargs: {
      fetchK: 5,
      lambda: 0.1,
    },
  });
  
  const retrieverOutput = await retriever.getRelevantDocuments(question);
  // console.log(retrieverOutput)
  return Response.json(retrieverOutput);
}