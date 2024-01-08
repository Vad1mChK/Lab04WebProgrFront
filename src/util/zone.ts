export default function getZone() {
    return new Date().getTimezoneOffset() * -60
}