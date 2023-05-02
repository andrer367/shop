export interface User {
	email: string;
	password: string;
	returnSecureToken: boolean;
}

export interface AuthResponse {
	email: string;
	idToken: string;
	expiresIn: number;
}

export interface Product {
	id?: string;
	type: string;
	title: string;
	photo: string;
	info: string;
	price: number;
	date: Date;
}

export interface FbResponse {
	name?: string ;
}

export interface Order {
	id?: string;
	name?: string;
	phone?: string;
	address?: string;
	payment?: string;
	orders?: Product[];
	price?: number;
	date: Date;
}