export default {
    fullName: getFullName
};

function getFullName(firstName: string, lastName: string) {
    return `${lastName}, ${firstName}`;
}