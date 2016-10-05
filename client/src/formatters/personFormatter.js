export default {
    fullName: getFullName
};

function getFullName(firstName, lastName) {
    return `${lastName}, ${firstName}`;
}