cy.getMax = function getMax(arr, prop) {
    let max = null;
    for (let i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

cy.getMin = function getMin(arr, prop) {
    let min = null;
    for (let i=0 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
            min = arr[i];
    }
    return min;
}