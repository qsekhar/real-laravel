import { ImEnter } from "react-icons/im";
import { TbClockCheck } from "react-icons/tb";
import { TbClockCancel } from "react-icons/tb";

const dateFromTimeString = (timeString : string) => {
    // Get today's date
    const today = new Date();
    // Create a new date string by combining today's date with the given time
    const fullDateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${timeString}`;
    // Parse the combined date and time string
    return new Date(fullDateString);
};

export default function UserLog(props: {
    agent: string;
    activity: string;
    when: string;
    late: string;
}) {
    const { agent, activity, when, late } = props;
    const whenDate = new Date(dateFromTimeString(when));
    const lateDate = new Date(dateFromTimeString(late));
    const isCheckin = activity === 'check-in';
    const isLate = lateDate.getTime() - whenDate.getTime() < 0;

    return (
        <li className="m-2 flex items-center gap-2 rounded-md bg-gray-100 p-4">
            {isCheckin ? <ImEnter /> : <ImEnter className="rotate-180" />}

            {agent}

            <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
                {isCheckin ? 'Checked in' : 'Checked out'}

                {isLate ? (
                    <TbClockCancel className="text-red-500" />
                ) : (
                    <TbClockCheck className="text-green-500" />
                )}
                {when}
            </div>
        </li>
    );
}
