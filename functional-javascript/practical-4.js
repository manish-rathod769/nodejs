messArr = [
    {
        message: "Esse id amet quis eu esse aute officia ipsum."
    },
    {
        message: "Tempor quis esse consequat sunt ea eiusmod."
    },
    {
        message: "Id culpa ad proident ad nulla laborum incididunt."
    },
    {
        message: "Ullamco in ea et ad anim anim ullamco est."
    },
    {
        message: "Est ut irure irure nisi."
    },
    {
        message: "Esse id amet quis eu esse aute officia ipsum."
    },
    {
        message: "Tempor quis esse consequat sunt ea eiusmod."
    },
    {
        message: "Id culpa ad proident ad nulla laborum incididunt."
    },
    {
        message: "Ullamco in ea et ad anim anim ullamco est."
    },
    {
        message: "Est ut irure irure nisi."
    },
    {
        message: "Tempor quis esse consequat sunt ea eiusmod."
    }
];

let getShortMessages = arrObj => {
    let resArr = [];
    resArr = arrObj.filter( obj => {
        return (obj.message.length < 50) ? obj.message : "";
    })
    .map( o => {
        return o.message
    })
    return resArr;
}

console.log(getShortMessages(messArr))

module.exports = getShortMessages;