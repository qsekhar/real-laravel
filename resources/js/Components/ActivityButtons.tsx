export default function ActivityButtons() {
    const handleCheckIn = () => {
        window.axios.post('/agent-activity/check-in');
    };

    const handleCheckOut = () => {
        window.axios.post('/agent-activity/check-out');
    };
    return (
        <div className="flex gap-2 p-6 text-gray-900 dark:text-gray-100">
            <button
                className="rounded-lg bg-green-300 p-2 outline-double outline-green-500"
                onClick={handleCheckIn}
            >
                Check in
            </button>
            <button
                className="rounded-lg bg-red-300 p-2 outline-double outline-red-500" 
                onClick={handleCheckOut}
            >
                Check out
            </button>
        </div>
    );
}