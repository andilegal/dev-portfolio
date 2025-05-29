import { MenuItemProps } from "@/components/menu/menu.type";

export async function getMenu() {
  const url = `${process.env.NEXT_PUBLIC_URL}/objects?read_key=${process.env.NEXT_READ_KEY}&bucket_id=${process.env.NEXT_PUBLIC_BUCKET}&props=slug,title,metadata.menu_title,metadata.menu_order&limit=20`;

  try {
    const response = await fetch(url);
    const data: { objects: MenuItemProps[] } = await response.json();

    // Ordenar os itens do menu
    const sortedObjects = data.objects.sort((a, b) => {
      // Colocar "Home" sempre como primeiro item
      if (a.slug === 'home') return -1;
      if (b.slug === 'home') return 1;

      // Para os outros itens, usar menu_order
      const orderA = a.metadata?.menu_order || 999;
      const orderB = b.metadata?.menu_order || 999;

      return orderA - orderB;
    });

    return sortedObjects;
  } catch (error) {
    console.error('Erro ao buscar páginas do menu:', error);
    return [];
  }
}