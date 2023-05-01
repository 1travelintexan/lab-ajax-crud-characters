const charactersAPI = new APIHandler("http://localhost:8000");
const charactersContainer = document.querySelector(".characters-container");
const characterIdInput = document.querySelector("#character-id");
const characterIdDeleteInput = document.querySelector("#character-id-delete");
window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const { data } = await charactersAPI.getFullList();
      charactersContainer.innerHTML = "";
      data.forEach((oneChar) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("character-info");
        newDiv.innerHTML = `
        <div class="name">Character Name: ${oneChar.name}</div>
        <div class="occupation">Character Occupation: ${oneChar.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${oneChar.cartoon}</div>
        <div class="weapon">Character Weapon: ${oneChar.weapon}</div>
        `;
        charactersContainer.appendChild(newDiv);
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      if (characterIdInput.value !== "") {
        let charId = characterIdInput.value;
        const { data } = await charactersAPI.getOneRegister(charId);
        charactersContainer.innerHTML = "";
        const oneCharacterDiv = document.createElement("div");
        oneCharacterDiv.classList.add("character-info");
        oneCharacterDiv.innerHTML = `
     <div class="name">Character Name: ${data.name}</div>
     <div class="occupation">Character Occupation: ${data.occupation}</div>
     <div class="cartoon">Is a Cartoon? ${data.cartoon}</div>
     <div class="weapon">Character Weapon: ${data.weapon}</div>
     `;
        charactersContainer.appendChild(oneCharacterDiv);
        characterIdInput.value = "";
      }
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      if (characterIdDeleteInput.value !== "") {
        charactersContainer.innerHTML = "";
        let charIdDelete = characterIdDeleteInput.value;
        await charactersAPI.deleteOneRegister(charIdDelete);
        const { data } = await charactersAPI.getFullList();
        data.forEach((oneChar) => {
          const newDiv = document.createElement("div");
          newDiv.classList.add("character-info");
          newDiv.innerHTML = `
        <div class="name">Character Name: ${oneChar.name}</div>
        <div class="occupation">Character Occupation: ${oneChar.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${oneChar.cartoon}</div>
        <div class="weapon">Character Weapon: ${oneChar.weapon}</div>
        `;
          charactersContainer.appendChild(newDiv);
        });
        characterIdDeleteInput.value = "";
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const editCharacterIdElement =
        document.querySelector("#character-id-edit");
      const editCharacterName = document.querySelector("#character-name-edit");

      const editCharacterOccupation = document.querySelector(
        "#character-occupation-edit"
      );
      const editCharacterWeapon = document.querySelector(
        "#character-weapon-edit"
      );
      const editCharacterCartoon = document.querySelector(
        "#character-cartoon-edit"
      );
      const editCharacterId = editCharacterIdElement.value;
      const editCharacter = {
        name: editCharacterName.value,
        occupation: editCharacterOccupation.value,
        weapon: editCharacterWeapon.value,
        cartoon: editCharacterCartoon.checked,
      };
      console.log(editCharacterId, editCharacter);
      await charactersAPI.updateOneRegister(editCharacterId, editCharacter);
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const newCharacterName = document.querySelector("#new-character-name");
      const newCharacterOccupation = document.querySelector(
        "#new-character-occupation"
      );
      const newCharacterWeapon = document.querySelector(
        "#new-character-weapon"
      );
      const newCharacterCartoon = document.querySelector(
        "#new-character-cartoon"
      );
      const newCharacter = {
        name: newCharacterName.value,
        occupation: newCharacterOccupation.value,
        weapon: newCharacterWeapon.value,
        cartoon: newCharacterCartoon.checked,
      };
      await charactersAPI.createOneRegister(newCharacter);
    });
});
