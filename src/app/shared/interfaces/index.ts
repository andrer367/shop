export interface User  {
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
	type: string;
	title: string;
	photo: string;
	info: string;
	price: number;
	date: Date;
}

export interface FbResponse {
	name: string;
}

export interface ProductResponse extends Product {
	id: string;
}