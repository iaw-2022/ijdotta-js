import dayjs from "dayjs";

class DateTimeFormatter {
    formatDate(date: Date): string {
        return dayjs(date).format("DD/MM/YYYY");
    }

    formatTime(date: Date): string {
        return dayjs(date).format("HH:mm [hs]")
    }
}

export default new DateTimeFormatter();
