import { program } from "commander";
import * as contactService from "./contacts.js";

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await contactService.ListContacts();
			return console.table(allContacts);

		case "get":
			const getById = await contactService.getContactById(id);
			return console.log(getById);

		case "add":
			const newContact = await contactService.addContact({ name, email, phone });
			return console.log(newContact);

		case "remove":
			const deleteContact = await contactService.removeContact(id);
			return console.log(deleteContact);

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(options);
