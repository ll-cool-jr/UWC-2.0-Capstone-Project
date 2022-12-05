import { langs } from "../constants/languages.js";

const replaceText = (el, lang) => {
	const key = el.innerText;
	el.innerText = langs[lang][key] || key;

	console.log(key, langs, lang);
};

const elements = document.querySelectorAll("[data-i18n]");

export default function translation(isEnglish) {
	const lang = isEnglish ? "en" : "vn";
	elements.forEach(el => replaceText(el, lang));
}