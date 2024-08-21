export default function formatDate(dateString) {
    const date = new Date(dateString); // Parse the date string to a Date object

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
    const year = date.getFullYear();

    // Function to determine the ordinal suffix
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; // 4th to 20th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const ordinalSuffix = getOrdinalSuffix(day);

    return `${day}${ordinalSuffix} ${month} ${year}`;
}