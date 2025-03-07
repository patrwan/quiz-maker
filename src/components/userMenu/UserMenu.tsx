import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { logoutUser } from "@/firebase/auth";
import Link from 'next/link';
import React from 'react';
const UserMenu = ({ username }: { username: string }) => {
    return (
        <Menu>
            <MenuButton>Mi Cuenta</MenuButton>
            <MenuItems className="bg-emerald-900 text-white w-46 ml-4" anchor="bottom">
                <MenuItem >
                    <Link className="block data-[focus]:bg-emerald-400 p-2" href="/account/quizzes">
                        Mis Cuestionarios
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="block data-[focus]:bg-emerald-400 p-2" href="/account/create_quiz">
                        Crear Cuestionario
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button className="block data-[focus]:bg-emerald-400 p-2" onClick={logoutUser}>
                        Cerrar Sesión
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default UserMenu;