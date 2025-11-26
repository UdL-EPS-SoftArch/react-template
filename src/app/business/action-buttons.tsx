"use client";

import Link from "next/link";
import { useAuth } from "@/app/components/authentication";

// Botón de crear: Solo para ADMIN (por ahora)
export function CreateBusinessButton() {



    //const { user } = useAuth();

    // role admin for testing

    const user = {
        authorities: [{ authority: "ROLE_ADMIN" }]
    };




    const isAdmin = user?.authorities?.some(a => a.authority === "ROLE_ADMIN");

    if (!isAdmin) return null;

    return (
        <Link
            href="/business/new"
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-medium text-sm shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Cafeteria
        </Link>
    );
}

interface BusinessActionsProps {
    id: string;
    ownerId: string; // Recibimos el dueño
}

export function BusinessActions({ id, ownerId }: BusinessActionsProps) {
    //const { user } = useAuth();
    const user = {
        authorities: [{ authority: "ROLE_ADMIN" }]
    };

    // 1. Verificamos si es ADMIN
    const isAdmin = user?.authorities?.some(a => a.authority === "ROLE_ADMIN");

    // 2. Preparamos la lógica futura para el Dueño (Comentada o inactiva por ahora)
    // Supongamos que tu usuario tiene un campo 'id' o 'username' que coincide con ownerId
    // const isOwner = user?.username === ownerId && user?.authorities?.some(a => a.authority === "ROLE_OWNER");
    const isOwner = false; // <--- Pon esto en true más adelante cuando implementes la lógica

    // 3. Permiso final: Puede editar si es Admin O si es el Dueño
    const canEdit = isAdmin || isOwner;

    if (!canEdit) return null;

    return (
        <div className="flex gap-1 ml-auto">
            <Link href={`/business/${id}/edit`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition dark:hover:text-white dark:hover:bg-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </Link>
            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition dark:hover:text-red-400 dark:hover:bg-red-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    );
}