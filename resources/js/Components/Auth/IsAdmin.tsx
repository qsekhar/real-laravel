import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function IsAdmin({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    return user.is_admin ? children : null;
}