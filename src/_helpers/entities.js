const idAsKey = (items) => {
    const indexed = {};

    items.forEach((item) => {
        indexed[`${item.id}`] = item;
    });
    
    return indexed;
}

export {
    idAsKey
}