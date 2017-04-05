module shiva {
    export interface ButtonStyleDeclaration extends StyleDeclaration {
        hover?: {
			backgroundColor?: string;
			color?: string;
			durationIn?: number;
			durationOut?: number;
		},
        icon?: {
            code: string;
            align?: string;
            style?: StyleDeclaration;
        }
    }
}