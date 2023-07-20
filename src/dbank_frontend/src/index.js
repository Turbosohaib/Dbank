import { dbank_backend } from "../../declarations/dbank_backend";


window.addEventListener("load", async function () {
    // console.log("Finished Loading!");
    update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = document.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outPutAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (!isNaN(inputAmount)) {
        await dbank_backend.topUp(inputAmount);
    }

    if (!isNaN(outPutAmount)) {
        await dbank_backend.withDrawl(outPutAmount);
    }

    await dbank_backend.compound();

    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
});


async function update() {
    const currentAmount = await dbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

}

