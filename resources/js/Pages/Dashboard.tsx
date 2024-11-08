import ActivityButtons from '@/Components/ActivityButtons';
import IsAdmin from '@/Components/Auth/IsAdmin';
import UserLog from '@/Components/UserLog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';

type EventData = {
    agent: string;
    activity: string;
    when : string;
};


export default function Dashboard() {
    const [agentLogs, setAgentLogs] = useState<EventData[]>([]);
    const [late, setLate] = useState('');
    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT,
            wssPort: import.meta.env.VITE_REVERB_PORT,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });

        echo.channel('agent-activity').listen(
            'AgentActivityEvent',
            (e: EventData) => {
                e.when = new Date().toLocaleTimeString();
                setAgentLogs([...agentLogs, e]);
            },
        );
    }, [agentLogs]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                    <ActivityButtons />

                    <IsAdmin>
                        <div>
                            <label htmlFor="late" className="p-4">
                                Late Time
                            </label>
                            <input
                                id="late"
                                type="time"
                                onChange={(e) => setLate(e.target.value)}
                            />
                        </div>
                    </IsAdmin>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <IsAdmin>
                            <div className="h-96 overflow-y-auto p-6 text-gray-900 shadow-md dark:text-gray-50">
                                <ul>
                                    {agentLogs.reverse().map((e, i) => {
                                        return (
                                            <UserLog
                                                key={i}
                                                agent={e.agent}
                                                activity={e.activity}
                                                when={e.when}
                                                late={late}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        </IsAdmin>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
