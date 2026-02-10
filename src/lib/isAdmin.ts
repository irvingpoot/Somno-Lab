export const isUserAdmin = (userId: string | null | undefined): boolean => {
    if (!userId) return false;
    
    // Obtenemos la lista del .env
    const adminString = import.meta.env.PUBLIC_ADMIN_IDS || "";
    
    // Convertimos "id1,id2" en ["id1", "id2"] y revisamos si el userId está ahí
    const adminList = adminString.split(',');
    
    return adminList.includes(userId);
};