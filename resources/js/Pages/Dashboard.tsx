import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard() {

   useEffect(() =>{
    window.Echo.channel(`agent-activity`)
    .listen('AgentActivityEvent', (e) => {
        console.log(e);
    });
   })

    const brodcastMsg = () => {
       // window.Echo.channel('agent-activity').trigger('CheckIn', {})
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <button className="p-6 text-gray-900 dark:text-gray-100" onClick={brodcastMsg}>
                            Hola!
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
