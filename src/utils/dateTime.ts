class DateTimeService {
    millisecondsToYMD = (milliseconds: number) => {
        try {
            const date = new Date(milliseconds);
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(err as string);
            }
        }
    };
}

const DateTime = new DateTimeService()
export default DateTime
