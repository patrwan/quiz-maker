import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { logoutUser } from "@/firebase/auth";
import Link from 'next/link';
import React from 'react';
import { deleteCookie } from "cookies-next";

const UserMenu = ({ username }: { username: string }) => {
    const handleLogOut = async () => {
        await logoutUser();
        deleteCookie("token");
    }
    
    return (
        <Menu>
            <MenuButton className="p-2 border-2 border-gray-400 hover:border-white font-bold">Mi Cuenta</MenuButton>
            <MenuItems className="bg-indigo-900 text-white w-52 origin-top-right rounded-md py-1.5 px-3 text-sm/6" anchor="bottom end">
                <MenuItem >
                    <Link className="block data-[focus]:bg-indigo-400 p-2 rounded-xl" href="/account/quizzes">
                        Mis Cuestionarios
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="block data-[focus]:bg-indigo-400 p-2 rounded-xl" href="/account/create_quiz">
                        Crear Cuestionario
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button className="flex w-full data-[focus]:bg-indigo-400 p-2 rounded-xl" onClick={handleLogOut}>
                        Cerrar Sesión
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default UserMenu;