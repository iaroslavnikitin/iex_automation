Cypress.Commands.add("getUser", (firstName, lastName) => {
    let user = {
        firstName: firstName,
        lastName: lastName,
        fullName: function () {
            return this.firstName + " " + this.lastName;
        }
    }

    return user;
});