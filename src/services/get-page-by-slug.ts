import { createBucketClient } from '@cosmicjs/sdk';


const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET as string,
  readKey: process.env.NEXT_READ_KEY as string,
});

export const fetchPageBySlug = async (slug: string) => {
  try {
    // Busca um objeto específico pelo slug
    const data = await cosmic.objects
      .findOne({
        slug: slug
      })
      .props(['slug', 'title', 'metadata', 'type'])
      .depth(1);

    return data.object;
  } catch (error) {
    console.error("Erro ao buscar página:", error);
    return null;
  }
};