const app = document.getElementById("app");


export const box = async () => {
    const elementBox = document.createElement("div");
    return elementBox;
};

export const br = async () => {
    const br = document.createElement("br");
    return br
}

export const input = async (options) => {
    const { type, id } = options;
    const inputElement = document.createElement("input");
    inputElement.type = type;
    inputElement.id = id;
    return inputElement;
};

export const button = async (options) => {
    const { value, buttonClick } = options;
    const buttonElement = document.createElement("button");
    buttonElement.innerText = value;
    buttonElement.onclick = buttonClick;
    return buttonElement;
};

export const test = async (options) => {
    const { buttonValue, buttonClick } = options;
    const boxElement = await box();
    const brElement = await br();

    const inputText = await input({
        type: "text",
        id:"username"
    });
    const inputPassword = await input({
        type: "password",
    });
    const buttonElement = await button({
        value: buttonValue,
        buttonClick: buttonClick,
    });

    boxElement.appendChild(inputText);
    boxElement.appendChild(brElement);
    boxElement.appendChild(inputPassword);
    boxElement.appendChild(brElement);
    boxElement.appendChild(buttonElement);
    app.appendChild(boxElement);
};




// var apply = Tea.create()

// export const mod =  async () => {
//     const ins = new input({
//         type: "text",
//         data:{
//             name:"name",
//             info:"info"
//         },
//         handle:async () => {
//             console.log("This is input text");
//         }
//     })
//     apply.into({ 
//         handle:ins,
//         name:"inputText"
//     })
// }

// apply.layout({
//     view : () => require('./demo.tea'),
//     name:"UserLayout"
// })


