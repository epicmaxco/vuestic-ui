import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("navbar.title"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Colors"),
    block.example("Height"),
    block.example("Shape"),

    block.subtitle("API"),
    block.api("VaNavbar", apiOptions),
  ],
});
