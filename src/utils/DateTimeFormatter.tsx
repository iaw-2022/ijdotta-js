class DateTimeFormatter {
    formatDate(date: Date): string {
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    formatTime(date: Date): string {
        return `${date.getHours()}:${date.getMinutes()} hs`;
    }
}

export default new DateTimeFormatter();
